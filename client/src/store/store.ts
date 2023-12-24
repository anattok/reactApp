import { configureStore } from '@reduxjs/toolkit';
import userSlice, { JWT_PERSISTENT_STATE } from './user.slice';
import { saveState } from './localStorage';

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

//При изменения состояния мы его получаем (store.getState().user.jwt) и записываем в (JWT_PERSISTENT_STATE);
store.subscribe(() => {
  saveState({ jwt: store.getState().user.jwt }, JWT_PERSISTENT_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
