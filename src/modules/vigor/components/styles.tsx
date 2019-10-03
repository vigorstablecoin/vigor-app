import styled from 'styled-components';
import colors from 'shared/styles/colors';
import { media } from 'shared/styles/breakpoints';

export const StatsWrapper = styled.div`
  margin: 0 16px;
  padding: 8px 0;
  background-color: ${colors.bgLight};
  min-width: 300px;
  max-width: 360px;
  min-height: 100px;

  ${media.lessThan(`xs-max`)} {
    margin: 16px 0;
  }
`