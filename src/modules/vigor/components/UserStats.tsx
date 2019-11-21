import React, { ReactNode } from 'react';
import { observer } from 'mobx-react';
import { useStore } from 'shared/hooks';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from 'react-intl.macro';
import omit from 'lodash/omit'
import colors from 'shared/styles/colors';
import { getContracts } from 'shared/eos/networks';
import { decomposeAsset, formatAsset } from 'shared/eos/asset';
import StatsTable from './StatsTable';
import { StatsWrapper } from './styles';
import { TExtendedSymbol, TAsset } from 'shared/typings';
import { TokenModalTypes } from 'modules/modals/typings';


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

const StatsBlock = styled.div`
  margin: 0 0 2rem 0;
`

const StatsBlockHeader = styled.h3`
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: center;
  color: ${colors.primary};
`

const TokenButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
  padding: 4px 16px;
  margin: 8px 0;
  & > *:first-child {
    font-size: 0.9rem;
    font-weight: 600;
    flex: 1 1 0;
  }
  & > *:not(:first-child) {
    flex: 0 0 auto;
  }
`

const Padding = styled.div`
  /* do not use hidden because it's a styled component special prop */
  visibility: ${p => p.hide ? `collapse` : `visible`};

  &:not(:last-of-type) {
    padding: 0 8px 0 0;
  }
`

const StyledButton = styled.button<any>`
  padding: 4px 8px;
  background-color: ${colors.bg};
  text-transform: uppercase;
  font-size: 0.8rem;

  &:hover, &:focus, &:active {
    background-color: ${colors.bgLightest};
  }

  &:focus {
    outline: 1px solid ${colors.primaryDark};
  }
