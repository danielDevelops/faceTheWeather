// @flow

import { openSchema } from '../schema';
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

const userInfoTableName = UserInfoSchema.name;
export async function updateUser(firstName:string,lastName:string) : Promise<void> {
    const realm = await openSchema();
    realm.write(() => {
        const newRec : UserInfo = {id:1, FirstName:firstName, LastName:lastName}
        realm.create(userInfoTableName,newRec);
    });
    realm.close();
}

export async function getUserInfoName() : Promise<string> {
    const realm = await openSchema();
    const userInfos:UserInfo[] = realm.objects(userInfoTableName);
    if (userInfos.length > 1)
        throw 'There are multiple entries in the user database, this should not happen';
    if (userInfos.length == 0)
        return '';
    const user = userInfos[0];
    const name = `${user.FirstName} ${user.LastName}`;
    realm.close();
    return name;
}