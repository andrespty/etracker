import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { UserReducer } from './reducers/user.reducer';
import { CategoryReducer } from './reducers/category.reducer';
import { UserActionTypes } from './actions/user.actions';
import { CategoryActionTypes } from './actions/category.actions';
import { ExpensesActionTypes } from './actions/expenses.action';
import { ExpensesReducer } from './reducers/expenses.reducer';

export type RootActions = 
  UserActionTypes     |
  CategoryActionTypes |
  ExpensesActionTypes

export const store = configureStore({
  reducer: {
    user: UserReducer,
    categories: CategoryReducer,
    expenses: ExpensesReducer
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
