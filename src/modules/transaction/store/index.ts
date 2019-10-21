import { RpcError } from 'eosjs';
import { action, computed, observable } from 'mobx';
import RootStore from 'modules/root/store';
import { sendTransaction } from 'shared/eos/transactions';
import { getContracts } from 'shared/eos/networks';
import { TAsset, ArgsType } from 'shared/typings';
import { formatAsset } from 'shared/eos/asset';
import { PromiseAllSettled } from 'shared/utils/promise';

export default class TransactionStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    private async checkLogin() {
        if(!this.rootStore.accountStore.isLoggedIn) {
            // TODO: show toast
            console.log(`login required`)
            return false;
        }

        return true;
    }

    private async sendTransaction(...args: ArgsType<typeof sendTransaction>): Promise<void> {
        try {
            const tx = await sendTransaction(...args)
            // TODO: toast tx id
            console.log(`txId`, tx.transaction_id)
        } catch (err) {
            console.error(err)
            // TODO: toast error
        }
    }

    @computed get walletAccount() {
        return this.rootStore.accountStore.accountName
    }

    @action depositCollateral = async ({quantity}: { quantity: TAsset }) => {
        if(!await this.checkLogin()) return;
        await this.sendTransaction({
            account: getContracts().systemToken,
            name: `transfer`,
            data: {
                from: this.walletAccount,
                to: getContracts().vigor,
                quantity: formatAsset(quantity),
                memo: `collateral`,
            }
        })
        await PromiseAllSettled<any>([
            this.rootStore.vigorStore.user.fetchUser(),
            this.rootStore.vigorStore.fetchGlobalStats(),
        ])
    }

    @action depositInsurance = async ({quantity}: { quantity: TAsset }) => {
        if(!await this.checkLogin()) return;
        await this.sendTransaction({
            account: getContracts().systemToken,
            name: `transfer`,
            data: {
                from: this.walletAccount,
                to: getContracts().vigor,
                quantity: formatAsset(quantity),
                memo: `insurance`,
            }
        })
        await PromiseAllSettled<any>([
            this.rootStore.vigorStore.user.fetchUser(),
            this.rootStore.vigorStore.fetchGlobalStats(),
        ])
    }

    @action withdrawCollateral = async ({quantity}: { quantity: TAsset }) => {
        if(!await this.checkLogin()) return;
        await this.sendTransaction({
            name: `assetout`,
            data: {
                usern: this.walletAccount,
                assetout: formatAsset(quantity),
                memo: `collateral`,
            }
        })
        await PromiseAllSettled<any>([
            this.rootStore.vigorStore.user.fetchUser(),
            this.rootStore.vigorStore.fetchGlobalStats(),
        ])
    }

    @action withdrawInsurance = async ({quantity}: { quantity: TAsset }) => {
        if(!await this.checkLogin()) return;
        await this.sendTransaction({
            name: `assetout`,
            data: {
                usern: this.walletAccount,
                assetout: formatAsset(quantity),
                memo: `insurance`,
            }
        })
        await PromiseAllSettled<any>([
            this.rootStore.vigorStore.user.fetchUser(),
            this.rootStore.vigorStore.fetchGlobalStats(),
        ])
    }
}
