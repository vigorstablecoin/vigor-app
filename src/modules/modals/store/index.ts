import { action, observable } from 'mobx';
import RootStore from 'modules/root/store';
import { ModalTypes } from '../typings';

type ModalItem<SubmitData> = {
    id: number;
    onSubmit: (data: SubmitData) => void;
    onCancel: () => void;
    additionalProps?: any;
    type: ModalTypes;
};

type showModalReturnType<T> = {
    canceled: boolean;
    data?: T;
};

export default class ModalStore {
    rootStore: RootStore;
    @observable modals = observable.array<ModalItem<any>>([]);

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @action showModal = async <SubmitData>(
        type: ModalTypes,
        additionalProps?: any,
    ): Promise<showModalReturnType<SubmitData>> => {
        return new Promise(resolve => {
            const nextId = Math.max(...this.modals.map(({ id }) => id)) + 1;

            const modalObj = {
                id: nextId,
                onSubmit: (data: SubmitData) => {
                    this.modals.replace(this.modals.filter(({ id }) => id !== nextId));
                    resolve({ data, canceled: false });
                },
                onCancel: () => {
                    this.modals.replace(this.modals.filter(({ id }) => id !== nextId));
                    resolve({ canceled: false });
                },
                additionalProps,
                type,
            };

            this.modals.push(modalObj);
        });
    };
}
