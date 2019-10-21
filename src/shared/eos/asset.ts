import BigNumber from "bignumber.js";
import { TAsset, TAssetSymbol } from "shared/typings";
import { separateThousands } from "shared/utils/format";

type FormatOptions = {
  withSymbol?: boolean;
  separateThousands?: boolean;
};

export type FormattableAsset = {
  amount: number | BigNumber;
  symbol: TAssetSymbol;
};
/**
 * Example:
 * { amount: 1230000, symbol: { symbolCode: 'DAPP', precision: 4 }} => '123.0000 DAPP'
 */
export function formatAsset({ amount, symbol }: FormattableAsset, formatOptions?: FormatOptions): string {
  const options: FormatOptions = Object.assign(
    {
      withSymbol: true,
      separateThousands: false,
    },
    formatOptions || {},
  );
  const { precision, code } = symbol;
  let s = String(amount).split(`.`)[0];
  while (s.length < precision + 1) {
    s = `0${s}`;
  }

  let pre = s.slice(0, -precision);
  const decimals = s.slice(-precision);

  if (options.separateThousands) {
    // adds `,` thousand separators
    pre = separateThousands(pre);
  }

  let result = `${pre}.${decimals}`;
  if (options.withSymbol) result = `${result} ${code}`;
  return result;
}

/**
 * Example
 * '123.0000 DAPP' => { amount: 1230000, symbol: { symbolCode: 'DAPP', precision: 4 }}
 */
export function decomposeAsset(assetString: string): TAsset {
  try {
    const [amountWithPrecision, symbolName] = assetString.split(` `);
    if (!amountWithPrecision || !symbolName) {
      throw new Error(`Invalid split`);
    }
    const amountNoPrecision = Number.parseInt(amountWithPrecision.replace(`.`, ``), 10);

    const dotIndex = amountWithPrecision.indexOf(`.`);
    if (dotIndex === -1) {
      throw new Error(`No dot found`);
    }
    const precision = amountWithPrecision.length - dotIndex - 1;

    return {
      amount: amountNoPrecision,
      symbol: {
        precision,
        code: symbolName,
      },
    };
  } catch (error) {
    throw new Error(
      `Invalid asset passed to decomposeAsset: ${JSON.stringify(assetString)}. ${error.message}`,
    );
  }
}
