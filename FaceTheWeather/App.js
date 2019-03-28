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

    }
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <SignIn />
            </View>
        );
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