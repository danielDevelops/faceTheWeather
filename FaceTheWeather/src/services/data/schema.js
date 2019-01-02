// @flow

import Realm from 'realm';
import { UserInfoSchema } from './repositories/userInfo';
import { WeatherSchema } from './repositories/weather';
import { LocationSchema } from './repositories/location';
import { MoodSchema } from './repositories/mood';

export const openSchema = async () : Promise<Realm> => {
    const realm = await Realm.open({schema:[LocationSchema,MoodSchema,UserInfoSchema,WeatherSchema]});
    return realm;
}

