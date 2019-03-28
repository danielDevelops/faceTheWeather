// @flow 
import * as React from 'react';
import {
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    rootContainer:{
        flexDirection:'column',
        flex: 1,
        alignItems:'center', 
        justifyContent:'center'
    },
    container: {
        flex: 1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: '#ddd',
        borderRadius:20
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

export function flattenedStylesheet(){
    return StyleSheet.flatten(styles);
}

export default styles;

