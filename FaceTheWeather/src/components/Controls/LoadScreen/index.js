// @flow

import * as React from 'react';
import {
    ActivityIndicator
} from 'react-native';
import Modal from '../Modal';

type Props = {
    isVisible:boolean
}
type State = {

}

export default class LoadScreen extends React.Component<Props,State> {
    static defaultProps = {
        isVisible:true
    }
    render(){
        return(
            <Modal
                isVisible={this.props.isVisible}
            >
                <ActivityIndicator color={"#ffffff"} size={'large'} />
            </Modal>
        );
    }
}