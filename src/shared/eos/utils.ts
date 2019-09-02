import { rpc } from './networks';

const MAX_PAGINATION_FETCHES = 5;

// https://github.com/EOSIO/eosjs-api/blob/master/docs/api.md#eos.getTableRows
type GetTableRowsOptions = {
    json?: boolean;
    code?: string;
    scope?: string;
    table?: string;
    lower_bound?: number | string;
    upper_bound?: number | string;
    limit?: number;
    key_type?: string;
    index_position?: string;
    reverse?: boolean;
};

// work around the limit bug in nodes due to max timeout
// https://github.com/EOSIO/eos/issues/3965
export async function fetchRows<T>(options: GetTableRowsOptions): Promise<T[]> {
    const mergedOptions = {
        json: true,
        lower_bound: 0,
        upper_bound: -1,
        limit: 9999,
        ...options,
    };

    let lowerBound = mergedOptions.lower_bound;

    const result = await rpc.get_table_rows({
        ...mergedOptions,
        lower_bound: lowerBound,
    });

    return result.rows;
}

export async function fetchAllRows<T>(
    options: GetTableRowsOptions,
    indexName = `id`,
): Promise<T[]> {
    const mergedOptions = {
        json: true,
        lower_bound: 0,
        upper_bound: -1,
        limit: 9999,
        ...options,
    };

    let rows: T[] = [];
    let lowerBound = mergedOptions.lower_bound;

    for (let i = 0; i < MAX_PAGINATION_FETCHES; i++) {
        const result = await rpc.get_table_rows({
            ...mergedOptions,
            lower_bound: lowerBound,
        });
        rows = rows.concat(result.rows);

        if (!result.more || result.rows.length === 0) break;

        lowerBound = result.rows[result.rows.length - 1][indexName] + 1;
    }

    return rows;
}

type ScopeResult = {
    code: string;
    count: number;
    payer: string;
    scope: string;
    table: string;
};

export async function fetchAllScopes(contract: string, table: string): Promise<string[]> {
    const mergedOptions = {
        json: true,
        lower_bound: 0,
        upper_bound: -1,
        limit: 9999,
        code: contract,
        table,
    };
    const rows = (await rpc.get_table_by_scope(mergedOptions)).rows as ScopeResult[];
    return rows.map(row => row.scope);
}
