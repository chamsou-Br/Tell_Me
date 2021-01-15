import { Icon ,Form} from 'native-base';
import React , {useState , useEffect , useRef } from 'react';
import {View , Text , StyleSheet , Alert,Image , ActivityIndicator} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import {Button} from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions'; 
import axios from 'axios'
import {decode , encode} from 'base64-arraybuffer'
import { Modal } from 'react-native';
import { TouchableOpacity } from 'react-native';


const Compte = (props) => {

    const [info,setInfo] = useState({
        Etude : props.user.info.Etude ,
        Birthday : props.user.info.Birthday,
        Work : props.user.info.Work,
        live : props.user.info.live,
        Relation : props.user.info.Relation,
        Hobbies : props.user.info.Hobbies,
        Nationality : props.user.info.Nationality,
        userName : props.user.userName
        })
    const [usernameOrig,setUser] = useState('');

        const changeInfo =(info) => {
            setInfo(info);
        }
        const changeUser = (user) => {
            setUser(user);
        }

        const [imagebuffer , setImage] = useState('')
        const [isImageBuffer , setIsImage] = useState(props.user.isImageBuffer);
        
    useEffect(()=> {
        setTimeout(()=> {
            if (props.user.isImageBuffer) {
                axios.post('http://192.168.43.16:4000/getImage',{
                  email : props.user.email,
                }).then( res =>{
                    var base64Flag = 'data:image/png;base64,';
                    const base64 = encode(res.data.img.data.data)
                     setImage(base64Flag + base64);
                })
            }
        },1000)
        
    },[])


    const ImageProfile = () => {
        if (isImageBuffer) {
            return ( <Image style={{width : '100%' , height : '100%',borderRadius : 200}} source={{uri : imagebuffer}} />)
        }else {
            if (props.user.isImageSocial) {
                return (<Image  style={{width : '100%' , height : '100%',borderRadius : 200}} source={{uri : props.user.imageSocial}} />)
            }else {
                return <Image style={{width : '100%' , height : '100%',borderRadius : 200}} source={require("../use2.jpg")} />
            }
        }
    }
    
    const [ModalCond , setModal]  = useState(false)
    const ImageProfile2 = () => {
        if (isImageBuffer) {
            return ( <Image style={{width : 400 , height : 400,marginTop : 120}} source={{uri : imagebuffer}} />)
        }else {
            if (props.user.isImageSocial) {
                return (<Image  style={{width : 400 , height : 400,marginTop : 120}} source={{uri : props.user.imageSocial}} />)
            }else {
                return <Image style={{width : 400 , height : 400,marginTop : 120}} source={require("../use2.jpg")} />
            }
        }
    }

    const InfoExiste = () => {if (!props.user.info.Birthday && !props.user.info.Relation && !props.user.info.live &&
                           !props.user.info.Hobbies && !props.user.info.Work && !props.user.info.Etude && !props.user.info.Nationality ) 
                           {
                               return (<View style={{justifyContent : 'center' , alignItems : 'center'}}>
                                   <Image style={{width : 270 , height : 200 , marginTop : 20,marginLeft : 60}} source={require('../user.jpg')} />
                                    <Text style={{marginTop : 20,color : "#00000044" , fontWeight : 'bold'}}>You didn't Edite your profile yet !</Text>
                               </View>)
                           }
                           else  {
                           return (<View style={styles.infoViewPere}>
                                        <View style={styles.IconInfo}>
                                            <Icon style={{color : '#BD1E51',fontSize : 16}} name='user' type='FontAwesome'  />
                                        </View>
                                        <View  style={styles.infoView}>
                                            <Text  style={styles.infoText}> Sexe : {props.user.sexe}</Text>
                                        </View>
                                    </View>)
                           }
                        }
    const Birthday = props.user.info.Birthday ? 
    (<View style={styles.infoViewPere}>
        <View style={styles.IconInfo}>
              <Icon style={{color : '#BD1E51',fontSize : 16}} name='birthday-cake' type='FontAwesome'  />
        </View>
        <View  style={styles.infoView}>
             <Text onPress={()=> console.log(info)} style={styles.infoText}>Birthday : {props.user.info.Birthday}</Text>
        </View>
    </View>) : (null) ;


    const Etude = props.user.info.Etude ? 
    (<View style={styles.infoViewPere}>
        <View style={styles.IconInfo}>
          <Icon style={{color : '#BD1E51',fontSize : 16}} name='institution' type='FontAwesome'  /> 
        </View>
        <View style={styles.infoView}>
            <Text style={styles.infoText}> Etude : {props.user.info.Etude}</Text>
        </View>
    </View>) : (null) ;

    const Work = props.user.info.Work ? 
    (<View style={styles.infoViewPere}>
        <View style={styles.IconInfo}>
        <Icon style={{color : '#BD1E51',fontSize : 16}} name='briefcase' type='FontAwesome'  /> 
        </View>
        <View style={styles.infoView}>
            <Text style={styles.infoText}> Work : {props.user.info.Work}</Text>
        </View>
    </View>) : (null) ;

    const live = props.user.info.live ? 
    (<View style={styles.infoViewPere}>
        <View style={styles.IconInfo}>
        <Icon style={{color : '#BD1E51',fontSize : 16}} name='hotel' type='FontAwesome'  /> 
        </View>
        <View style={styles.infoView}>
            <Text style={styles.infoText}> live : {props.user.info.live}</Text>
        </View>
    </View>) : (null) ;


    const Relation = props.user.info.Relation ? 
    (<View style={styles.infoViewPere}>
        <View style={styles.IconInfo}>
        <Icon style={{color : '#BD1E51',fontSize : 16}} name='users' type='FontAwesome'  /> 
        </View>
        <View style={styles.infoView}>
            <Text style={styles.infoText}> Relation : {props.user.info.Relation}</Text>
        </View>
    </View>) : (null) ;


    const Hobbies = props.user.info.Hobbies ? 
    (<View style={styles.infoViewPere}>
        <View style={styles.IconInfo}>
        <Icon style={{color : '#BD1E51',fontSize : 16}} name='futbol-o' type='FontAwesome'  /> 
        </View>
        <View style={styles.infoView}>
            <Text style={styles.infoText}> Hobbies : {props.user.info.Hobbies}</Text>
        </View>
    </View>) : (null) ;

const Nationality = props.user.info.Nationality ? 
(<View style={styles.infoViewPere}>
    <View style={styles.IconInfo}>
    <Icon style={{color : '#BD1E51',fontSize : 16}} name='flag' type='FontAwesome'  /> 
    </View>
    <View style={styles.infoView}>
        <Text style={styles.infoText}> Nationality : {props.user.info.Nationality}</Text>
    </View>
</View>) : (null) ;


    // Select Image Prpfile 

    const getImageFromCamera = async () => {
        const CameraPermission = await Permissions.askAsync(Permissions.CAMERA);

        if (CameraPermission.status === 'granted' ) {
            const ImageCapture = ImagePicker.launchCameraAsync({ 
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [3, 3],
                quality: 1,
                base64: true
            })
            if (! (await ImageCapture).cancelled) {
                setImage('data:image/jpeg;base64,' + (await ImageCapture).base64);
                setIsImage(true)
                fetch('http://192.168.43.16:4000/selectImage', {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					// send our base64 string as POST request
					body: JSON.stringify({
                        imgsource:(await ImageCapture).base64,
                        email : props.user.email
					}),
				})
            }
        }
    }

    const getImageFromgallerie = async () => {
        const Camrepermission = await Permissions.askAsync(Permissions.CAMERA)
        console.log(Camrepermission.status )
        if (Camrepermission.status === 'granted'  ) {
            const ImageCapture = ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [3, 3],
                quality: 1,
               base64:true
            })
            if (! (await ImageCapture).cancelled) {
               setImage('data:image/jpeg;base64,' + (await ImageCapture).base64)
               setIsImage(true)
                fetch('http://192.168.43.16:4000/selectImage', {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					// send our base64 string as POST request
					body: JSON.stringify({
                        imgsource:(await ImageCapture).base64,
                        email : props.user.email
					}),
				})
            }
        }
    }

    return(
        <ScrollView style={{backgroundColor : "#FFF"}}>
        <Modal visible={ModalCond} >
            
            <View style={{width : '100%',height : '100%' ,backgroundColor : '#000'}}>
            <Icon onPress={()=>setModal(false)} name='close'  style={{color : '#fff',fontSize : 40,marginLeft : 350,marginTop : 20}} />
            <ImageProfile2 />
            </View>
        </Modal>
        <View style={styles.compte} >
            <View  >
                <Image  style={styles.imageCouverture} source={require('../tell4.jpg')} />
                <TouchableOpacity style={styles.infomod}  onPress={()=> props.navigation.navigate('Modify Personal Info',{info : info,onPress : changeInfo , usernameOrig : usernameOrig,onPress2 : changeUser})}> 
                   <Text style={{letterSpacing : 0.8, color : "#BD1E51",fontWeight : 'bold',fontSize : 18}}>Edite profile</Text> 
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setModal(true)} style={styles.imageProfile}>
                    <ImageProfile />
                </TouchableOpacity>
                <View style={styles.SelectImage} >
                    <Icon onPress={() =>  Alert.alert( 
                                        'change the profle picture ',  
                                        'choose one ',
                                        [
                                            {
                                                    text : 'cancel' ,
                                                    style : "cancel",
                                                    
                                            },
                                            {
                                                    text : 'take a picture' ,
                                                    onPress : () => getImageFromCamera(),
                                                    
                                            },
                                            {       text : 'upload an image' ,
                                                    onPress : () => getImageFromgallerie(),

                                            }
                                        ],
                                        {
                                            cancelable : false
                                        }
                                    )
            } style={{fontSize : 30 , color : '#000'}}  name='camera' type='FontAwesome' />
                </View>
                <View style={styles.userName}>
                    <Text onPress={console.log(props.user.userName)} style={styles.userNameText}>{props.user.userName}</Text>
                </View>
                <View style={styles.information}>
                     {Nationality} 
                     {Birthday} 
                     {Etude} 
                     {Work} 
                     {live} 
                     {Relation} 
                     {Hobbies} 
                     <InfoExiste />
                </View>

              
                
            </View>
        </View>
        </ScrollView>
    )
}
const mapStateToProps = state => {
    return {
      user : state.user
    }
}
    
