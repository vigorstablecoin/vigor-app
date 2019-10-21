import React from 'react';
import AccountStore from 'modules/account/store';
import ModalStore from 'modules/modals/store';
import I18nStore from 'modules/i18n/store';
import VigorStore from 'modules/vigor/store';
import TransactionStore from 'modules/transaction/store';

export default class RootStore {
    accountStore = new AccountStore(this);
    vigorStore = new VigorStore(this);
    modalStore = new ModalStore(this);
    transactionStore = new TransactionStore(this);
    i18nStore = new I18nStore(this);

    init() {
        this.accountStore.init();
        this.vigorStore.init();
    }
}

export const rootStore = new RootStore();
export const storeContext = React.createContext<RootStore>(rootStore);
