/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import getForcast from './src/services/api/darksky';
import { getCurrentCorrdinatesAsync } from './src/services/domain/location/index.js';
import { getLocationByLatLongAsync, getLocationByAddress } from './src/services/api/mapping';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
type State = {
    darkskyTesting:string
}
export default class App extends Component<Props, State> {
    state = {
        darkskyTesting:''
    }
    componentDidMount = async () => {
        //const darkSkyData = await getForcast("28.7881","-81.6047");
        //const darkskyTesting = JSON.stringify(darkSkyData);
        const position  = await getCurrentCorrdinatesAsync();

        const dataFromAzure = await getLocationByLatLongAsync(position.coords.latitude,position.coords.longitude);
        //const dataFromAzure = await getLocationByAddress("");
        
        const darkskyTesting = JSON.stringify(dataFromAzure);
        this.setState({darkskyTesting});
    }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Text>{this.state.darkskyTesting}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
