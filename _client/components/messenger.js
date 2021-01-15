import React , {useState , useEffect , useRef} from 'react';
import {View , Text , StyleSheet} from 'react-native'

const Messenger = () => {
    return(
        <View style={styles.container}>
            <Text>this is Messenger View</Text>
        </View>
    )
}
export default Messenger

const styles = StyleSheet.create({
    container : {
        flex : 1,
        flexDirection : 'row',
        justifyContent : 'center',
        marginTop : 300,
        marginHorizontal : 50
    } 
})