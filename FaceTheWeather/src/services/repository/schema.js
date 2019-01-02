// @flow

import Realm from 'realm';

const UserInfoSchema = {
    name:'UserInfo',
    primaryKey: 'id',
    properties:{
        id: 'int',
        FirstName:'string',
        LastName:'string'
    }
}

const LocationSchema = {
    name: 'Location',
    primaryKey: 'id',
    properties:{
        id: 'int',
        city: 'string',
        state: 'string'
    }
}

const WeatherSchema = {
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

const MoodSchema = {
    name: 'Mood',
    primaryKey: 'id',
    properties:{
        id: 'int',
        weather: 'Weather',
        emotion: 'string'
    }
}

const openSchema = async () : Promise<Realm> => {
    const realm: Realm =  await Realm.open({schema:[LocationSchema,MoodSchema,UserInfoSchema,WeatherSchema]});
    return realm;
}

module.exports = {
    LocationSchema,
    WeatherSchema,
    MoodSchema,
    UserInfoSchema,
    openSchema
}