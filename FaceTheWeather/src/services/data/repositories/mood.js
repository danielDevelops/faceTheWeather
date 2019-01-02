// @flow

import { openSchema } from '../schema';
import Realm from 'realm';
import {type Weather} from './weather';


export type Mood = {
    id: number,
    weather: Weather,
    emotion: string
}

export const MoodSchema = {
    name: 'Mood',
    primaryKey: 'id',
    properties:{
        id: 'int',
        weather: 'Weather',
        emotion: 'string'
    }
}
