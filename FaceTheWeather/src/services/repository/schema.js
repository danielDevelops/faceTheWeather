// @flow

import Realm from 'realm';

export const UserInfoSchema = {
    name:'UserInfo',
    primaryKey: 'id',
    properties:{
        id: 'int',
        FirstName:'string',
        LastName:'string'
    }
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

