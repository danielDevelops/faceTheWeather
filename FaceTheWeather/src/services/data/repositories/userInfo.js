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

async function realmWrite(dbObject:UserInfo) : Promise<void>{
    const realm = await openSchema();
    realm.write(() => {
        realm.create(userInfoTableName,dbObject);
    });
    realm.close();
}

function getObjects(realm:Realm) : UserInfo[] {
    return realm.objects(userInfoTableName);
}

export async function updateUser(firstName:string,lastName:string) : Promise<void> {
    const realm = await openSchema();
    await realmWrite({id:1,FirstName:firstName,LastName:lastName});
}

export async function getUserInfoName() : Promise<string> {
    const realm = await openSchema();
    const userInfos:UserInfo[] = getObjects(realm);
    if (userInfos.length > 1)
        throw 'There are multiple entries in the user database, this should not happen';
    if (userInfos.length == 0)
        return '';
    const user = userInfos[0];
    const name = `${user.FirstName} ${user.LastName}`;
    realm.close();
    return name;
}