//@flow

import * as React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import styles from '../../assets/Styles';
import LoadScreen from '../Controls/LoadScreen';
import { getCurrentCorrdinatesAsync } from '../../services/domain/currentLocation';
import { type CurrentGeoLocation } from '../../services/domain/currentLocation/flowtypes';
import getForcast from '../../services/api/darksky';
import { type DarkSkyForcast, type Currently } from '../../services/api/darksky/flowtypes';
import { getLocationByLatLongAsync, getLocationByAddress } from '../../services/api/mapping';
import { type AzureReverseAddress } from '../../services/api/mapping/flowtypes';


type Props = {

}
type State = {
    position: ?CurrentGeoLocation,
    isLoading: boolean,
    forcast: ?DarkSkyForcast,
    location: ?AzureReverseAddress
}

export default class Weather extends React.Component<Props, State>{

    state = {
        position: null,
        isLoading: true,
        forcast: null,
        location: null
    }
    componentDidMount = async () => {
        const position = await getCurrentCorrdinatesAsync();
        const forcast = await getForcast(position.coords.latitude, position.coords.longitude);
        const location = await getLocationByLatLongAsync(position.coords.latitude, position.coords.longitude);
        this.setState({ forcast, location, position, isLoading: false });
    }

    getForcastDisplay = (currentForcast:?DarkSkyForcast) :?React.Node => {
        if (!currentForcast)
            return null;
        const currently = currentForcast.currently;
        return (
            <View>
                <Text>{currently.precipProbability} at {currently.temperature}</Text>
            </View>
        )
    }
    getLocationDisplay = (location:?AzureReverseAddress) : React.Node => {
        if (!location)
            return null;
        const addy = location.addresses[0].address;
        return (
            <View>
                <Text>{addy.streetNameAndNumber} - {addy.municipality}, {addy.countrySubdivisionName}</Text>
            </View>
        )
    }

    render() {
        const { isLoading, position, forcast, location } = this.state;
        if (isLoading)
            return <LoadScreen />
        return (
            <View>
                <View>
                    {this.getLocationDisplay(location)}
                </View>
                <View>
                    {this.getForcastDisplay(forcast)}
                </View>
            </View>
        );
    }

}