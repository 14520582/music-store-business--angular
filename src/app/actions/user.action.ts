import { Action } from '@ngrx/store';
import { IUser } from '../interfaces/IEntity'
export const STORE_USER = '[User] Store';

export const UPDATE_USER = '[User] Update';

export const REMOVE_USER = '[User] Remove';

export class StoreUser implements Action {
    readonly type = STORE_USER;
    constructor(public payload: IUser) {}
}

export class UpdateUser implements Action {
    readonly type = UPDATE_USER;
    constructor(public payload: IUser) {}
}

export class RemoveUser implements Action {
    readonly type = REMOVE_USER;
    constructor() {}
}
export type Actions = StoreUser | UpdateUser | RemoveUser;