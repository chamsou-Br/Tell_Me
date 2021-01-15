import React , {Component, useState} from 'react'
import {decode , encode} from 'base64-arraybuffer'

// Import react-native components
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import axios from 'axios'
import {Icon} from 'react-native-elements'
import Animated, { Easing } from 'react-native-reanimated'
import { connect } from 'react-redux';
import { AddRech } from '../redux/action_creator'
import { Alert } from 'react-native'
import ComponentRech from './ComponentRech'
import { Modal } from 'react-native'


const { Value, timing } = Animated

// Calculate window size
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

class Recherche extends Component {
    constructor(props){
        super(props)
        this.state = {
            isFocused : false ,
            search : false,
            existe : false,
            keyword : '',
            searchMess : 'You didn\'t search yet !' ,
            imageBuff : '',
            user : {} ,
            sendSaraha : false,
            title : '' ,
            message : ''
        }
          // animation values
    this._input_box_translate_x = new Value(width)
    this._back_button_opacity = new Value(0)
    }

    _onFocus = () => {
        // update state
        this.setState({isFocused: true})
        this.setState({searchMess : 'enter an userName to search'})
        // animation config
        // input box
        const input_box_translate_x_config = {
          duration: 200,
          toValue: 0,
          easing: Easing.inOut(Easing.ease)
        }
        const back_button_opacity_config = {
          duration: 200,
          toValue: 1,
          easing: Easing.inOut(Easing.ease)
        }
    
        // run animation
        timing(this._input_box_translate_x, input_box_translate_x_config).start()
        timing(this._back_button_opacity, back_button_opacity_config).start()
    
        // force focus
        this.refs.input.focus()
    
      }

      _onBlur = () => {
        // update state
        this.setState({isFocused: false})
        this.setState({search : false})
        // animation config
        // input box
        const input_box_translate_x_config = {
          duration: 200,
          toValue: width,
          easing: Easing.inOut(Easing.ease)
        }
        const back_button_opacity_config = {
          duration: 50,
          toValue: 0,
          easing: Easing.inOut(Easing.ease)
        }

        // run animation
        timing(this._input_box_translate_x, input_box_translate_x_config).start()
        timing(this._back_button_opacity, back_button_opacity_config).start()
    
        // force blur
        this.refs.input.blur();
    
      }

      onSearch = async () => {

        if (this.state.keyword.toLowerCase() != this.props.user.userName) {
        axios.post('http://192.168.43.16:4000/recherche',{
                  username : this.state.keyword.toLowerCase(),
                }).then( async (res) =>{
                   this.setState({search : true})
                   if (res.data.existe) {
                     this.setState({existe : true})
                     this.setState({user : res.data.user })
                     const user = {
                      isLogin : true ,
                      userName : res.data.user.username,
                      email : res.data.user.email ,
                      sexe : res.data.user.sexe,
                      imageSocial : res.data.user.image,
                      isImageSocial : res.data.user.isImageSocial ,
                      isImageBuffer : res.data.user.isImageBuffer,
                      info : {
                        Etude : res.data.user.information.Etude,
                        Birthday : res.data.user.information.Birthday,
                        Work : res.data.user.information.Work,
                        live : res.data.user.information.live,
                        Relation : res.data.user.information.Relation,
                        Hobbies : res.data.user.information.Hobbies,
                        Nationality : res.data.user.information.Nationality 
                    },
                  };
                     await this.props.AddRech(user)
                     if (this.state.user.isImageBuffer) {
                      var base64Flag = 'data:image/png;base64,';
                      const base64 = encode(this.state.user.img.data.data)
                      await this.setState({imageBuff : base64Flag + base64})
                      
                       
                     }
                   }
                   console.log(this.props.rech);
                })
        }
        else {
          Alert.alert('Search' , 'you can\' search for your compte :)')
        }
      }

     

      

