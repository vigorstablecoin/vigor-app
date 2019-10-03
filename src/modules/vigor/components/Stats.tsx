import React from 'react';
import styled from 'styled-components'
import colors from 'shared/styles/colors';
import UserStats from './UserStats';
import GlobalStats from './GlobalStats';
import { ResponsiveFlex } from 'shared/components/styled';

const Wrapper = styled(ResponsiveFlex)`
`

const Stats: React.FC = () => {
    return (
      <Wrapper alignItems="flex-start" responsiveAlignItems="center">
        <UserStats />
        <GlobalStats />
      </Wrapper>
    );
};

export default Stats;
