import { Icon ,Form, Row} from 'native-base';
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
import sendSaraha from './sendSaraha';



const ComponentRech = (props) => {

    const [info,setInfo] = useState({
        Etude : props.rech.info.Etude ,
        Birthday : props.rech.info.Birthday,
        Work : props.rech.info.Work,
        live : props.rech.info.live,
        Relation : props.rech.info.Relation,
        Hobbies : props.rech.info.Hobbies,
        Nationality : props.rech.info.Nationality,
        userName : props.rech.userName
        })

        const [imagebuffer , setImage] = useState('')
    
    useEffect(()=> {
        setTimeout(()=> {
            if (props.rech.isImageBuffer) {
                axios.post('http://192.168.43.16:4000/getImage',{
                  email : props.rech.email,
                }).then( res =>{
                    var base64Flag = 'data:image/png;base64,';
                    const base64 = encode(res.data.img.data.data)
                     setImage(base64Flag + base64);
                })
            }
        },1000)
        
    },[])


    const ImageProfile = () => {
        if (props.rech.isImageBuffer) {
            return ( <Image style={{width : '100%' , height : '100%',borderRadius : 200}} source={{uri : imagebuffer}} />)
        }else {
            if (props.rech.isImageSocial) {
                return (<Image  style={{width : '100%' , height : '100%',borderRadius : 200}} source={{uri : props.rech.imageSocial}} />)
            }else {
                return <Image style={{width : '100%' , height : '100%',borderRadius : 200}} source={require("../use2.jpg")} />
            }
        }
    }
    
    const [ModalCond , setModal]  = useState(false)
    const ImageProfile2 = () => {
        if (props.rech.isImageBuffer) {
            return ( <Image style={{width :400 , height : 400,marginTop :120}} source={{uri : imagebuffer}} />)
        }else {
            if (props.rech.isImageSocial) {
                return (<Image  style={{width :400 , height : 400,marginTop :120}} source={{uri : props.rech.imageSocial}} />)
            }else {
                return <Image style={{width :400 , height : 400,marginTop :120}} source={require("../use2.jpg")} />
            }
        }
    }

    const InfoExiste = () => {if (!props.rech.info.Birthday && !props.rech.info.Relation && !props.rech.info.live &&
                           !props.rech.info.Hobbies && !props.rech.info.Work && !props.rech.info.Etude && !props.rech.info.Nationality ) 
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
                                            <Text  style={styles.infoText}> Sexe : {props.rech.sexe}</Text>
                                        </View>
                                    </View>)
                           }
                        }
    const Birthday = props.rech.info.Birthday ? 
    (<View style={styles.infoViewPere}>
        <View style={styles.IconInfo}>
              <Icon style={{color : '#BD1E51',fontSize : 16}} name='birthday-cake' type='FontAwesome'  />
        </View>
        <View  style={styles.infoView}>
             <Text onPress={()=> console.log(info)} style={styles.infoText}>Birthday : {props.rech.info.Birthday}</Text>
        </View>
    </View>) : (null) ;


    const Etude = props.rech.info.Etude ? 
    (<View style={styles.infoViewPere}>
        <View style={styles.IconInfo}>
          <Icon style={{color : '#BD1E51',fontSize : 16}} name='institution' type='FontAwesome'  /> 
        </View>
        <View style={styles.infoView}>
            <Text style={styles.infoText}> Etude : {props.rech.info.Etude}</Text>
        </View>
    </View>) : (null) ;

    const Work = props.rech.info.Work ? 
    (<View style={styles.infoViewPere}>
        <View style={styles.IconInfo}>
        <Icon style={{color : '#BD1E51',fontSize : 16}} name='briefcase' type='FontAwesome'  /> 
        </View>
        <View style={styles.infoView}>
            <Text style={styles.infoText}> Work : {props.rech.info.Work}</Text>
        </View>
    </View>) : (null) ;

    const live = props.rech.info.live ? 
    (<View style={styles.infoViewPere}>
        <View style={styles.IconInfo}>
        <Icon style={{color : '#BD1E51',fontSize : 16}} name='hotel' type='FontAwesome'  /> 
        </View>
        <View style={styles.infoView}>
            <Text style={styles.infoText}> live : {props.rech.info.live}</Text>
        </View>
    </View>) : (null) ;


    const Relation = props.rech.info.Relation ? 
    (<View style={styles.infoViewPere}>
        <View style={styles.IconInfo}>
        <Icon style={{color : '#BD1E51',fontSize : 16}} name='users' type='FontAwesome'  /> 
        </View>
        <View style={styles.infoView}>
            <Text style={styles.infoText}> Relation : {props.rech.info.Relation}</Text>
        </View>
    </View>) : (null) ;


    const Hobbies = props.rech.info.Hobbies ? 
    (<View style={styles.infoViewPere}>
        <View style={styles.IconInfo}>
        <Icon style={{color : '#BD1E51',fontSize : 16}} name='futbol-o' type='FontAwesome'  /> 
        </View>
        <View style={styles.infoView}>
            <Text style={styles.infoText}> Hobbies : {props.rech.info.Hobbies}</Text>
        </View>
    </View>) : (null) ;

