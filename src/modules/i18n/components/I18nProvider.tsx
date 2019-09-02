import React from 'react';
import { IntlProvider } from 'react-intl';
import { useStore } from 'shared/hooks';
import { observer } from 'mobx-react';

const I18nProvider: React.FC<{}> = ({ children }) => {
    const store = useStore(rootStore => rootStore.i18nStore);
    const languageCode = store.languageCode;

    return (
        <IntlProvider locale={languageCode} defaultLocale="en" messages={store.messages}>
            {children}
        </IntlProvider>
    );
};

export default observer(I18nProvider);
