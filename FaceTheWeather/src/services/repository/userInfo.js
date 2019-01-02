// @flow

import { UserInfoSchema, openSchema } from './schema';
import Realm from 'realm';


async function updateUser(firstName:string,lastName:string){
    const realm = await openSchema();
    
}