import { writable } from 'svelte/store';
import { onAuthStateChanged, type User } from 'firebase/auth';

import { auth } from '$lib/firebase';

/**
 * @returns a store with the current firebase user
 */
function userStore() {
    let unsubscribe: () => void;

    if (!auth || !globalThis.window) {
        console.warn('Auth is not initialized or not in browser');;
        const { subscribe } = writable<User | null>(null);
        return { subscribe }
    }

    const { subscribe } = writable<User | null>(auth?.currentUser ?? null, (set) => {
        unsubscribe = onAuthStateChanged(auth, (user) => {
            set(user);
        });

        return () => unsubscribe();
    });

    return { subscribe };
};

export const user = userStore();