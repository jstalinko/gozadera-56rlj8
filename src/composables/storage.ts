import { Storage } from "@ionic/storage";

const store = new Storage();

(async () => {
    await store.create();
})();

export const tokenExist = async () => {
    let token = await store.get('_token');
    
    return token == null ? false : true;
}

export const getToken = async () => {
    return await tokenExist() ? store.get('_token') : null;
}

export const setToken = async (token: string) => {
    return await store.set('_token',token);
}

export const clearStorage = async() => {
    return await store.clear();
}
export const setStore = async (key: any,value: any) => {
    return await store.set(key,value);
}
export const getStore = async(key: any) => {
    return await store.get(key);
}

export default store;