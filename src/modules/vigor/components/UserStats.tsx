import React, { ReactNode } from 'react';
import { observer } from 'mobx-react';
import { useStore } from 'shared/hooks';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from 'react-intl.macro';
import colors from 'shared/styles/colors';
import { getContracts } from 'shared/eos/networks';
import StatsTable from './StatsTable';
import { StatsWrapper } from './styles';


const SearchInput = styled.input`
  font-size: 1.2rem;
  color: ${colors.white};
  background-color: ${colors.bg};
  font-weight: 700;
  text-align: center;
  padding: 4px;
  outline: none;
  border: 2px solid ${colors.bg};
  border-right: none;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  width: 200px;

  &:active, &:focus {
    border: 2px solid ${colors.bgLighter};
    background-color: ${colors.bgLighter}
  }


  &::placeholder {
    color: ${colors.grayDarker};
  }
`

const SearchButton = styled.button`
  font-size: 1.2rem;
  color: ${colors.white};
  background-color: ${colors.bg};
  border: 2px solid ${colors.bg};
  border-left: none;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  padding: 4px 8px;
  outline: none;

  &:active, &:focus {
    border: 2px solid ${colors.bgLighter};
    background-color: ${colors.bgLighter}
  }
`

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  margin: 1rem 0 2rem 0;
`

const MessageContent = styled.div`
  padding: 0.5rem 1rem;
  color: ${colors.gray};
`

const UserStats: React.FC = () => {
  const store = useStore(store => store.vigorStore);

  let content: ReactNode = null
  if (store.isUserFetchDirty) {
    if(store.userStats) content = <StatsTable data={store.userStats} />
    else if (store.isFetching) content = <MessageContent><FormattedMessage id="loadingUserStats" defaultMessage={`Loading user "{account}".`} values={{account: store.lastFetchedAccountName   }} /></MessageContent>;
    else content = <MessageContent><FormattedMessage id="noUserData" defaultMessage={`No data found for account "{account}".`} values={{ account: store.lastFetchedAccountName   }} /></MessageContent>;
  } else {
    content = <MessageContent><FormattedMessage id="searchAccountName" defaultMessage="Choose an EOS account to interact with the VIGOR contract." /></MessageContent>
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    store.fetchUserStats()
  }

  return (
    <StatsWrapper>
      <StyledForm onSubmit={handleSubmit}>
        <SearchInput maxLength={13} placeholder={getContracts().vigor  } value={store.displayAccountName} onChange={store.handleDisplayAccountNameChange}/>
        <SearchButton type="submit"><FontAwesomeIcon size="1x" icon={faSearch} /></SearchButton>
      </StyledForm>
      {content}
    </StatsWrapper>
  );
};

export default observer(UserStats);
