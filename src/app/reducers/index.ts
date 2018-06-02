import { combineReducers } from '@ngrx/store';
import { ActionReducerMap, ActionReducer } from '@ngrx/store';
import * as fromUser from './user.reducer';

export interface State {
    user: fromUser.State;
  }
export const reducers : ActionReducerMap<State> = {
    user: fromUser.reducer
}

// const productionReducer: ActionReducer<State> = combineReducers(reducers);

// export function reducer(state: any, action: any) {
//       return productionReducer(state, action);
    
// }