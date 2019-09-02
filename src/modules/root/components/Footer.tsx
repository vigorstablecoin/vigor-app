import React from 'react';
import styled from 'styled-components';
import { media } from 'shared/styles/breakpoints';

const FooterWrapper = styled.section`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 34px 0 75px 0;
    margin-top: 40px;

    ${media.lessThan(`xs-max`)} {
        flex-direction: column;
    }
`;

const Footer = () => {
    return <FooterWrapper></FooterWrapper>;
};

export default Footer;
