import React from 'react';
import AccountStore from 'modules/account/store';
import ModalStore from 'modules/modals/store';
import I18nStore from 'modules/i18n/store';

export default class RootStore {
    accountStore = new AccountStore(this);
    modalStore = new ModalStore(this);
    i18nStore = new I18nStore(this);

    init() {
        this.accountStore.init();
    }
}

export const rootStore = new RootStore();
export const storeContext = React.createContext<RootStore>(rootStore);
