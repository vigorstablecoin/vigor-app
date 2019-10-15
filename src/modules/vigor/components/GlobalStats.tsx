import React, { useEffect } from 'react';
import styled from 'styled-components'
import colors from 'shared/styles/colors';
import { useStore } from 'shared/hooks';
import { observer } from 'mobx-react';
import StatsTable from './StatsTable';
import ShowMore from './ShowMore';
import { StatsWrapper } from './styles';
import { FormattedMessage } from 'react-intl.macro';

const Title = styled.h3`
font-weight: 700;
font-size: 1.2rem;
line-height: 34px;
height: 34px;
text-align: center;
margin: 1rem 0 2rem 0;
`

const GlobalStats: React.FC = () => {
  const store = useStore(store => store.vigorStore);

  useEffect(() => {
    store.fetchGlobalStats()
  }, [])

  return (
    <StatsWrapper>
      <Title><FormattedMessage id="vigorHealth" defaultMessage="Vigor Health" /></Title>
      <div>
        {store.globalStats ? <StatsTable keyColor={colors.secondary} data={store.globalStats} /> : null}
      </div>
      <ShowMore /> 
    </StatsWrapper>
  );
};

export default observer(GlobalStats);
