// @flow 
import * as React from 'react';
import {
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    rootContainer:{
        display:'flex', 
        flex: 1,
        alignItems:'center', 
        justifyContent:'center'
    },
    container: {
        flex: .30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        borderRadius:10
    },
    welcomeText:{
        fontSize: 16,
        flexWrap:'wrap',
        textAlign: 'center',
        fontWeight:'bold',
        paddingRight:2,
        paddingLeft:2
    },
    labelText:{
        fontWeight:'bold',
        paddingRight:2,
        paddingLeft:2
    },  
    textInput:{
        minWidth:200,
        borderWidth:2,
        borderColor:'#eee'
    }
});

export default styles;