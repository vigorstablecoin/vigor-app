import { action, observable, computed } from 'mobx';
import RootStore from 'modules/root/store';
import messagesChinese from '../translations/zh.json';
import messagesKorean from '../translations/ko.json';
import { TLanguageCodes, getLanguageFlag, getFullLanguage } from '../utils';

const messages = {
    // no explicit english messages as we just use defaultMessages for English
    en: {},
    zh: messagesChinese,
    ko: messagesKorean,
};

export default class I18nStore {
    rootStore: RootStore;
    @observable languageCode: string = 'en';

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @action changeLanguage = (languageCode: TLanguageCodes) => {
        this.languageCode = languageCode;
    };

    @computed get languageFlag() {
        return getLanguageFlag(this.languageCode);
    }

    @computed get fullLanguage() {
        return getFullLanguage(this.languageCode);
    }

    @computed get messages() {
        return messages[this.languageCode];
    }
}
