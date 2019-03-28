// @flow


import * as React from 'react';
import {
    View,
    Text,
    TextInput,
    Button
} from 'react-native';

import { updateUser, getUserInfoName } from '../../services/data/repositories/userInfo';
import LoadScreen from '../../components/Controls/LoadScreen';
import styles from '../../assets/Styles';
import { saveByEmotion, getByEmotion } from '../../services/domain/mood';
import { type emotions } from '../../services/data/repositories/mood';
import { createGridRow } from '../Controls/gridDisplay';
import { type CurrentGeoLocation } from '../../services/domain/currentLocation/flowtypes';
import { type DarkSkyForcast, type Currently } from '../../services/api/darksky/flowtypes';
import { type AzureReverseAddress } from '../../services/api/mapping/flowtypes';

type Props = {
    getCurrentWeather:() => ?{position:?CurrentGeoLocation, forcast:?DarkSkyForcast, location:?AzureReverseAddress}
}
type State = {
    isLoading: boolean,
    weatherChoice: ?{
        temperature: string,
        precipitationPercentage: string,
        conditions: string
    },
    selectedEmotion: ?emotions
}

export default class MyData extends React.Component<Props, State> {

    state = {
        isLoading: true,
        weatherChoice: null,
        selectedEmotion: null
    }
    componentDidMount = async () => {
        const weatherChoice = await this.loadMyData('happiness');
        this.setState({ isLoading: false, weatherChoice });
    }
    loadMyData = async (emotion: emotions): Promise<{ temperature: string, precipitationPercentage: string, conditions: string }> => {
        return getByEmotion(emotion);

    }
    reloadData = () => {
        this.setState({ isLoading: true });
        const emotion: emotions = this.state.selectedEmotion || 'happiness';
        this.loadMyData(emotion).then(weatherChoice => {
            this.setState({ isLoading: false, weatherChoice });
        });

    }
    saveCurrentWeatherAsHappy = () => {
        const currentWeather = this.props.getCurrentWeather();
        if (!currentWeather)
            return;
        if (!currentWeather.forcast)
            return;
        if (!currentWeather.location)
            return;
        this.setState({isLoading:true});
        const currentAddy = currentWeather.location.addresses[0].address;
        const location = {state: currentAddy.countrySubdivision, city: currentAddy.municipalitySubdivision};
        const currentConditions = currentWeather.forcast.currently;
        saveByEmotion('happiness',location, currentConditions.temperature, currentConditions.summary, currentConditions.precipProbability.toString()).then(async () => {
            await this.reloadData();
        })
    }

    getDisplayData = (): React.Node => {
        if (this.state.isLoading)
            return <LoadScreen displayAsModal={false} />
        return (
            <View style={styles.container}>
                <View style={styles.rootContainer}>
                    <View style={styles.container}>
                        <Text>My preferred weather is: </Text>
                    </View>
                    <View style={styles.container}>
                        <View style={{ flex: 1, flexDirection: 'column', padding: 10 }}>
                            {createGridRow("Temperature", this.state.weatherChoice ? this.state.weatherChoice.temperature : null)}
                        </View>
                    </View>
                    <View style={styles.container}>
                        <Button
                            title={"Reload My Data"}
                            onPress={this.reloadData}
                        />
                        <Button 
                            title={"Save Current As Happy"}
                            onPress={this.saveCurrentWeatherAsHappy}
                        />
                    </View>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.rootContainer}>
                {this.getDisplayData()}
            </View>
        )
    }
}