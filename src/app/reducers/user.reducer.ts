import { IUser } from '../interfaces/IEntity'
import * as user from '../actions/user.action'
import { createFeatureSelector, createSelector } from '@ngrx/store';
export interface State {
    userInfo: IUser
};
const initialState: State =  {
    userInfo: null
}
export function reducer(state = initialState, action: user.Actions): State {
    switch (action.type) {
        case user.STORE_USER: {
            return { 
                ...state,
                userInfo: action.payload 
            }
        }
        case user.REMOVE_USER: {
            return { 
                ...state,
                userInfo: null 
            }
        }
        case user.UPDATE_USER: {
            return { 
                ...state,
                userInfo: action.payload
            }
        }
        default: {
            return state;
        }
    }
}
export const getUserInfoState = (state: State) => state.userInfo;
export const getArticleState = createFeatureSelector<State>('state');

export const getUserInfo = createSelector(getArticleState, (state: State) => state.userInfo)