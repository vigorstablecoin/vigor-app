import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Menu from 'shared/components/menu';
import { WALLETS } from 'shared/eos/constants';
import scatterIcon from 'shared/assets/logo-scatter.svg';
import ledgerIcon from 'shared/assets/logo-ledger.svg';
import lynxIcon from 'shared/assets/logo-lynx.svg';
import meetOneIcon from 'shared/assets/logo-meetone.svg';
import tokenPocketIcon from 'shared/assets/logo-tokenpocket.svg';
import colors from 'shared/styles/colors';
import { useStore } from 'shared/hooks';
import { observer } from 'mobx-react';

const loginOptions = [
    {
        content: 'Scatter',
        icon: scatterIcon,
        value: WALLETS.scatter,
    },
    {
        content: 'Ledger',
        icon: ledgerIcon,
        value: WALLETS.ledger,
    },
    {
        content: 'Lynx',
        icon: lynxIcon,
        value: WALLETS.lynx,
    },
    {
        content: 'Meet.One',
        icon: meetOneIcon,
        value: WALLETS.meetone,
    },
    {
        content: 'TokenPocket',
        icon: tokenPocketIcon,
        value: WALLETS.tokenpocket,
    },
];

const userOptions = [
    {
        content: <FormattedMessage id="logOut" defaultMessage="Log Out" />,
        icon: faSignOutAlt,
        value: 'logout',
    },
];

const LoginButton = styled.button`
    font-weight: bold;
    color: ${colors.blue};
`;

const UserButton = styled.button`
    font-weight: bold;
    text-align: center;
    color: ${colors.white};
`;

const LoginOptionWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 140px;
`;

const IconWrapper = styled.div<any>`
    margin-right: 16px;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background-image: url(${props => props.iconSrc});
    background-position: center center;
    background-size: contain;
    background-repeat: no-repeat;
`;
const FAIconWrapper = styled.div`
    margin-right: 16px;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const LoginOption = ({ content, icon }) => {
    let iconComponent;
    if (typeof icon === `string`) {
        iconComponent = <IconWrapper iconSrc={icon} />;
    } else if (Boolean(icon)) {
        iconComponent = (
            <FAIconWrapper>
                <FontAwesomeIcon icon={icon} />
            </FAIconWrapper>
        );
    } else {
        iconComponent = null;
    }

    return (
        <LoginOptionWrapper>
            {iconComponent}
            <div>{content}</div>
        </LoginOptionWrapper>
    );
};

type Props = {};
const LoginDropdown: React.FC<Props> = () => {
    const accountStore = useStore(rootStore => rootStore.accountStore);

    const handleLogin = async value => {
        await accountStore.login(value);
    };
    const handleUserMenuClick = async value => {
        if (value === `logout`) {
            await accountStore.logout();
        }
    };

    if (accountStore.isLoggedIn) {
        return (
            <Menu
                trigger={<UserButton>{accountStore.accountInfo!.account_name}</UserButton>}
                options={userOptions}
                onSelect={handleUserMenuClick}
                renderOption={option => <LoginOption {...option} />}
            />
        );
    }

    return (
        <Menu
            trigger={
                <LoginButton>
                    {accountStore.isLoggingIn ? (
                        <FormattedMessage id="loggingIn" defaultMessage="Logging In" />
                    ) : (
                        <FormattedMessage id="logIn" defaultMessage="Log In" />
                    )}
                </LoginButton>
            }
            options={loginOptions}
            onSelect={handleLogin}
            renderOption={option => <LoginOption {...option} />}
        />
    );
};

export default observer(LoginDropdown);
