import { WALLETS } from './eos/constants';

const LOGGED_IN_LS_KEY = 'vigor__LoggedIn';
const WALLET_LS_KEY = 'vigor__WalletProvider';
const LOGIN_PARAMS_LS_KEY = 'vigor__LoginParams';
const EOS_NETWORK_LS_KEY = 'vigor__EOSNetwork';

export const getNetworkNameFromStorage = () => {
    return localStorage.getItem(EOS_NETWORK_LS_KEY);
};

export const setNetworkNameToStorage = networkName => {
    return localStorage.setItem(EOS_NETWORK_LS_KEY, networkName);
};

export const getLoginStatusFromStorage = () => {
    return localStorage.getItem(LOGGED_IN_LS_KEY);
};

export const setLoginStatusToStorage = (isLoggedIn = 'false') => {
    localStorage.setItem(LOGGED_IN_LS_KEY, isLoggedIn);
};

export const getWalletProviderFromStorage = () => {
    return localStorage.getItem(WALLET_LS_KEY);
};

export const setWalletProviderToStorage = (walletName: WALLETS) => {
    localStorage.setItem(WALLET_LS_KEY, walletName);
};

export const getLoginParamsFromStorage = () => {
    return JSON.parse(localStorage.getItem(LOGIN_PARAMS_LS_KEY) || 'null');
};

export const setLoginParamsToStorage = loginParams => {
    localStorage.setItem(LOGIN_PARAMS_LS_KEY, JSON.stringify(loginParams));
};
