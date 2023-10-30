import { localStorageStore } from "@skeletonlabs/skeleton";
import type { Writable } from "svelte/store";

const storeExample: Writable<string> = localStorageStore('storeExample', '');


export default storeExample;