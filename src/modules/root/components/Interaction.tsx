import React from 'react';
import styled from 'styled-components';
import colors from 'shared/styles/colors';
import pageBg from 'shared/assets/vigor/background-logo-alpha-white.svg';
import { Section } from 'shared/components/styled';

const InteractionWrapper = styled(Section)`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 500px;

    ::before {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        content: '';
        z-index: -1;
        background: ${colors.bg} url(${pageBg}) no-repeat top center;
        background-size: auto 40%;
        background-position: 50% 90%;
    }
`;

const Interaction = () => {
    return <InteractionWrapper></InteractionWrapper>;
};

export default Interaction;
