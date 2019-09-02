import React from 'react';
import { observer } from 'mobx-react';
import { useStore } from 'shared/hooks';
import styled, { createGlobalStyle } from 'styled-components';
import colors from 'shared/styles/colors';
import LedgerModal from './LedgerModal';

const GlobalBodyNoScrollStyle = createGlobalStyle`
  body {
    overflow-y: hidden;
  }
`;

const Section = styled.section`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${colors.bg}a0;
`;

const ModalsContainer: React.FC<{}> = () => {
    const modalStore = useStore(rootStore => rootStore.modalStore);

    if (modalStore.modals.length === 0) return null;

    return (
        <Section id="modals">
            <GlobalBodyNoScrollStyle />
            {modalStore.modals.map(modal => {
                let ModalComponent;
                switch (modal.type) {
                    case 'LEDGER':
                        ModalComponent = LedgerModal;
                        break;
                    default:
                        ModalComponent = null;
                }
                return (
                    <ModalComponent
                        key={modal.type}
                        onSubmit={modal.onSubmit}
                        onCancel={modal.onCancel}
                        {...modal.additionalProps}
                    />
                );
            })}
        </Section>
    );
};

export default observer(ModalsContainer);
