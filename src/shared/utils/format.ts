import { TAssetSymbol } from "shared/typings";

// https://stackoverflow.com/a/2901298/9843487
export const separateThousands = s => String(s).replace(/\B(?=(\d{3})+(?!\d))/g, ',');


const padToDecimals = (amount: string, decimals = 4) => {
  if (amount.indexOf(`.`) === -1) amount += `.`

  const currentDecimals = (amount.length - 1) - amount.indexOf(`.`)
  const toPad = decimals - currentDecimals
  if (toPad > 0) amount = `${amount}${`0`.repeat(toPad)}`
  else if (toPad < 0) amount = amount.slice(0, toPad) // remove abs(toPad) from end 

  return amount
}

export const makeAssetString = (amount: string, symbol: TAssetSymbol) => {
  return `${padToDecimals(amount, symbol.precision)} ${symbol.code}`
}

// number with optional decimals
export const amountRegex = /^(\d+\.?\d*)$/;