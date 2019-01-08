// @flow

import schema from '../schema';
import Realm from 'realm';
import {type Location } from './location';
export type Weather = {
    id: number,
    temperature: string,
    precipitationType: string,
    precipitationPercentage: string,
    temperature:number,
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
        temperature:'int',
        location: 'Location'
    }
}