const Nationality = props.rech.info.Nationality ? 
(<View style={styles.infoViewPere}>
    <View style={styles.IconInfo}>
    <Icon style={{color : '#BD1E51',fontSize : 16}} name='flag' type='FontAwesome'  /> 
    </View>
    <View style={styles.infoView}>
        <Text style={styles.infoText}> Nationality : {props.rech.info.Nationality}</Text>
    </View>
</View>) : (null) ;



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
                <TouchableOpacity onPress={()=>setModal(true)} style={styles.imageProfile}>
                    <ImageProfile />
                </TouchableOpacity>

                <View style={{ marginLeft : 135 , flexDirection : 'row'}}>
                <TouchableOpacity style={styles.chat}>
                    <View style={styles.chatViewImage} >
                        <ImageProfile />
                    </View>
                    <View style={styles.chatViewText}>
                        <Text style={styles.chatText}>Chat</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saraha} 
                onPress={() => props.onNavigate('SendSaraha') }>
                    <View style={styles.chatViewImage} >
                        <ImageProfile />
                    </View>
                    <View style={styles.chatViewText}>
                        <Text style={styles.chatText}>Saraha</Text>
                    </View>
                </TouchableOpacity>
                </View>

                <View style={styles.userName}>
                    <Text style={styles.userNameText}>{props.rech.userName}</Text>
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
      user : state.user,
      rech : state.rech
    }
}
    


export default connect(mapStateToProps)(ComponentRech )  ;



const styles = StyleSheet.create({
   
    imageCouverture : {
        width : '100%',
        height :200
    },
    imageProfile : {
        width : 130,
        height : 130,
        position :'absolute',
        top : 140,
        left : 10,
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
    chat : {
        flexDirection : 'row',
        marginLeft : 10,
        borderColor : '#BD1E51',
        paddingHorizontal : 10,
        paddingVertical : 5,
        borderWidth : 2,
        backgroundColor : '#FFF',
        elevation : 30,
        width : 110,
        borderRadius : 30,
        marginTop : 20

    },
    saraha : {
        flexDirection : 'row',
        marginLeft : 10,
        borderColor : '#BD1E51',
        paddingHorizontal : 10,
        paddingVertical : 5,
        borderWidth : 2,
        backgroundColor : '#FFF',
        elevation : 30,
        width : 120,
        borderRadius : 30,
        marginTop : 20,


    },
    chatViewImage : {
        width : 30,
        height : 30,
    },
    chatViewText : {
            justifyContent : 'center' ,
            alignItems : 'center'
    },
    chatText : {
        fontSize : 16,
        fontWeight : 'bold',
        marginHorizontal : 10,
        letterSpacing : 1, 
        color : '#BD1E51'
    },
    userName : {
        marginTop : 20,
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