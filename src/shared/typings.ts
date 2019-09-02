export type IEOSNetwork = {
    chainId: string;
    nodeEndpoint: string;
    protocol: string;
    host: string;
    port: number;
};

// mimicks EOS C++ smart contract microseconds class
type microseconds = {
    _count: number | string;
};

// mimicks EOS C++ smart contract symbol class
export type EOSSymbol = {
    code: string;
    precision: number;
};

// mimicks EOS C++ smart contract extended_symbol class
export type ExtendedSymbol = {
    symbol: EOSSymbol;
    contract: string;
};

export type Asset = {
    amount: number;
    symbol: EOSSymbol;
};
