// @flow

import {type CurrentGeoLocation} from './flowtypes';

export async function getCurrentCorrdinatesAsync() : Promise<CurrentGeoLocation> {
    const coordinates: CurrentGeoLocation = await getCoordinatesAsync();
    return coordinates;
}

function getCoordinatesAsync() : Promise<any> {
    return new Promise((resolve,reject) => {
        navigator.geolocation.getCurrentPosition(
            resolve,
            reject,
            {
                enableHighAccuracy: true, 
                timeout: 200, 
                maximumAge: 1 
            }
        )
    });
}