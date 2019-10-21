import {
  getWallet,
} from 'shared/eos/wallet';
import { Action } from 'eosjs/dist/eosjs-serialize';
import { getContracts } from './networks';

export type TransactionResult = {
  transaction_id: string;
};

const transactionOptions = {
  broadcast: true,
  blocksBehind: 3,
  expireSeconds: 300,
};

const createAction = (action: any): Action => {
  return {
    account: getContracts().vigor,
    authorization: [
      {
        actor: getWallet().auth!.accountName,
        permission: getWallet().auth!.permission,
      },
    ],
    data: {},
    ...action,
  }
};

type TTxResult = {
  transaction_id: string;
  processed: any;
}
export const sendTransaction = async (actions: Partial<Action>[] | Partial<Action>) => {
  const actionsArr = Array.isArray(actions) ? actions : [actions]

  return getWallet().eosApi.transact(
    {
      actions: actionsArr.map(createAction)
    },
    transactionOptions,
  ) as Promise<TTxResult>;
}
