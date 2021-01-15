import React, { Component, useState } from 'react';
import { StyleSheet, Text, View,ImageBackground, RefreshControlBase , ActivityIndicator } from 'react-native';
import {Button , Icon,Input    } from 'react-native-elements'
import {Form, Label , Picker} from 'native-base'
import axios from 'axios'
import { connect } from 'react-redux';
import { LoginUser } from '../redux/action_creator';


class signin extends Component{
        state={
            FamillyName : '',
            FirstName : '' ,
            Sexe : 'Male',
            password : '' ,
            Email : '',
            Email_err : '',
            password_err : '',
            username_err : '',
        }
        IconView = () => { return (<Icon type='font-awesome' name='sign-in' color='#FF6495' />)}
    SigninWithEmail = () => {
           let UserTell = '';
            this.IconView = <ActivityIndicator color='#000' />
            if (this.state.FirstName && this.state.FamillyName) {
                UserTell = this.state.FamillyName.toLowerCase() + ' ' + this.state.FirstName.toLowerCase()
                UserTell.toLowerCase();
            }
       axios.post('http://192.168.43.16:4000/signin',{
        userName : UserTell,
        password : this.state.password,
        sexe : this.state.Sexe,
        email : this.state.Email
    }).then(res => {
                    if(res.data.error) {
                        if (res.data.error.username !== null ) {this.setState({FamillyName : '' , FirstName : ''})}
                        if (res.data.error.email !== null) {this.setState({Email: ''})}
                        if (res.data.error.password !== null ) {this.setState({password : '' })}
                        this.setState({Email_err : res.data.error.email ,
                            username_err : res.data.error.username ,
                            password_err : res.data.error.password })
                    }else {
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
                        if (res.data.user.isImageBuffer) {
                            user.img = res.data.user.img.data.data ;
                        }
                        this.props.loginUser(user);
                        console.log(this.props.user);
                      }
    })
    .catch((err) => {console.log(err)}); 
    this.IconView = <Icon type='font-awesome' name='sign-in' color='#FF6495' />
    }
    render() {
        return(
            <ImageBackground source={require('../tell4.jpg')} style={{width : '100%',position:'relative'}} >
    <View style={{position : 'absolute' , width : '100%' , height : '100%' , backgroundColor : '#BD1E51aa'}}></View>
            <View style={Styles.LoginView}>
            <Text style={Styles.title} >We are delighted to meet you :)</Text>
           <Text style={Styles.SemiTitle} >Entre Your <Text style={{color :'#F1B814',fontWeight : 'bold'}}>Real </Text> name please to connect with us </Text>
                <View style={{marginTop : 30 , marginHorizontal : 30, position :'relative'}} >
                    <Input onFocus={() => this.setState({username_err : ''})}  placeholder='Enter your Familly Name'
                           leftIcon={<Icon size={30} color='#E6E2DD' style={{marginRight : 10  }} name='home'
                           type='font-awesome' />} value={this.state.FamillyName} style={{color : '#FFF'}}
                           onChangeText={(Value) => this.setState({FamillyName  : Value})} />
                    <Text style={[Styles.textErr,{top : 50}]}>{this.state.username_err}</Text>
                    <Input onFocus={() => this.setState({password_err : ''})}  placeholder='Entre your First Name'
                          leftIcon={<Icon color='#E6E2DD' style={{marginRight : 10}} name='user'
                          type='font-awesome' />} value={this.state.FirstName} style={{color : '#FFF'}}
                          onChangeText={(Value) => this.setState({FirstName : Value})} />
                    <Text style={[Styles.textErr,{top : 128}]}>{this.state.username_err}</Text>
                    <Input onFocus={() => this.setState({Email_err : ''})} placeholder='Entre your Email'
                          leftIcon={<Icon color='#E6E2DD' style={{marginRight : 10}} name='envelope-o'
                          type='font-awesome' />} value={this.state.Email} style={{color : '#FFF'}}
                          onChangeText={(Value) => this.setState({Email : Value})} />
                    <Text style={[Styles.textErr,{top : 202}]}>{this.state.Email_err}</Text>
                    <Input onFocus={() => this.setState({password_err : ''})} placeholder='Entre your Password'
                           leftIcon={<Icon color='#E6E2DD' style={{marginRight : 10}} name='key' type='font-awesome' />}
                           secureTextEntry={true} value={this.state.password} style={{color : '#FFF'}}
                           onChangeText={(Value) => this.setState({password : Value})} />
                    <Text style={[Styles.textErr,{top : 277}]}>{this.state.password_err}</Text>     
                    <Picker 
                        mode='dialog'
                        itemStyle={{backgroundColor : '#000'}}
                        style={Styles.picker}
                        selectedValue={this.state.Sexe}
                        onValueChange={async (itemVal , itemIndex) => await this.setState({Sexe : itemVal})}
                        >
                        <Picker.Item   label='Male' value="Male" />
                        <Picker.Item label="Female" value="Female" />
                    </Picker>
                    <Button
                    title='Sign In'
                    onPress={() => this.SigninWithEmail()}
                    titleStyle={{color : '#000'  , width : '30%'}}
                    buttonStyle={Styles.LoginButton}
                    icon={this.IconView} />
               </View>
               <Text style={{color : '#E6E2DD', marginTop : 20,textAlign : 'center' , letterSpacing : 1 }} >
               You  have an account ! <Text onPress={() => {this.props.navigation.navigate('Log-In')}}
                style={{color :'#F1B814',fontWeight : 'bold'}}>Log in </Text> </Text>
            </View>

            </ImageBackground>
        )
    }
}
const Styles = StyleSheet.create({
 
    title : {
        marginTop : 20,
        marginHorizontal : 20,
        textAlign : 'center',
        color : '#FFF' , 
        fontSize : 24,
        fontWeight : 'bold',
        letterSpacing : 1,
    },
    SemiTitle : {
        marginTop : 10,
        marginHorizontal : 15 ,
        fontSize : 14,
        textAlign : 'center',
        color : '#E6E2DD' ,
        fontWeight : 'bold',
        letterSpacing : 2

    },
    LoginView : {
        paddingTop : 40,
        width : '100%',
        height : '100%',
        
    },
    picker : {
        color : '#FFF',
        width : 150
    },
    LoginButton : {
        width : 320,
        marginTop : 45,
        height : 60,
        backgroundColor : '#FFF' ,
        color : '#000'
    },
    textErr : {
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
    export default connect(mapStateToProps,mapDispatchToProps)(signin); 