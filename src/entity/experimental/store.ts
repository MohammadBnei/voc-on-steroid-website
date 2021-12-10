import { writable } from "svelte/store";

const createWordListStore = () => {
    const { subscribe, set } = writable<string[]>([]);

    const setList = (words: string[]) => set([...words]);

    return {
        subscribe,
        setList,
    };
};

const wordListStore = createWordListStore();
export default wordListStore;