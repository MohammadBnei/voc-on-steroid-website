import { writable } from 'svelte/store';
import type { SvelteToastOptions } from '.';

const createToast = () => {
	const { subscribe, update } = writable([]);
	let count = 0;
	let defaults: SvelteToastOptions = {};
	const push = (msg, opts: SvelteToastOptions = {}) => {
		const entry = { id: ++count, msg, ...defaults, ...opts, theme: { ...defaults.theme, ...opts.theme } };
		update((n) => {
			if (n.some(({ msg: _msg }) => _msg === msg)) return n;

			return entry.reversed ? [...n, entry] : [entry, ...n];
		});

		setTimeout(() => pop(entry.id), entry.duration);
		return count;
	};
	const pop = (id) => {
		update((n) => (id ? n.filter((i) => i.id !== id) : n.splice(1)));
	};
	const set = (id, obj) => {
		update((n) => {
			const idx = n.findIndex((i) => i.id === id);
			if (idx > -1) {
				n[idx] = { ...n[idx], ...obj };
			}
			return n;
		});
	};
	const _opts = (obj: any = {}) => {
		defaults = { ...defaults, ...obj, theme: { ...defaults.theme, ...obj.theme } };
		return defaults;
	};
	return { subscribe, push, pop, set, _opts };
};

export const toast = createToast();
