// @flow

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import FtWCamera from './src/components/Camera';

import SignIn from './src/components/SignIn';

type Props = {};
type State = {

}
export default class App extends Component<Props, State> {
    state = {

    }
    componentDidMount = async () => {
        // //const darkSkyData = await getForcast("28.7881","-81.6047");
        // //const darkskyTesting = JSON.stringify(darkSkyData);
        // const position  = await getCurrentCorrdinatesAsync();

        // const dataFromAzure = await getLocationByLatLongAsync(position.coords.latitude,position.coords.longitude);
        // //const dataFromAzure = await getLocationByAddress("");

        // const darkskyTesting = JSON.stringify(dataFromAzure);
        // this.setState({darkskyTesting});
        //this.setState({ darkskyTesting })
    }
    render() {
        return (
            <SignIn />
        );
        // return (
        //     <View style={{flex:1}}>
        //         <View style={styles.container}>
        //             <Text style={styles.welcome}>Face the Weather!!!</Text>
        //             <Text>{this.state.darkskyTesting}</Text>

        //         </View>
        //         <View style={{flex:.75}}>
        //             <FtWCamera />
        //         </View>
        //     </View>
        // );
    }
}

const styles = StyleSheet.create({

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