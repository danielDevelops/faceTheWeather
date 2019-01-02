// @flow

import { openSchema } from '../schema';
import Realm from 'realm';
import {type Location } from './location';
export type Weather = {
    id: number,
    temperature: string,
    precipitationType: string,
    precipitationPercentage: string,
    location: Location
}

export const WeatherSchema = {
    name: 'Weather',
    primaryKey: 'id',
    properties:{
        id: 'int',
        temperature: 'string',
        precipitationType: 'string',
        precipitationPercentage: 'string',
        location: 'Location'
    }
}