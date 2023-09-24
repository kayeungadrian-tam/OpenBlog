import { browser } from '$app/environment';
import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';
const storeExample: Writable<string> = localStorageStore('storeExample', 'initialValueHere');

storeExample.subscribe((value) => {
    if (browser) {
        window.localStorage.setItem('storeExample', value);
    }
});

export default storeExample;