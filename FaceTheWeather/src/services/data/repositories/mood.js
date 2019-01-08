// @flow

import Realm from 'realm';
import { type Weather } from './weather';
import { DBSchema } from '../db';
import { MoodSchema } from '../schema';

export type emotions = 'anger'|'contempt'|'disgust'|'fear'|'happiness'|'neutral'|'sadness'|'suprise';
export type Mood = {
    id: number,
    weather: Weather,
    emotion: emotions,
    isPartial: boolean
}

const db:DBSchema<Mood> = new DBSchema<Mood>(MoodSchema.name);

export async function getWeathersByEmotion(emotion:emotions) : Promise<Weather[]> {
    const recs:Mood[] = await db.getObjects(`emotion = "${emotion}"`);
    db.disposeRealm();
    return recs.map(t => t.weather);
    
}
