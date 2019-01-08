// @flow

import Realm from 'realm';
import { UserInfoSchema, type UserInfo } from './repositories/userInfo';
import { WeatherSchema, type Weather } from './repositories/weather';
import { LocationSchema, type Location } from './repositories/location';
import { MoodSchema, type Mood } from './repositories/mood';

const openSchema = async () : Promise<Realm> => {
    const realm = await Realm.open({schema:[LocationSchema,MoodSchema,UserInfoSchema,WeatherSchema]});
    return realm;
}

export default class DBSchema<T:UserInfo|Weather|Location|Mood>{
    constructor(tableName:string) {
        this.dbName = tableName;
    }
    realm: Realm;
    dbName:string;

    initRealm = async () : Promise<Realm> => {
        if (!this.realm || !this.realm.isClosed)
            this.realm = await openSchema();
    }
    disposeRealm = async () : Promise<void> => {
        this.realm.close();
        this.realm = null;
    }

    getObjects = async <T>(query?:string) : Promise<T[]> => {
        await this.initRealm();
        debugger;
        let data = this.realm.objects(this.dbName);
        if (query)
            data = data.filtered(query);
        return data;
    }
    write = async <T>(dbObject:T) :Promise<void> => {
        await this.initRealm();
        this.realm.write(() => {
            this.realm.create(this.dbName,dbObject,true);
        });
        this.disposeRealm();
    }

}