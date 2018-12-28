// @flow

import Realm from 'react-native-realm';

const LocationSchema = {
    name: 'Location',
    properties: {
        city: 'string',
        state: 'string'
    }
}

const WeatherSchema = {
    name: 'Weather',
    properties:{
        temperature: 'string',
        precipitationType: 'string',
        precipitationPercentage: 'string',
        location: 'Location'
    }
}

const MoodSchema = {
    name: 'Mood',
    properties: {
        weather: 'Weather',
        emotion: 'string'
    }
}

module.exports = {
    LocationSchema,
    WeatherSchema,
    MoodSchema
}