import { store } from "../Redux/Store";

export type StoreType = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
