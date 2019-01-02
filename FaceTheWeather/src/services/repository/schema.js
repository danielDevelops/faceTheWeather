// @flow

import Realm from 'realm';

export type UserInfo = {
    id:number,
    FirstName:string,
    LastName:string
}
export const UserInfoSchema = {
    name:'UserInfo',
    primaryKey: 'id',
    properties:{
        id: 'int',
        FirstName:'string',
        LastName:'string'
    }
}

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

export const openSchema = async () : Promise<Realm> => {
    const realm = await Realm.open({schema:[LocationSchema,MoodSchema,UserInfoSchema,WeatherSchema]});
    return realm;
}