`

const UserStats: React.FC = () => {
  const [transactionStore, modalStore, vigorStore] = useStore(store => [store.transactionStore, store.modalStore, store.vigorStore]);
  const userStore = vigorStore.user

  const renderDepositWithdrawRow = (token: TExtendedSymbol, isCollateral = true) => {
    const userCommitts = isCollateral ? userStore.userCollateral!.collateral : userStore.userInsurance!.insurance

    const found = userCommitts.find(({ symbol }) => symbol.code === token.symbol.code)
    const commitVal = found ? found.amount : 0
    const commitFormatted = formatAsset({ amount: commitVal, symbol: token.symbol })
    const userBalanceVal = userStore.getToken(token.symbol.code).amount

    const handleTokenClick = (type: TokenModalTypes) => async () => {
      const maxAmount = type === `DEPOSIT` ? userBalanceVal : commitVal
      const { data, canceled } = await modalStore.showModal<TAsset>(`TOKEN`, { type, token, maxAmount });

      if (canceled) return;

      const quantity = data!

      if (isCollateral && type === `DEPOSIT`) {
        return transactionStore.depositCollateral({ quantity })
      } else if (isCollateral && type === `WITHDRAW`) {
        return transactionStore.withdrawCollateral({ quantity })
      } else if (!isCollateral && type === `DEPOSIT`) {
        return transactionStore.depositInsurance({ quantity })
      } else if (!isCollateral && type === `WITHDRAW`) {
        return transactionStore.withdrawInsurance({ quantity })
      }
    }

    return <TokenButtonRow key={token.contract}>
      <Padding>{commitFormatted}</Padding>
      <Padding hide={commitVal === 0}>{<StyledButton type="button" onClick={handleTokenClick(`WITHDRAW`)}><FormattedMessage id="withdraw" defaultMessage="Withdraw" /></StyledButton>}</Padding>
      <Padding hide={userBalanceVal === 0}>{<StyledButton type="button" onClick={handleTokenClick(`DEPOSIT`)}><FormattedMessage id="deposit" defaultMessage="Deposit" /></StyledButton>}</Padding>
    </TokenButtonRow>
  }

  const renderBorrowPayOffRow = (token: TExtendedSymbol) => {
    const userBalance = userStore.getToken(token.symbol.code)
    const userDebtFormatted = userStore.userBorrowStats!.debt
    const userDebtVal = decomposeAsset(userDebtFormatted).amount

    const handleTokenClick = (type: TokenModalTypes) => async () => {
      // TODO: compute max amount we can borrow here
      const maxAmount = type === `BORROW` ? 1e9 : userDebtVal
      const { data, canceled } = await modalStore.showModal<TAsset>(`TOKEN`, { type, token, maxAmount });

      if (canceled) return;

      const quantity = data!

      if (type === `BORROW`) {
        return transactionStore.borrow({ quantity })
      } else if (type === `PAYOFFDEBT`) {
        return transactionStore.payoff({ quantity })
      }
    }

    return <TokenButtonRow key={token.contract}>
      <Padding>{formatAsset(userBalance)}</Padding>
      <Padding>{<StyledButton type="button" onClick={handleTokenClick(`BORROW`)}><FormattedMessage id="borrow" defaultMessage="Borrow" /></StyledButton>}</Padding>
      <Padding hide={userDebtVal === 0}>{<StyledButton type="button" onClick={handleTokenClick(`PAYOFFDEBT`)}><FormattedMessage id="payoffdebt" defaultMessage="Payoff" /></StyledButton>}</Padding>
    </TokenButtonRow>
  }

  const renderContent = () => {
    const Collateral = <StatsBlock>
      <StatsBlockHeader><FormattedMessage id="collateral" defaultMessage="Collateral" /></StatsBlockHeader>
      <div>
        {
          vigorStore.availableTokensToInsure.map(token => renderDepositWithdrawRow(token, true))
        }
      </div>
      <StatsTable data={omit(userStore.userCollateral, `collateral`)} />
    </StatsBlock>

    const Insurance = <StatsBlock>
      <StatsBlockHeader><FormattedMessage id="insurance" defaultMessage="Insurance" /></StatsBlockHeader>
      <div>
        {
          vigorStore.availableTokensToInsure.map(token => renderDepositWithdrawRow(token, false))
        }
      </div>
      <StatsTable data={omit(userStore.userInsurance, `insurance`)} />
    </StatsBlock>

    const Borrow = <StatsBlock>
      <StatsBlockHeader><FormattedMessage id="borrow" defaultMessage="Borrow" /></StatsBlockHeader>
      <div>
        {
          vigorStore.availableTokensToBorrow.map(token => renderBorrowPayOffRow(token))
        }
      </div>
      <StatsTable data={omit(userStore.userBorrowStats)} />
    </StatsBlock>

    const Extended = <StatsBlock>
      <StatsBlockHeader><FormattedMessage id="extended" defaultMessage="Extended" /></StatsBlockHeader>
      <StatsTable data={userStore.userExtendedStats} />
    </StatsBlock>

    return <React.Fragment>
      {Collateral}
      {Insurance}
      {Borrow}
      {Extended}
    </React.Fragment>
  }

  let content: ReactNode = null
  if (userStore.isUserFetchDirty) {
    if (userStore.userExtendedStats) content = renderContent()
    else if (userStore.isFetching) content = <MessageContent><FormattedMessage id="loadingUserStats" defaultMessage={`Loading user "{account}".`} values={{ account: userStore.lastFetchedAccountName }} /></MessageContent>;
    else content = <MessageContent><FormattedMessage id="noUserData" defaultMessage={`No data found for account "{account}".`} values={{ account: userStore.lastFetchedAccountName }} /></MessageContent>;
  } else {
    content = <MessageContent><FormattedMessage id="searchAccountName" defaultMessage="Choose an EOS account to interact with the VIGOR contract." /></MessageContent>
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    userStore.fetchUser()
  }

  return (
    <StatsWrapper>
      <StyledForm onSubmit={handleSearchSubmit}>
        <SearchInput maxLength={13} placeholder={getContracts().vigor} value={userStore.displayAccountName} onChange={userStore.handleDisplayAccountNameChange} />
        <SearchButton type="submit"><FontAwesomeIcon size="1x" icon={faSearch} /></SearchButton>
      </StyledForm>
      {content}
    </StatsWrapper>
  );
};

export default observer(UserStats);
