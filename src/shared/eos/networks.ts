import { IEOSNetwork } from '../typings';
import { JsonRpc } from 'eosjs';
import { getNetworkNameFromStorage } from 'shared/local-storage';

const createNetwork = (nodeEndpoint: string, chainId: string): IEOSNetwork => {
    const matches = /^(https?):\/\/(.+):(\d+)\D*$/.exec(nodeEndpoint);
    if (!matches) {
        throw new Error(
            `Could not parse EOS HTTP endpoint. Needs protocol and port: "${nodeEndpoint}"`,
        );
    }

    const [, httpProtocol, host, port] = matches;

    return {
        chainId,
        protocol: httpProtocol,
        host,
        port: Number.parseInt(port, 10),
        nodeEndpoint,
    };
};

const KylinNetwork: IEOSNetwork = createNetwork(
    `https://api-kylin.eoslaomao.com:443`,
    `5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191`,
);

const JungleNetwork: IEOSNetwork = createNetwork(
    `https://jungle2.cryptolions.io:443`,
    `e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473`,
);

const MainNetwork: IEOSNetwork = createNetwork(
    `https://eos.greymass.com:443`,
    `aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906`,
);

function getNetwork() {
    const eosNetwork = getNetworkNameFromStorage();

    switch (eosNetwork) {
        case `jungle`:
            return JungleNetwork;
        case `kylin`:
            return KylinNetwork;
        case `mainnet`:
            return MainNetwork;
        default:
            return MainNetwork;
    }
}

const network = getNetwork();

const rpc = new JsonRpc(network.nodeEndpoint);

export { getNetwork, rpc };
