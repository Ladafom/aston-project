import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import filmsReducer from './films/slice'
import genresReducer from './genres/slice'

export const store = configureStore({
  reducer: {
    films: filmsReducer,
    genres: genresReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
