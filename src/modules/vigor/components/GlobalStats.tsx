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

  const [ showAll, setShowAll ] = React.useState( false );
  const [ stats, setStats ] = React.useState<any | null>( null );
  
  const store = useStore(store => store.vigorStore);

  console.log( 'Store: ');

  const updateShowAll = () => {

    const statsState = ( !!showAll ) ? getInfo( store.globalStats, 5) : store.globalStats ;
    setShowAll( !showAll );
    setStats( statsState );
  
  };

  const getInfo = ( list, rows = 0 ) => ( ( rows === 0 ) ? Object.entries( list ) : Object.entries( list ).slice( 0, rows ) );

  async function getGlobalStats () {

    const result =  await store.fetchGlobalStats();

    setStats( getInfo( store.globalStats, 4) );
  }

  useEffect(() => {

    getGlobalStats();
    
  }, [])

  return (
    <StatsWrapper>
      <Title><FormattedMessage id="vigorHealth" defaultMessage="Vigor Health" /></Title>
      <div>
        { stats ? <StatsTable key={stats[0]} keyColor={colors.secondary} data={stats}  showMinimal={!showAll}/> : null}
      </div>
      <ShowMore onToggle={updateShowAll}/> 
    </StatsWrapper>
  );
};

export default observer(GlobalStats);
