import { writable } from 'svelte/store';

const initialState = {
    user: null,
    isLoggedIn: false,
};

export const auth = writable(initialState);