import React from 'react';
import styled from 'styled-components';
import colors from 'shared/styles/colors';
import Metaballs from 'react-metaballs-js';
import { ReactComponent as VigorCut } from 'shared/assets/vigor/vigor-cut.svg';
import { Section } from 'shared/components/styled';
import heroBg from 'shared/assets/hero-bg.svg';
import { NAVBAR_HEIGHT } from './NavBar';

const HeroWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: ${NAVBAR_HEIGHT + 16}px 0 48px 0;
    background-color: ${colors.bg};
    background: radial-gradient(
            ellipse farthest-corner at center center,
            ${colors.bg}00 0%,
            ${colors.bg}ff 70%
        ),
        url(${heroBg});
`;

const VigorTitleWrapper = styled.div`
    position: relative;
    width: 336px;
    height: 150px;
`;

const VigorCutStyled = styled(VigorCut)`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    /* for interactive metaballs to work */
    pointer-events: none;
    & .pathColor {
        fill: ${colors.bgLight};
    }
`;

const MetaballsStyled = styled(Metaballs)`
    position: absolute;
    top: 40px;
    left: 5px;
    height: calc(100% - 75px);
    width: calc(100% - 10px);
`;

const Hero: React.FC = () => {
    return (
        <HeroWrapper>
            <VigorTitleWrapper>
                <MetaballsStyled
                    numMetaballs={5}
                    minRadius={30}
                    maxRadius={50}
                    speed={10.0}
                    backgroundColor={colors.primary}
                    color={`${colors.bg}00`}
                    interactive="canvas"
                />
                <VigorCutStyled />
            </VigorTitleWrapper>
        </HeroWrapper>
    );
};

export default Hero;
