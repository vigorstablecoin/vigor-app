import flattenDeep from 'lodash/flattenDeep';
import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl.macro';
import { getWallet } from 'shared/eos/wallet';
import styled from 'styled-components';
import ModalBase, { ModalTitle } from './ModalBase';
import colors from 'shared/styles/colors';

const LedgerInfo = styled.p`
    font-size: 0.9rem;
    font-style: italic;
    text-align: center;
    padding: 0 4rem;
    margin: 1rem 0;
`;

const List = styled.ul`
    display: flex;
    align-items: center;
    flex-direction: column;
    max-height: 300px;
    overflow-y: auto;
    width: 100%;

    /* reset list styles */
    text-indent: 0;
    list-style: none;
    padding-left: 0;

    /* For firefox: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scrollbars */
    scrollbar-color: ${colors.bg} ${colors.bgLighter};
    scrollbar-width: thin;

    &::-webkit-scrollbar {
        width: 10px;
    }

    &::-webkit-scrollbar-track {
        background: ${colors.bgLighter};
    }

    &::-webkit-scrollbar-thumb {
        background: ${colors.bg};
    }
`;

const ListItem = styled.li`
    width: 100%;
    text-align: center;
    padding: 1rem 0;
    cursor: pointer;

    &:nth-child(odd) {
        background-color: ${colors.bgLighter};
    }

    &:hover {
        color: ${colors.primary};
    }
`;

type Props = {
    onSubmit: (data: AccountData) => void;
    onCancel: () => void;
};

const fetchAccounts = async setAccounts => {
    try {
        const pathIndexList = [0, 1, 2];
        const allAccounts: AccountData[] = [];
        for (const index of pathIndexList) {
            // pathIndexList is concatenaded automatically by eos-transit
            const data: DiscoveryData = await getWallet().discover({ pathIndexList: [index] });
            const newAccounts = flattenDeep(
                data.keyToAccountMap.map(accountsMap =>
                    accountsMap.accounts.map(acc => ({
                        account: acc.account,
                        authorization: acc.authorization,
                        index: accountsMap.index,
                        key: accountsMap.key,
                    })),
                ),
            );

            allAccounts.push(...newAccounts);
            setAccounts(allAccounts);
        }
    } catch (error) {
        console.error(error);
    }
};

const LedgerModal: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [accounts, setAccounts] = useState<AccountData[]>([]);
    useEffect(() => {
        fetchAccounts(setAccounts).catch(err => console.error(`caught`, err));
        return undefined;
    }, []);

    const handleSubmit = (account: AccountData) => {
        onSubmit(account);
    };

    return (
        <ModalBase onCancel={onCancel} width={720} padding="1rem 0">
            <ModalTitle>
                <FormattedMessage id="ledgerConnecting" defaultMessage="Connecting to Ledger ..." />
            </ModalTitle>
            <LedgerInfo>
                <FormattedMessage
                    id="ledgerInfo"
                    defaultMessage="Make sure you have the latest EOS app installed, your ledger is unlocked and the EOS app is open."
                />
            </LedgerInfo>
            <List>
                {accounts.map((account, index) => (
                    <ListItem key={index} onClick={() => handleSubmit(account)}>
                        {account.account}@{account.authorization}
                    </ListItem>
                ))}
            </List>
        </ModalBase>
    );
};

export default LedgerModal;

type AccountData = {
    account: string;
    authorization: string;
    index: number;
    key: string;
};

interface DiscoveryAccount {
    index: number;
    key: string;
    accounts: {
        account: string;
        authorization: string;
    }[];
}

interface DiscoveryData {
    keyToAccountMap: DiscoveryAccount[];
    keys?: {
        index: number;
        key: string;
    }[];
}
