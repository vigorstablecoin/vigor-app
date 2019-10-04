import { RpcError } from 'eosjs';
import { action, computed, observable } from 'mobx';
import RootStore from 'modules/root/store';
import { getContracts } from 'shared/eos/networks';
import { fetchRows } from 'shared/eos/utils';
import { TUserRow, TGlobalsRow } from 'shared/typings';

export default class VigorStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable displayAccountName = ``
    @observable userStats?:TUserRow;
    @observable globalStats?:TGlobalsRow;
    @observable isFetching = false;
    @observable lastFetchedAccountName = ``;
    @observable isUserFetchDirty = false;

    @action onLogin() {
        if (!this.displayAccountName) {
            this.displayAccountName = this.rootStore.accountStore.accountName;
            this.fetchUserStats()
            this.fetchGlobalStats()
        }
    }

    @action handleDisplayAccountNameChange = (event) => {
        this.displayAccountName = event.target.value;
    }

    @action async fetchUserStats() {
        if(!this.displayAccountName) return;

        this.lastFetchedAccountName = this.displayAccountName
        const contracts = getContracts()

        try {
            this.isFetching = true;
            const rows = await fetchRows<TUserRow>({
                code: contracts.vigor,
                scope: contracts.vigor,
                table: `user`,
                key_type: `name`,
                lower_bound: this.lastFetchedAccountName,
                upper_bound: this.lastFetchedAccountName,
                limit: 1
            })

            this.userStats = rows[0];
            console.log(this.userStats)
        } catch (err) {
            console.error(err)
        }
        finally {
            this.isUserFetchDirty = true;
            this.isFetching = false;
        }
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
            console.log(globalStats)
        } catch (err) {
            console.error(err)
        }
    }
}
