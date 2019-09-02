import I18nProvider from 'modules/i18n/components/I18nProvider';
import ModalsContainer from 'modules/modals/components/ModalsContainer';
import React, { useEffect } from 'react';
import pageBg from 'shared/assets/vigor/background-logo-alpha-white.svg';
import { useStore } from 'shared/hooks';
import colors from 'shared/styles/colors';
import GlobalStyles from 'shared/styles/global';
import styled from 'styled-components';
import { rootStore, storeContext } from '../store';
import Footer from './Footer';
import NavBar from './NavBar';

const PageWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    z-index: 1;

    ::before {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        content: '';
        z-index: -1;
        background: ${colors.bg} url(${pageBg}) no-repeat top center;
        background-size: auto 80%;
        background-position: 50% 60%;
    }
`;

export const StoreProvider = ({ children }) => {
    return <storeContext.Provider value={rootStore}>{children}</storeContext.Provider>;
};

const App: React.FC = () => {
    const rootStore = useStore(rootStore => rootStore);
    useEffect(() => {
        if (!rootStore) console.error(`Rootstore not initialized yet.`);
        rootStore.init();
    }, [rootStore]);

    return (
        <StoreProvider>
            <I18nProvider>
                <GlobalStyles />
                <PageWrapper>
                    <NavBar />
                    {/* <Content /> */}
                    <ModalsContainer />
                    <Footer />
                </PageWrapper>
            </I18nProvider>
        </StoreProvider>
    );
};

export default App;
