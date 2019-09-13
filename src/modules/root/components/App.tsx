import I18nProvider from 'modules/i18n/components/I18nProvider';
import ModalsContainer from 'modules/modals/components/ModalsContainer';
import React, { useEffect } from 'react';
import { useStore } from 'shared/hooks';
import colors from 'shared/styles/colors';
import GlobalStyles from 'shared/styles/global';
import styled from 'styled-components';
import { rootStore, storeContext } from '../store';
import Footer from './Footer';
import NavBar from './NavBar';
import Hero from './Hero';
import Interaction from './Interaction';

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
    background-color: ${colors.bg};
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
                    <Hero />
                    <Interaction />
                    <ModalsContainer />
                    <Footer />
                </PageWrapper>
            </I18nProvider>
        </StoreProvider>
    );
};

export default App;
