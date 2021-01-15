import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator  , Alert ,ImageBackground} from 'react-native';
import {Button , Icon,Input   } from 'react-native-elements'
import * as firebase from 'firebase'
import * as facebook from 'expo-facebook'
import * as Google from 'expo-google-app-auth'
import {Form, Label ,Picker } from 'native-base'
import axios from 'axios'
import { LoginUser } from '../redux/action_creator';
import { connect } from 'react-redux';



/* var firebaseConfig = {
  apiKey: "AIzaSyDsMkuoqghk3G845yvEFOXpFJx_iKlaSrA",
  authDomain: "react-firebase-30bc0.firebaseapp.com",
  projectId: "react-firebase-30bc0",
  storageBucket: "react-firebase-30bc0.appspot.com",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig); 
<Button title='Login ' onPress={() =>{
          // firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
          //    console.log(user)
          // })
           firebase.auth().createUserWithEmailAndPassword('chamseddineb07@gmail.com','20022002')
        }} />
         const credential = firebase.auth.FacebookAuthProvider.credential(token)
      firebase.auth().signInWithCredential(credential).catch(err => alert('error '))
*/

class Login extends Component{
     state = {
          Email : '' ,
          password : '' ,
          userName  :'',
          image : '',
          sexe : 'Male',
          type : ''  ,
          password_err : '',
          email_err : '',
          token : ''
     }

    IconView = () => { return (<Icon type='font-awesome' name='sign-in' color='#FF6495' /> ) }
    IconView2 = () => {return (<Icon type='font-awesome' name='envelope-o'  color='#BD1E51' size={30} />)}
    IconView3 = () => {return (<Icon name='facebook-official' type='font-awesome' color='#3C5898' size={30} />)}

  loginWithGoogle = async() => {
    const config = {
      androidClientId: `459902367069-n9h98k5cu045q6vr32mpfff17g5602cl.apps.googleusercontent.com`,
      scopes : ['profile','email']
    };
    const { type, accessToken, user } = await Google.logInAsync(config);
    console.log(user);
    
    if (type == 'success') {
      this.setState({password : accessToken})
      this.setState({userName : user.name});
      this.setState({image : user.photoUrl});
      this.setState({Email : user.email});
      this.setState({type : 'with google'});
      this.setState({token : accessToken});
      this.IconView2 = <ActivityIndicator color='#000' />
      this.SigninWithEmail(this.state.type);
      this.IconView2 = <Icon type='font-awesome' name='envelope-o'  color='#BD1E51' size={30} />
    }}

  SigninWithEmail = (type) => {
        axios.post('http://192.168.43.16:4000/login',{
        password : this.state.password,
        email : this.state.Email,
        userName : this.state.userName,
        image : this.state.image,
        type : type,
        sexe : this.state.sexe,
        token : this.state.token
    }).then(res =>{
      if(res.data.error) {
        if (res.data.error.email !== null ) {this.setState({Email : ''})}
        if (res.data.error.password !== null ) {this.setState({password : '' })}
        this.setState({ email_err : res.data.error.email ,
                        password_err : res.data.error.password })
    }else {
      console.log(res.data.user);
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
 /*  if (res.data.user.isImageBuffer) {
      user.img = res.data.user.img.data.data ;
  } */
  //  user.img = res.data.user.img.data.data
    this.props.loginUser(user);
    }

    }); 
  }

