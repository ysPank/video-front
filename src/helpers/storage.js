import { StorageKeys } from '../constants/storageKeys';

export const addToStorage = key => data => localStorage.setItem(key, JSON.stringify(data));
export const readFromStorage = key => () => JSON.parse(localStorage.getItem(key) || null);

export const readUserStorage = readFromStorage(StorageKeys.USER);
export const setToUserStorage = addToStorage(StorageKeys.USER);
