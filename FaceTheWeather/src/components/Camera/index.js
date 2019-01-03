// @flow

import { RNCamera } from 'react-native-camera';
import React, { Component } from 'react';
import {
    Dimensions,
    Text,
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';

import { getEmotionFromImage } from '../../services/api/facial/emotion';


type Props = {

}
type State = {
    emotion:?string
}

export default class FtWCamera extends Component<Props, State> {
    state = {
        emotion:null
    }
    camera:?RNCamera;
    takePicture = async () => {

        const options = { quality: 1, base64: true };
        if (this.camera == null)
            return;
        const data = await this.camera.takePictureAsync(options)
        const emotion = await getEmotionFromImage(data.base64);
        this.setState({emotion});
    }

    render = () => {
        if (this.state.emotion){
            return (
                <View><Text>{this.state.emotion}</Text></View>
            );
        }
            
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.front}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                    onGoogleVisionBarcodesDetected={({ barcodes }) => {
                        console.log(barcodes)
                    }}
                />
                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center', }}>
                    <TouchableOpacity
                        onPress={this.takePicture}
                        style={styles.capture}
                    >
                        <Text style={{ fontSize: 14 }}> SNAP </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    }
});


