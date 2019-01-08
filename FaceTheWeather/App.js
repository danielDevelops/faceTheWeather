/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import getForcast from './src/services/api/darksky';
import { getCurrentCorrdinatesAsync } from './src/services/domain/currentLocation';
import { getLocationByLatLongAsync, getLocationByAddress } from './src/services/api/mapping';
import { updateUser, getUserInfoName } from './src/services/data/repositories/userInfo';
import FtWCamera from './src/components/Camera';

type Props = {};
type State = {
    darkskyTesting: string
}
export default class App extends Component<Props, State> {
    state = {
        darkskyTesting: ''
    }
    componentDidMount = async () => {
        // //const darkSkyData = await getForcast("28.7881","-81.6047");
        // //const darkskyTesting = JSON.stringify(darkSkyData);
        // const position  = await getCurrentCorrdinatesAsync();

        // const dataFromAzure = await getLocationByLatLongAsync(position.coords.latitude,position.coords.longitude);
        // //const dataFromAzure = await getLocationByAddress("");

        // const darkskyTesting = JSON.stringify(dataFromAzure);
        // this.setState({darkskyTesting});
        await updateUser("Daniel", "Martin");
        const darkskyTesting = await getUserInfoName();

        this.setState({ darkskyTesting })
    }
    render() {
        return (
            <View style={{flex:1}}>
                <View style={styles.container}>
                    <Text style={styles.welcome}>Face the Weather!!!</Text>
                    <Text>{this.state.darkskyTesting}</Text>

                </View>
                {/* <View style={{flex:.75}}>
                    <FtWCamera />
                </View> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: .25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