    render(){

      const SendSarahaNavigaton = () => {
        this.setState({sendSaraha : !this.state.sendSaraha}) 
      }
      
      //Send Saraha 

      const SendSaraha = (props) => {

        const [title , SetTitle]  = useState('')
        const [message , setMessage]  = useState('')
        const _Saraha = () => {
          if (title != '' && message != '') {

            axios.post('http://192.168.43.16:4000/sendSaraha',{
              date : new Date().getFullYear()  + ' - ' + (new Date().getUTCMonth() + 1) + ' - ' + new Date().getDate(),
              sender : this.props.user.userName ,
              reciever : this.props.rech.userName,
              email : this.props.rech.email ,
              title : title,
              message : message
            })
            SetTitle('') ; setMessage('');
            Alert.alert('Saraha' , 'your message has been sent :)')

          }else {
            if (title == '' && message == '')  Alert.alert('Saraha','you Should Entre A title & A message !')
            else if (title == '')  Alert.alert('Saraha','you Should Entre A title !')
            else if (message == '')  Alert.alert('Saraha','you Should Entre A message')
            
          }
         
        }
        return(
            <View style={styles.Saraha}>
                <View style={styles.ViewTitle}>
                    <TouchableOpacity style={styles.ViewTitleIntern}
                    onPress={() => {SendSarahaNavigaton()}}>
                        <Icon name='close' color='#FFF' style={styles.TitleIcon} />
                        <Text style={styles.TitleText} >Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.SarahaTite}>Creat Saraha message </Text>           
                </View>
                <View style={styles.ViewTitle2} />
                
                <View style={styles.ViewContainer}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput style={styles.inputTitle} 
                        placeholder='Enter a title ..'
                        placeholderTextColor='#00000044'
                        maxLength={25}
                        value={title} 
                       onChangeText={(val) => SetTitle(val)}
                    />
                    <Text style={styles.label}>Message</Text>
                    <TextInput style={styles.inputMsg} 
                        placeholder='Entre your message Here ..'
                        placeholderTextColor='#00000044'
                        value={message} 
                        maxLength={200}
                        onChangeText={(val) => setMessage(val)}
                    />
                    <TouchableOpacity onPress={() =>_Saraha()} style={styles.sendSaraha}>
                        <Text style={styles.sendSarahaText}>Send</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.ViewTitle3}>
                <View style={[styles.ViewTitle2,{left : 0, top : -100 }]} />
                    <Text style={styles.SarahaDes}>the Reciever Can't see the Sender .</Text>
                    <Text style={styles.SarahaDes}>Dont Forget , EXpress your feelings freely *_* </Text>       
                </View>
            </View>
        )
        }
      // verifer si user est entrain to rechrche
     const IsFocudFunc = () => {
        if (this.state.search) {
          if (!this.state.existe) {
            return(
            <View style={{justifyContent : 'center' , alignItems : 'center',marginTop : 250}}>
             <Image style={{width : 310 , height : 360,marginTop : -100 }} source={require("../search.png")} />
             <Text style={{marginTop : 15,color : "#00000044" , fontWeight : 'bold'}}>this username don't existe :!</Text>
           </View>)
          }else {
            return(
              <ComponentRech onNavigate={SendSarahaNavigaton} />
            )
          }
          
        }else {
          return (
           <View style={{justifyContent : 'center' , alignItems : 'center',marginTop : 250}}>
             <Image style={{width : 250 , height : 200 }} source={require("../recherche.jpg")} />
             <Text style={{marginTop : 15,color : "#00000044" , fontWeight : 'bold'}}>{this.state.searchMess}</Text>
           </View>
          )
        }
      }


      // compte search

    
  
      // fonction global
        return(
          <View style={styles.recherche}>
          <Modal visible={this.state.sendSaraha}>
            <SendSaraha onNavigation={SendSarahaNavigaton} />
          </Modal>
            <View>
             <View style={styles.header_safe_area}>
                <View style={styles.header}>
                 <View style={styles.header_inner}>
                         <View>
                             <Text style={{fontWeight : 'bold',fontSize : 18}}
                             > Recherche
                             </Text>
                         </View>
                         <TouchableHighlight
                            activeOpacity={1}
                            underlayColor={"#ccd0d5"}
                            onPress={this._onFocus}
                            style={styles.search_icon_box}
                            >
                            <Icon name="search" size={22} color="#000000" />
                        </TouchableHighlight>
                        <Animated.View
                           style={[ styles.input_box, {transform: [{translateX: this._input_box_translate_x}] } ]}
                          >
                        <Animated.View style={{opacity: this._back_button_opacity}}>
                            <TouchableHighlight
                                activeOpacity={1}
                                underlayColor={"#ccd0d5"}
                                onPress={this._onBlur}
                                style={styles.back_icon_box}
                            >
                                <Icon name="chevron-left" size={22} color="#000000" />
                            </TouchableHighlight>
                        </Animated.View>
                           <TextInput 
                                ref="input"
                                placeholder="Search User"
                                clearButtonMode="always"
                                value={this.state.keyword}
                                onChangeText={(value) => this.setState({keyword: value}) }
                                style={styles.input}
                            />
                            <TouchableHighlight
                                activeOpacity={1}
                                underlayColor={"#ccd0d5"}
                                onPress={this.onSearch}
                                style={styles.back_icon_box}
                            >
                                <Icon name="search" size={22} color="#000000" />
                            </TouchableHighlight>
                        </Animated.View>
                                </View>
                            </View>
             </View>
             </View>
             <IsFocudFunc />
            </View>
             
        )
    }
}

