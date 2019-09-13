import styled from 'styled-components';
import { media } from 'shared/styles/breakpoints';
import colors from 'shared/styles/colors';

export const HorizontalFlex = styled.div<any>`
    display: flex;
    flex-direction: row;
    justify-content: ${props => props.justifyContent || `center`};
    align-items: ${props => props.alignItems || `center`};
    margin: ${props => props.margin || `0`};
    width: 100%;
`;

export const VerticalFlex = styled(HorizontalFlex)`
    flex-direction: column;
`;

export const ResponsiveFlex = styled(HorizontalFlex)`
    ${media.lessThan(`xs-max`)} {
        flex-direction: column;
        ${p => (p.responsiveAlignItems ? `align-items: ${p.responsiveAlignItems};` : ``)}
        ${p =>
            p.responsiveJustifyContent ? `justify-content: ${p.responsiveJustifyContent};` : ``}
    }
`;

export const Section = styled.section`
    width: 100%;

    ${media.lessThan(`xs-max`)} {
        padding: 10px;
    }
`;

export const SectionHeader = styled.h2`
    text-align: center;
    font-size: 3.5rem;
    font-weight: bold;
    color: ${colors.white};
    margin: 2rem 0;

    ${media.lessThan(`xs-max`)} {
        font-size: 3rem;
        margin: 1rem 0;
    }
`;
