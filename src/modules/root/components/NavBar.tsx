import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Logo } from 'shared/assets/vigor/logo-no-text.svg';
import { media } from 'shared/styles/breakpoints';
import LoginDropdown from './LoginDropdown';
import LanguageDropdown from 'modules/i18n/components/LanguageDropdown';
import colors from 'shared/styles/colors';

export const NAVBAR_HEIGHT = 48;

const NavWrapper = styled.nav`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: ${NAVBAR_HEIGHT}px;
    background-color: ${colors.bg}e0;
`;

const NavCenter = styled.div`
    max-width: 1280px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 8px 4px 8px;
    margin: 0 auto;
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
    text-transform: uppercase;

    ${media.lessThan(`xs-max`)} {
        display: none;
    }
`;

const NavBar: React.FC<{}> = () => {
    return (
        <NavWrapper>
            <NavCenter>
                <LeftBlock>
                    <Logo width={40} height={40} />
                    <LogoText>Vigor</LogoText>
                </LeftBlock>

                <RightBlock>
                    <LanguageDropdown />
                    <LoginDropdown />
                </RightBlock>
            </NavCenter>
        </NavWrapper>
    );
};

export default NavBar;
