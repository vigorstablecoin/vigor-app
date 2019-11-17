import { action, computed, observable } from 'mobx';
import { getContracts } from 'shared/eos/networks';
import { fetchRows } from 'shared/eos/utils';
import { TUserRow, TAsset, TAccountsRow, TExtendedSymbol } from 'shared/typings';
import { decomposeAsset, formatAsset } from 'shared/eos/asset';
import VigorStore from "./index";
import { PromiseAllSettledFilterFulfilled, PromiseAllSettled } from 'shared/utils/promise';

class User {
  vigorStore: VigorStore

  constructor(vigorStore: VigorStore) {
    this.vigorStore = vigorStore;
  }

  @observable private userStats?: Omit<TUserRow, "collateral" | "insurance"> & {
    collateral: TAsset[];
    insurance: TAsset[];
  };
  @observable private userBalances: TAsset[] = [];
  @observable displayAccountName = ``;
  @observable isFetching = false;
  @observable lastFetchedAccountName = ``;
  @observable isUserFetchDirty = false;

  @computed get userCollateral() {
    if (!this.userStats) return null;

    return {
      collateral: this.userStats.collateral,
      valueofcol: this.userStats.valueofcol,
      svalueofcol: this.userStats.svalueofcol,
      svalueofcole: this.userStats.svalueofcole,
      stresscol: this.userStats.stresscol,
      istresscol: this.userStats.istresscol,
      volcol: this.userStats.volcol,
    }
  }

  @computed get userInsurance() {
    if (!this.userStats) return null;

    return {
      insurance: this.userStats.insurance,
      valueofins: this.userStats.valueofins,
    }
  }

  @computed get userBorrowStats() {
    if (!this.userStats) return null;

    return {
      debt: this.userStats.debt,
      creditscore: this.userStats.creditscore,
    }
  }

  @computed get userExtendedStats() {
    if (!this.userStats) return null;

    return {
      // usern: this.userStats.usern,
      feespaid: this.userStats.feespaid,
      lastupdate: this.userStats.lastupdate,
      latepays: this.userStats.latepays,
      pcts: this.userStats.pcts,
      recaps: this.userStats.recaps,
      tesprice: this.userStats.tesprice,
    }
  }

  @action handleDisplayAccountNameChange = (event) => {
    this.displayAccountName = event.target.value;
  }

  getToken = (tokenSymbolCode: string):TAsset => {
    const foundBalance = this.userBalances.find((asset) => asset.symbol.code === tokenSymbolCode)
    return foundBalance ? foundBalance : { amount: 0, symbol: { code: tokenSymbolCode, precision: 4 }}
  }

  @action async fetchUser() {
    return PromiseAllSettled([
      this.fetchUserStats(),
      this.fetchUserBalances(),
    ])
  }

  @action private async fetchUserStats() {
    if (!this.displayAccountName) return;

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

      this.userStats = {
        ...rows[0],
        collateral: rows[0].collateral.map(decomposeAsset),
        insurance: rows[0].insurance.map(decomposeAsset),
      }
    } catch (err) {
      console.error(err)
      throw err;
    }
    finally {
      this.isUserFetchDirty = true;
      this.isFetching = false;
    }
  }

  @action private async fetchUserBalances() {
    if (!this.displayAccountName) return;

    try {
      const availableTokens = this.vigorStore.availableTokens
      this.isFetching = true;
      const accountsRows = await PromiseAllSettled(
        availableTokens.map(token => fetchRows<TAccountsRow>({
          code: token.contract,
          scope: this.displayAccountName,
          table: `accounts`,
          limit: 1
        })))

        
        this.userBalances = accountsRows.map((rows, index) => {
          if(rows[0]) return rows[0]
          return formatAsset({ amount: 0, symbol: availableTokens[index].symbol })
        })
        .map(asset => decomposeAsset(asset))
    } catch (err) {
      console.error(err)
      throw err;
    }
    finally {
      this.isUserFetchDirty = true;
      this.isFetching = false;
    }
  }

  @action async onLogin() {
    if (!this.displayAccountName) {
      this.displayAccountName = this.vigorStore.rootStore.accountStore.accountName;

      return this.fetchUser()
    }
  }

}

export default User;
