import { store } from "../Redux/store";

export type StoreType = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
