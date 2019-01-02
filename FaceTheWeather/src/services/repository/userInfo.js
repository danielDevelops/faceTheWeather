// @flow

import { UserInfoSchema, openSchema } from './schema';
import Realm from 'realm';

const userInfoTableName = UserInfoSchema.name;

export async function updateUser(firstName:string,lastName:string) : Promise<void> {
    const realm = await openSchema();
    realm.write(() => {
        realm.create(userInfoTableName,{id:1, firstName, lastName});
    });
    realm.close();
}

export async function getUserInfoName() : Promise<string> {
    const realm = await openSchema();
    const userInfos = realm.objects(userInfoTableName);
    if (userInfos.length > 1)
        throw 'There are multiple entries in the user database, this should not happen';
    if (userInfos.length == 0)
        return '';
    const user = userInfos[0];
    const name = `${user.firstName} ${user.lastName}`;
    realm.close();
    return name;
}