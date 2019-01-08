// @flow

import Realm from 'realm';
import { DBSchema } from '../db';
import { LocationSchema } from '../schema';

export type Location = {
    id:number,
    city:string,
    state:string
}

const db:DBSchema<Location> = new DBSchema(LocationSchema.name);
export function getLocation () {
    return 'my location';
}