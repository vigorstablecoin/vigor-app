import { initAccessContext, Wallet } from 'eos-transit';
import scatter from 'eos-transit-scatter-provider';
import ledger from 'eos-transit-ledger-provider';
import lynx from 'eos-transit-lynx-provider';
import meetone from 'eos-transit-meetone-provider';
import tokenpocket from 'eos-transit-tokenpocket-provider';

import { getNetwork } from './networks';
import { WALLETS, walletIdByName } from './constants';

const network = getNetwork();

const accessContext = initAccessContext({
    appName: 'VIGOR Stablecoin App',
    network,
    walletProviders: [scatter(), ledger(), lynx(), meetone(), tokenpocket()],
});

const walletProviders = accessContext.getWalletProviders();

let wallet: Wallet;

export function selectWalletProvider(walletName: WALLETS) {
    const walletId = walletIdByName[walletName];
    const walletProvider = walletProviders.find(w => w.id === walletId);
    if (!walletProvider) throw new Error(`Unknown wallet: "${walletName}"`);
    wallet = accessContext.initWallet(walletProvider);
}

export function getWallet() {
    if (!wallet) throw new Error('Wallet is not initialized yet!');
    return wallet;
}
