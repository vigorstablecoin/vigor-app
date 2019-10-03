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

export type NetworkName = `jungle` | `kylin` | `mainnet`
export function isNetworkName(networkName: string): networkName is NetworkName {
    switch (networkName) {
        case `jungle`:
        case `kylin`:
        case `mainnet`:
            return true;
    }
    return false;
}

export function exhaustiveCheck(x: never) { throw new Error('exhaustiveCheck: should not reach here') }

export type TUserRow = {
    "usern": string;
    "debt": string;
    "collateral": string[];
    "insurance": string[];
    "valueofcol": string;
    "valueofins": string;
    "tesprice": string;
    "pcts": string;
    "volcol": string;
    "stresscol": string;
    "istresscol": string;
    "svalueofcol": string;
    "svalueofcole": string;
    "feespaid": string;
    "creditscore": number;
    "lastupdate": number;
    "latepays": number;
    "recaps": number;
}

export type TGlobalsRow = {
    "solvency": string;
    "valueofcol": string;
    "valueofins": string;
    "scale": string;
    "svalueofcole": string;
    "svalueofins": string;
    "stressins": string;
    "inreserve": string;
    "totaldebt": string;
    "insurance": string[];
    "collateral": string[];
}