// @flow

import { openSchema } from '../schema';
import Realm from 'realm';

export type Location = {
    id:number,
    city:string,
    state:string
}

export const LocationSchema = {
    name: 'Location',
    primaryKey: 'id',
    properties:{
        id: 'int',
        city: 'string',
        state: 'string'
    }
}
