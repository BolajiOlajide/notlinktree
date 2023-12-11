import { db } from "$lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { writable } from "svelte/store";

/**
 * @returns a store with realtime updates on document data
 */
export function docStore<T>(path: string) {
    let unsubscribe: () => void;

    const docRef = doc(db, path);
    const { subscribe } = writable<T | null>(null, (set) => {
        unsubscribe = onSnapshot(docRef, (snapshot) => {
            set((snapshot.data() as T) ?? null)
        });

        return () => unsubscribe();
    });

    return { subscribe, ref: docRef, id: docRef.id };
};
