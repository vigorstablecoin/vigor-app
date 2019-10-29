import { RpcError } from 'eosjs';
import { action, computed, observable, toJS } from 'mobx';
import RootStore from 'modules/root/store';
import { getContracts } from 'shared/eos/networks';
import { fetchRows } from 'shared/eos/utils';
import { TUserRow, TGlobalsRow, TCoinstatRow, TExtendedSymbol, TAsset } from 'shared/typings';
import { decomposeAsset } from 'shared/eos/asset';
import User from './User';

export default class VigorStore {
    rootStore: RootStore;
    user: User;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.user = new User(this)
    }

    @observable globalStats?: TGlobalsRow;
    @observable availableTokens: TExtendedSymbol[] = [];

   
    @action init() {
        return Promise.all([this.fetchAvailableTokens(), 
            this.fetchGlobalStats()])
    }

    @action onLogin() {
        this.user.onLogin()
    }

    @action async fetchGlobalStats() {
        const contracts = getContracts()
        try {
            const rows = await fetchRows<TGlobalsRow>({
                code: contracts.vigor,
                scope: contracts.vigor,
                table: `globals`,
                limit: 1
            })

            const globalStats = rows[0];
            if (globalStats) this.globalStats = globalStats
        } catch (err) {
            console.error(err)
        }
    }

    @action async fetchAvailableTokens() {
        const contracts = getContracts()
        try {
            const coinstatResult = await fetchRows<TCoinstatRow>({
                json: true,
                code: contracts.vigor,
                scope: contracts.vigor,
                table: `coinstat`,
                lower_bound: 0
            });

            const availableTokens = coinstatResult.map(row => {
                // reconstruct token from supply. assume issuer is also where the token is deployed
                const [amount, symbolCode] = row.supply.split(` `);
                const precision = amount.length - 1 - amount.indexOf(`.`);

                return {
                    contract: row.issuer,
                    symbol: {
                        code: symbolCode,
                        precision
                    }
                };
            })
                // make vigor token not available for backing
                .filter(({ symbol: { code } }) => code !== `VIGOR`);

            this.availableTokens = availableTokens;
        } catch (err) {
            console.error(err)
        }
    }
}