const mapStateToProps = state => {
  return {
    user : state.user,
    rech : state.rech
  }
}
const mapDispatchToProps = dispatch => ({
  AddRech : (rech) => dispatch(AddRech(rech))
}) 
  
export default  connect(mapStateToProps,mapDispatchToProps)(Recherche); 

const styles = StyleSheet.create({
  recherche : {
    backgroundColor : "#FFF",
    height : "100%"
  } ,
 
    header_safe_area: {
      zIndex: 1000,
      marginTop : 0,
    paddingTop : 25,paddingBottom : 5,
      backgroundColor : '#Fff',elevation :40
    },
    header: {
      height: 50,
      paddingHorizontal: 16
    },
    header_inner: {
      flex:1,
      overflow: 'hidden',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative'
    },
    search_icon_box: {
      width:40,
      height: 40,
      borderRadius: 40,
      backgroundColor: '#e4e6eb',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    input_box: {
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      top:0,
      left:0,
      backgroundColor: 'white',
      width: width - 32
    },
    back_icon_box: {
      width: 40,
      height: 40,
      borderRadius: 40,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 5
    },
    input: {
      flex: 1,
      height: 40,
      backgroundColor: '#e4e6eb',
      borderRadius: 16,
      paddingHorizontal: 16,
      fontSize: 15
    },
    Saraha :  {
      backgroundColor : "#FFF"
  },
  ViewTitle : {
      width : '100%',
      height : 200,
      backgroundColor : '#BD1E51',
      borderBottomLeftRadius : 90
  },
  ViewTitle3 :  {
      backgroundColor : '#BD1E51',
      height : 200,paddingTop : 20,
      borderTopRightRadius : 60
      
  },
  ViewTitleIntern : {
      width : 100,
      height : 40,
      flexDirection :'row',
      marginTop : 35 , 
      marginLeft : 20, 
      alignItems : 'center' ,
      backgroundColor: '#FFFFFF55',
      borderRadius : 50
  },
  TitleIcon : {
      color : '#FFF' , 
      fontSize : 22,
      marginLeft : 10
  },
  TitleText : {
      color : '#FFFFFFAA' , 
      fontSize : 18 , 
      fontWeight : 'bold' ,
      marginLeft : 10
  },
  
  ViewTitle2 : {
      width : 100 , 
      height : 100,
      backgroundColor : '#BD1E51',
      position : 'absolute',
      top : 180,
      left : 300
  },
  SarahaTite : {
      marginTop : 35,
      fontSize : 24 , 
      fontWeight: 'bold' ,
      color : '#FFF' , 
      textShadowColor: '#FFF',
      textShadowOffset: {width: 2, height: 3},
      textShadowRadius: 10,
      letterSpacing : 2,
      marginLeft : 50,
      marginBottom : 15
  },
  SarahaDes : {
      color : '#FFFFFF' ,
      fontWeight : 'bold' , 
      fontSize: 16 ,
      letterSpacing : 1.2 ,
      textAlign : 'center',
      marginHorizontal : 20,
      
  },
  ViewContainer : {
      height : 450,
      backgroundColor : '#FFF',
      zIndex : 10,
      borderTopRightRadius : 90,
      paddingVertical : 20,
      borderBottomLeftRadius : 90
  
  }, 
  label : {
      color : '#000' , 
      fontWeight : 'bold' , 
      fontSize : 18 , 
      marginLeft : 25, 
      letterSpacing : 1.5,marginTop : 20
  },
  inputTitle : {
      marginTop : 10,
      backgroundColor : '#FFF' , 
      borderWidth :  0, 
      borderColor : '#BD1E51' ,
      elevation : 30 , 
      paddingHorizontal : 20,
      paddingVertical : 18,
      fontSize : 18,
      width : 300 , marginLeft : 20,
      borderRadius : 15,
      marginBottom : 10,
      color : '#BD1E51'
  },
  inputMsg : {
      marginTop : 10,
      color : '#BD1E51' , 
      backgroundColor : '#FFFFFF' , 
      borderWidth :  0, 
      borderColor : '#BD1E51' ,
      elevation : 30, 
      paddingHorizontal : 20,
      paddingVertical : 18,
      fontSize :18,
      width : 300 , marginLeft : 20,
      borderRadius : 20,
      marginBottom : 10
  }, 
  sendSaraha : {
      width : 200 , 
      height : 60 ,
      backgroundColor : '#BD1E51',
    alignSelf : 'center',
    marginTop : 60,
    paddingHorizontal : 20,
    justifyContent : 'center' , 
    alignItems : 'center',
    borderRadius : 20
  }, 
  sendSarahaText : {
  color : '#FFF' , 
  fontSize : 22 , 
  fontWeight : 'bold' 
  }  
  }) 