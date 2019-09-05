import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Logo } from 'shared/assets/vigor/logo-no-text.svg';
import { media } from 'shared/styles/breakpoints';
import LoginDropdown from './LoginDropdown';
import LanguageDropdown from 'modules/i18n/components/LanguageDropdown';

const NavWrapper = styled.nav`
    width: 100%;
    max-width: 1280px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 8px 0 8px;
`;

const LeftBlock = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`;

const RightBlock = styled(LeftBlock)`
    margin-left: auto;
`;

const LogoText = styled.div`
    font-size: 1.25rem;
    font-weight: bold;
    margin-left: 8px;
    text-transform: capitalize;

    ${media.lessThan(`xs-max`)} {
        display: none;
    }
`;

const NavBar: React.FC<{}> = () => {
    return (
        <NavWrapper>
            <LeftBlock>
                <Logo width={40} height={40} />
                <LogoText>Vigor</LogoText>
            </LeftBlock>

            <RightBlock>
                <LanguageDropdown />
                <LoginDropdown />
            </RightBlock>
        </NavWrapper>
    );
};

export default NavBar;
