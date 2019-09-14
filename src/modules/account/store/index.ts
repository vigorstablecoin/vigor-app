import { RpcError } from 'eosjs';
import { action, computed, observable } from 'mobx';
import RootStore from 'modules/root/store';
import { WALLETS } from 'shared/eos/constants';
import { getWallet, selectWalletProvider } from 'shared/eos/wallet';
import {
    getLoginParamsFromStorage,
    getLoginStatusFromStorage,
    getWalletProviderFromStorage,
    setLoginParamsToStorage,
    setLoginStatusToStorage,
    setWalletProviderToStorage,
    setNetworkNameToStorage,
} from 'shared/local-storage';

// AccountInfo from eos-transit/lib has the wrong types
type AccountInfoFixed = {
    account_name: string;
};

export default class AccountStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable isLoggingIn = false;
    @observable accountInfo?: AccountInfoFixed | null;
    @computed get isLoggedIn() {
        return Boolean(this.accountInfo);
    }

    @action login = async (walletName: WALLETS) => {
        if (this.isLoggingIn) return;

        this.isLoggingIn = true;

        try {
            selectWalletProvider(walletName);
            await getWallet().connect();

            let loginParams: string[] = [];

            if (walletName === WALLETS.ledger) {
                const loginParamsCache = getLoginParamsFromStorage();

                if (loginParamsCache) {
                    loginParams = loginParamsCache;
                    // for auto-login we need to call discover once
                    // as eos-transit does not directly pass-down keyIndex, key to the ledger login function
                    try {
                        await getWallet().discover({
                            pathIndexList: [Number.parseInt(loginParams[2])],
                        });
                    } catch {}
                } else {
                    const { data, canceled } = await this.rootStore.modalStore.showModal(`LEDGER`);
                    if (canceled) throw new Error(`User canceled the Ledger modal`);
                    const { account, authorization, index, key } = data;
                    loginParams = [account, authorization, index, key];
                    setLoginParamsToStorage(loginParams);
                }
            }

            const accountInfo = (await getWallet().login(...loginParams)) as unknown;
            this.accountInfo = accountInfo as AccountInfoFixed;

            setLoginStatusToStorage('true');
            setWalletProviderToStorage(walletName);
        } catch (err) {
            console.error(err);
            setLoginStatusToStorage('false');
            setLoginParamsToStorage(null);

            if (err instanceof RpcError && /unknown key/.test(err.message)) {
                // fix a bug when changing networks with Scatter without logging out
                // then forgetIdentity() is never called on login, but needs to be
                // https://github.com/eosnewyork/eos-transit/blob/6430187a0e86080d8410e9f5cde3a6f39184db5b/packages/eos-transit-scatter-provider/src/index.ts#L48
                // bug is triggered by eostransit get_account failing to fetch the user
                try {
                    await getWallet().logout();
                    this.isLoggingIn = false;
                    return this.login(walletName);
                } catch {}
            } else {
                // throw error to frontend
                throw err;
            }
        } finally {
            this.isLoggingIn = false;
        }
    };

    @action logout = async () => {
        setLoginStatusToStorage('false');
        setLoginParamsToStorage(null);

        try {
            await getWallet().logout();
            this.accountInfo = null;
        } catch (err) {
            console.error(err);
        }
    };

    @action init = () => {
        const wasLoggedIn = getLoginStatusFromStorage() === 'true';
        const walletName = getWalletProviderFromStorage() as WALLETS;

        if (wasLoggedIn && walletName) this.login(walletName);
    };

    /*
     * EOS network menu
     */
    @action setEosNetwork = network => {
        setNetworkNameToStorage(network);
        window.location.reload();
    };
}