export default connect(mapStateToProps)(Compte); 


const styles = StyleSheet.create({
   
    imageCouverture : {
        width : '100%',
        height :200
    },
    imageProfile : {
        width : 150,
        height : 150,
        position :'absolute',
        top : 130,
        left : 30,
        borderStyle : 'solid',
        borderWidth : 5,
        borderColor : '#FFF',
        borderRadius : 200
    },
    compte : {
        position : 'relative' ,
        backgroundColor :'#FFF',
        paddingBottom : 10 ,
        height : "100%"
    },
    userName : {
        marginTop : 30,
        justifyContent : 'center' ,
        alignItems : 'center',
        marginLeft : -80
    },
    image: {
        margin: 10,
        width: 80,
        height: 60
      },
    userNameText : {
        fontWeight : 'bold' , 
        fontSize : 30,
        letterSpacing : 2,
        marginLeft : 30,
        color : "#BD1E51",
        textShadowColor: '#BD1E51',
        textShadowOffset: {width: 2, height: 3},
        textShadowRadius: 10,
      
    },
    information : {
        color : '#FF0',
        marginTop : 30,
        marginBottom : 20,
    },
    infoTitle : {
        fontWeight : 'bold',
        fontSize : 26,
        letterSpacing : 0.5,
        marginHorizontal : 5,
        marginBottom : 10
    },
    IconInfo : {
           
            elevation : 10,
            backgroundColor : '#FFF',
            width : 40,
            height:40,
            borderRadius : 40,
            justifyContent : 'center',
            alignItems :'center',
            
           
    },
    infoViewPere : {
        flexDirection : 'row',
        display : 'flex',
        height : 40,
        paddingHorizontal : 10,
        marginBottom : 10,
        marginLeft : 5,
        alignItems : 'center'
    } ,
    infoView : {
        borderBottomWidth : 5,
        borderColor : '#BD1E51',
        height : 40,
        width : 300,
        backgroundColor : '#FFF',
        elevation : 10,
        marginLeft : 10,
        justifyContent : 'center',
        paddingHorizontal : 10,
        borderTopLeftRadius : 10,
        borderTopRightRadius : 20
        

    } ,
    infoText : {
        color : '#000',
        fontWeight : 'bold',
        fontSize : 16,
        letterSpacing : 0.8
    },
    infomod : {
        marginTop : 20,
        marginLeft : 220,
        letterSpacing : 0.8,
        color : "#BD1E51",
        height : 40 , width : 150,
        backgroundColor : "#FFF",
        borderColor : "#BD1E51",
        borderWidth : 2,
        alignItems : "center",
        justifyContent : 'center',
    },
    SelectImage : {
        position :'absolute',
        top : 250,
        left : 30,
        zIndex : 5
    }
})