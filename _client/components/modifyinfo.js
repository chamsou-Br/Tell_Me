import React , {useState , useEffect , useRef } from 'react';
import {View , Text , TextInput , StyleSheet , Image, ImageBackground, Alert} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import {Button,Icon} from 'react-native-elements'
import {Picker , } from 'native-base'
import axios from 'axios'
import {ChangeInfo, ChangeUserName} from '../redux/action_creator'

import CountryPicker, { DARK_THEME } from 'react-native-country-picker-modal'
import { ceil } from 'react-native-reanimated';

const ModifyInfo = (props) => {
    const [Etude , setEtude] = useState(props.user.info.Etude)
    const [Work , setWork] = useState(props.user.info.Work)
    const [live , setlive] = useState(props.user.info.live)
    const [Relation , setRelation] = useState(props.user.info.Relation)
    const [Hobbies , setHobbies] = useState(props.user.info.Hobbies)
    const [Birthday , setBirthday] = useState(props.user.info.Birthday)
    const [Nationalite , setNationality] = useState(props.user.info.Nationality)
    const [username , setUser] = useState(props.user.userName)

    const [info,setInfo] = useState({
        Etude : Etude ,
        Birthday : Birthday,
        Work : Work,
        live : live,
        Relation : Relation,
        Hobbies : Hobbies,
        Nationality : Nationalite 
    })
    

    const SaveChanges = async() => {

       
            const Info = {
            Etude : Etude ,
            Birthday : Birthday,
            Work : Work,
            live : live,
            Relation : Relation,
            Hobbies : Hobbies,
            Nationality : Nationalite ,
            };
            
            props.ChangeInfo(Info);
            props.route.params.onPress(info)
            
            axios.post('http://192.168.43.16:4000/info',{
              email : props.user.email,
              username : username.toLowerCase(),
              info : Info
            }).then(res => {
                if (res.data.ubdate) {
                    props.ChangeUserName(username.toLowerCase());
                    props.route.params.onPress2(username);
                    axios.post('http://192.168.43.16:4000/username',{
                        username : username.toLowerCase(),
                        email : props.user.email

                    });
                }else {
                    Alert.alert('change Username' , 'this username is already regestred :!')
                    setUser(props.user.userName) ;
                }
            })
            props.navigation.navigate('compte');
    }

    return(
        <ScrollView style={{backgroundColor : '#FFF'}}>
        <View style={styles.View}>

            <View style={{backgroundColor : '#FFF', paddingBottom : 20 , paddingTop : 30 }}>
            <View style={{backgroundColor : '#FFF',justifyContent : 'center' ,alignItems : 'center',marginBottom : 30}}>
            <Text  style={styles.title} >
                 Modify your personal information
            </Text>
            </View>

            <TextInput   placeholder='Username'  style={styles.Input}
                    value={username} 
                    onChangeText={(val) => setUser(val)} />
            <TextInput   placeholder='Birthday DD/MM/YYYY'  style={styles.Input}
                    value={Birthday} 
                    onChangeText={(val) => setBirthday(val)} />

            <TextInput    placeholder='Work' style={styles.Input}
                          value={Work}
                          onChangeText={(val) => setWork(val)} />

            <TextInput   placeholder='live'   style={styles.Input} 
                     value={live} 
                    onChangeText={(val) => setlive(val)} />

            <TextInput   placeholder='Etude'  style={styles.Input}
                   value={Etude} 
                    onChangeText={(val) => setEtude(val)} />
                
            <TextInput   placeholder='Hobbies'  style={styles.Input}
                    value={Hobbies} 
                    onChangeText={(val) => setHobbies(val)} />
                    
            <View style={styles.pickerView}>
                <Picker 
                        textStyle={{fontSize : 22,fontWeight : 'bold'}}
                        enabled={true}
                        style={styles.Picker}
                        
                        selectedValue={Relation}
                        onValueChange={async (itemVal , itemIndex) => await setRelation(itemVal)}
                        >
                        <Picker.Item label="Single" value="Single" />
                        <Picker.Item label='couple' value='couple' />
                        <Picker.Item label="Married" value="Married" />
                </Picker>
            </View>

            <View style={styles.Country}>
    
                <CountryPicker
                   onSelect={country =>setNationality(country.name)}
                   withAlphaFilter={true}
                />

            </View>

                    <TouchableOpacity style={{borderRadius :10,paddingHorizontal : 20,backgroundColor : '#BD1E51',elevation : 20,
                                    width : 300,height : 50,marginTop :40,marginHorizontal : 20,alignItems : 'center',
                                    justifyContent : 'center'}}
                                    onPress={() => SaveChanges() }>
                        <Text style={{color : '#FFF',fontSize:20,fontWeight:'bold'}}>
                        save the changes
                        </Text>
                    </TouchableOpacity>
                    
    
             </View>
        </View>
       
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    View : {
        marginHorizontal : 30,
        marginBottom : 20
    },
    title  : {
        color : '#BD1E51' ,
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: {width: 1, height: 2},
        textShadowRadius: 10,
        fontSize : 26, 
        fontWeight : 'bold' , 
        letterSpacing : 1.2,
        textAlign : 'center'
    },
    Input : {
        marginHorizontal : 15,
        fontSize : 20,
        padding : 10,
        paddingHorizontal : 20,
        backgroundColor : '#FFF',
        marginTop : 20,
        borderRadius : 10,
        borderColor : "#BD1E51",
        borderWidth : 2 
    },
    pickerView : {
        borderWidth : 2,
        borderColor : "#BD1E51" ,
        width : 200,
        height : 50,
        justifyContent : 'center' ,
        marginTop : 20,marginHorizontal : 20,
        borderRadius : 10
    },
    Picker : {
        width : 150,
        marginHorizontal : 20,
        fontSize : 22,
        color : '#000',
    },
    Country : {
        backgroundColor : '#FFF',
         width : 200,
         height : 50,
         marginTop :20,
         marginHorizontal : 20,
         justifyContent : 'center',
         paddingHorizontal:10,
         borderWidth : 2,
        borderColor : "#BD1E51"
    }
})

const mapDispatchToProps = dispatch => ({
    ChangeInfo : (info) => dispatch(ChangeInfo(info)),
    ChangeUserName : (username) => dispatch(ChangeUserName(username))
  }) 

const mapStateToProps = state => {
    return {
      user : state.user
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ModifyInfo) ;