  loginWithFb = async () => {
       await facebook.initializeAsync(
        {
          autoLogAppEvents: true,
          appId: '398394241368649' ,
        }
       ).catch(err => console.log(err.message))
       const {type,token }  = await facebook.logInWithReadPermissionsAsync({permissions: ['public_profile','email']})
       .catch(err => console.log(err.message) )
    if (type == 'success') {
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}&fields=id,name,birthday,email,picture.type(large)`
      );
     const user = await response.json()
      this.setState({Email : user.email});
      this.setState({userName : user.name});
      this.setState({password : token})
      this.setState({type : 'with facebook'});
      this.setState({image : user.picture.data.url});
      this.setState({token : token})
      this.IconView3 = <ActivityIndicator color='#000' />
     this.SigninWithEmail(this.state.type)
     this.IconView3 = <Icon name='facebook-official' type='font-awesome' color='#3C5898' size={30} />
     
    }
  }

  loginWithEmail = async () => {
    this.IconView = <ActivityIndicator color='#000' />
    await this.setState({type : 'with email'});
    console.log('yes');
    console.log(this.state);
    this.SigninWithEmail(this.state.type);
    this.IconView = <Icon type='font-awesome' name='sign-in' color='#FF6495' />
    }
  
  render(){
    return(
    <ImageBackground source={require('../tell4.jpg')} style={{width : '100%',position:'relative'}} >
    <View style={{position : 'absolute' , width : '100%' , height : '100%' , backgroundColor : '#BD1E51aa'}}></View>
      <View style={Styles.LoginView}>
        <Text style={Styles.title} >We are delighted to meet you :)</Text>
        <Text style={Styles.SemiTitle} >Entre Your username and password to connect to your compte</Text>
          <Form style={{marginTop : 30 , marginHorizontal : 30}} >
            <Input  onFocus={() => this.setState({email_err : ''})} textContentType='emailAddress'
                    placeholder='Enter your Email' placeholderTextColor='#E6E2DD'
                    leftIcon={<Icon size={30} color='#E6E2DD' style={{marginRight : 10  }}
                    name='user' type='font-awesome' />} value={this.state.Email} style={{color : '#FFF'}}
                    onChangeText={(val) => this.setState({Email : val})} />
            <Text style={[Styles.textErr,{top : 50}]}>{this.state.email_err}</Text>           
            <Input onFocus={() => this.setState({password_err : ''})}  placeholder='Entre your Password'
                   placeholderTextColor='#E6E2DD'  leftIcon={<Icon color='#E6E2DD'
                   style={{marginRight : 10}} name='key' type='font-awesome' />} 
                   secureTextEntry={true} value={this.state.password} style={{color : '#FFF'}}
                   onChangeText={(val) => this.setState({password : val})} />
            <Text style={[Styles.textErr,{top : 124}]}>{this.state.password_err}</Text>
            <Button
            title='Log In'
            onPress={() => this.loginWithEmail()}
            titleStyle={{color : '#000'  , width : '30%'}}
            buttonStyle={Styles.LoginButton}
            icon={this.IconView} />
           </Form>
          
          
        <Text style={{marginHorizontal : 20 , color : '#FFF' , marginTop : 20}}
          > ───────────────  OU  ───────────────</Text>
        <View style={{marginTop : 20, marginHorizontal : 30}}> 
        <Picker 
                       prompt='Sexe'         
                        mode='dialog'
                        itemStyle={{backgroundColor : '#000'}}
                        style={Styles.picker}
                        selectedValue={this.state.sexe}
                        onValueChange={async (itemVal , itemIndex) => await this.setState({sexe : itemVal})}
                        >
                        <Picker.Item   label='Male' value="Male" />
                        <Picker.Item label="Female" value="Female" />
                    </Picker>

            <Button
             // linearGradientProps={{colors: ['#BD1E51', '#FFF'],start: { x: 0, y: 0.5 },end: { x: 0.8, y: 0.5 } }}
              buttonStyle={Styles.LoginButton}
              icon={this.IconView3}
              titleStyle={{color : '#000' , marginLeft : 20}}
              title='Log In with Facebook'
              onPress={() => this.loginWithFb()} 

             />
            <Button title='LOg In with Google'
              icon={this.IconView2}
              titleStyle={{color : '#000' , marginLeft : 20}}
              buttonStyle={Styles.LoginButton}
              onPress={() => this.loginWithGoogle()} />
        </View>
        <Text style={{color : '#E6E2DD', marginTop : 50,textAlign : 'center' , letterSpacing : 1 }} >
             You don't have an account ! <Text style={{color :'#F1B814',fontWeight : 'bold'}}
            onPress={() => this.props.navigation.navigate('Sign-In')}>Sign in </Text> </Text>

       
      </View>
      </ImageBackground>
    
      
    )

  }
}

const Styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
      },
      buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
      },
    title : {
        marginTop : 20,
        marginHorizontal : 20,
        textAlign : 'center',
        color : '#FFF' , 
        fontSize : 24,
        fontWeight : 'bold',
        letterSpacing : 1,
    },
    picker : {
      color : '#FFF',
      width : 150
  },
    SemiTitle : {
        marginTop : 10,
        marginHorizontal : 15 ,
        fontSize : 14,
        textAlign : 'center',
        color : '#E6E2DD' ,
        fontWeight : 'bold',
        letterSpacing : 1.4

    },
    LoginView : {
        paddingTop : 40,
        width : '100%',
        height : '100%',
        
    },
    LoginButton : {
        width : 320,
        marginTop : 15,
        height : 60,
        backgroundColor : '#FFF' ,
        color : '#000'
    }, textErr : {
      color : '#F1B814',
      fontWeight : '600',
      fontSize : 14,
      letterSpacing : 1.2,
      position : 'absolute',
      marginLeft : 10
  }
})

const mapStateToProps = state => {
return {
  user : state.user
}
}

const mapDispatchToProps = dispatch => ({
  loginUser : (user) => dispatch(LoginUser(user))
}) 
export default connect(mapStateToProps,mapDispatchToProps)(Login); 
