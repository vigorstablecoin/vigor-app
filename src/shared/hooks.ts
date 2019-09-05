import { useContext, useEffect } from 'react';
import RootStore, { storeContext } from 'modules/root/store';

export const useStore = <Store>(storeSelector: (rootStore: RootStore) => Store) => {
    const value = useContext(storeContext);
    if (!value) {
        throw new Error(`storeContext does not have any value`);
    }
    const store = storeSelector(value);
    return store;
};

export const useOnClickOutside = (ref, handler) => {
    useEffect(() => {
        const listener = event => {
            // Do nothing if clicking ref's element or descendent elements
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }

            handler(event);
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
};
