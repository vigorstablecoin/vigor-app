import flattenDeep from 'lodash/flattenDeep';
import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl.macro';
import styled from 'styled-components';
import ModalBase, { ModalTitle } from './ModalBase';
import colors from 'shared/styles/colors';
import { TExtendedSymbol, TAsset } from 'shared/typings';
import { formatAsset, decomposeAsset } from 'shared/eos/asset';
import { HorizontalFlex } from 'shared/components/styled';
import { makeAssetString, amountRegex } from 'shared/utils/format';
import { TokenModalTypes } from '../typings';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0 2rem 0;
`

const StyledInput = styled.input`
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


const InputSuffix = styled.div`
  font-size: 1.2rem;
  color: ${colors.white};
  background-color: ${colors.bg};
  border: 2px solid ${colors.bg};
  border-left: none;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  padding: 4px 8px;
  outline: none;
`

const StyledButton = styled.button`
  padding: 8px 16px;
  color: ${colors.bg};
  background-color: ${colors.primaryDark};
  font-size: 1rem;

  &:hover, &:focus, &:active {
    color: ${colors.primary};
    background-color: ${colors.bgLightest};
  }

  &:focus {
    outline: 1px solid ${colors.primaryDark};
  }

  &:disabled {
    color: ${colors.gray};
    background-color: ${colors.bgLighter};
    cursor: not-allowed;
  }
`

const MaxButton = styled.button`
    color: ${colors.white};
    padding: 0;
    margin: 2px 0 24px 0;
    outline: none;
    text-transform: uppercase;
    font-size: 0.8rem;
    align-self: flex-end;

    &:hover, &:active {
    color: ${colors.grayDark};
  }
    &:focus {
    color: ${colors.whiteDarkest};
  }
`

type Props = {
    onSubmit: (data: TAsset) => void;
    onCancel: () => void;
    type: TokenModalTypes,
    token: TExtendedSymbol;
    maxAmount?: number
};

const TokenModal: React.FC<Props> = ({ onSubmit, onCancel, type, token, maxAmount = 0 }) => {
    const [value, setValue] = useState<string>(``);
    const isValid = amountRegex.test(value)

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onSubmit(decomposeAsset(makeAssetString(value, token.symbol)));
    };

    const handleMaxClick = () => {
        setValue(formatAsset({ amount: maxAmount, symbol: token.symbol }, { withSymbol: false }));
    };

    const renderTitle = () => {
        switch (type) {
            case `DEPOSIT`:
                return <FormattedMessage id="modalDepositTitle" defaultMessage="Deposit {symbol}" values={{ symbol: token.symbol.code }} />
            case `WITHDRAW`:
                return <FormattedMessage id="modalWithdrawTitle" defaultMessage="Withdraw {symbol}" values={{ symbol: token.symbol.code }} />
        }
    }

    const renderButtonText = () => {
        switch (type) {
            case `DEPOSIT`:
                return <FormattedMessage id="modalDepositButton" defaultMessage="Deposit" />
            case `WITHDRAW`:
                return <FormattedMessage id="modalWithdrawButton" defaultMessage="Withdraw" />
        }
    }

    return (
        <ModalBase onCancel={onCancel} width={480} padding="1rem 0">
            <ModalTitle>
                {renderTitle()}
            </ModalTitle>
            <StyledForm onSubmit={handleSubmit}>
                <HorizontalFlex>
                    <StyledInput
                        placeholder={formatAsset({ amount: Math.pow(10, token.symbol.precision), symbol: token.symbol }, { withSymbol: false })}
                        value={value}
                        maxLength={token.symbol.precision + 8}
                        onChange={(evt) => setValue(evt.target.value)}
                    />
                    <InputSuffix>{token.symbol.code}</InputSuffix>
                </HorizontalFlex>
                <MaxButton type="button" onClick={handleMaxClick}><FormattedMessage id="modalMaxBalance" defaultMessage="MAX {balance}" values={{ balance: formatAsset({ amount: maxAmount, symbol: token.symbol }) }} /></MaxButton>
                <StyledButton disabled={!isValid} type="submit">{renderButtonText()}</StyledButton>
            </StyledForm>
        </ModalBase>
    );
};

export default TokenModal;
