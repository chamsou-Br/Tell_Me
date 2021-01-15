import { Icon } from 'native-base'
import React from 'react'
import {Text , View , StyleSheet} from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'

const SendSaraha = (props) => {

return(
    <View style={styles.Saraha}>
        <View style={styles.ViewTitle}>
            <TouchableOpacity style={styles.ViewTitleIntern}
          >
                <Icon name='close' style={styles.TitleIcon} />
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
                maxLength={12}
            
            />
            <Text style={styles.label}>Message</Text>
            <TextInput style={styles.inputMsg} 
                placeholder='Entre your message Here ..'
                placeholderTextColor='#00000044'
                maxLength={50}
            />
            <TouchableOpacity style={styles.sendSaraha}>
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

const styles = StyleSheet.create({
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
    width : 90,
    height : 40,
    flexDirection :'row',
    marginTop : 45 , 
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
    paddingVertical : 15,
    fontSize : 20,
    width : 300 , marginLeft : 20,
    borderRadius : 15,
    marginBottom : 10,
    color : '#FFF'
},
inputMsg : {
    marginTop : 10,
    color : '#BD1E51' , 
    backgroundColor : '#FFFFFF' , 
    borderWidth :  0, 
    borderColor : '#BD1E51' ,
    elevation : 30, 
    paddingHorizontal : 20,
    paddingVertical : 15,
    fontSize : 20,
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

const mapStateToProps = state => {
    return {
      user : state.user,
      rech : state.rech
    }
}
    
export default connect(mapStateToProps)(SendSaraha); 