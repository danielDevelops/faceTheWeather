// @flow

import DBSchema from '../schema';
import Realm from 'realm';
import {type Weather} from './weather';

export type emotions = 'anger'|'contempt'|'disgust'|'fear'|'happiness'|'neutral'|'sadness'|'suprise';
export type Mood = {
    id: number,
    weather: Weather,
    emotion: emotions,
    isPartial: boolean
}
export const MoodSchema = {
    name: 'Mood',
    primaryKey: 'id',
    properties:{
        id: 'int',
        weather: 'Weather',
        emotion: 'string',
        isPartial: 'bool'
    }
}
const db:DBSchema<Mood> = new DBSchema<Mood>(MoodSchema.name);

export async function getWeathersByEmotion(emotion:emotions) : Promise<Weather[]> {
    const recs:Mood[] = await db.getObjects(`emotion = "${emotion}"`);
    db.disposeRealm();
    return recs.map(t => t.weather);
    
}
