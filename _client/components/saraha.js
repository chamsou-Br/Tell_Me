import Axios from 'axios';
import {Item, Row } from 'native-base';
import React , {useState , useEffect , useRef} from 'react';
import {View , Text , StyleSheet, Alert ,Image } from 'react-native'
import { FlatList, ScrollView, State, TouchableOpacity } from 'react-native-gesture-handler';
import {colors, Icon} from 'react-native-elements'
import { ceil, color } from 'react-native-reanimated';
import { connect } from 'react-redux';
import { GetSaraha, RemoveSaraha } from '../redux/action_creator';
import { ImageBackground } from 'react-native';


const  RenderItem = (props) => {

    const [test , setTest] = useState(false)
   const  item = props.data.item
   const index = props.data.index
   let color1;
   let color2;
// FDC4A9 FFA074 ##### FE97B5   FFDEE5 // Fac857 FFE9B7  //=## ED335F F9858B // EAD6CD E5B9A8 // #A7BC5B #8DA242
if ( (index % 6) == 0 ) {

    color2 = '#FDC4A9'
    color1 = '#FFA074'
}
if ( (index % 6) == 1 ) {
  color1 = '#FE97B5'
  color2 = '#FFDEE5'
}

if ( (index % 6) == 2 ) {
   color1 = '#Fac857'
   color2 = '#FFE9B7'
}
if ( (index % 6) == 3 ) {
   color1 = '#ED335F'
   color2 = '#F9858B'
}
if ( (index % 6) == 4 ) {
   color2 = '#EAD6CD'
   color1 = '#E5B9A8'
}
if ( (index % 6) == 5 ) {
  color2 = '#A7BC5B'
  color1 = '#8DA242'
}





       return(
           <TouchableOpacity onLongPress={() => Alert.alert('Saraha' , 'you want to delete this message :(',[
               {
                   'text'  : 'cancel' ,
                   style : 'cancel'
               },
               {
                   text  : 'delete',
                   onPress : () => { props.onDelete(item._id)
                    Axios.post('http://192.168.43.16:4000/deleteSaraha' , {
                      username : props.user.userName,
                      email : props.user.email,
                      _id : item._id
                      })
                   }    
               }
           ])}>
           <View style={styles.itemView}>

                <View style={[styles.titleView,{backgroundColor : color1}]}>
                       <Text style={styles.titleText}>{item.title}</Text>
               </View>
               
               <View>
                      <View style={[styles.DateView,{backgroundColor : color2 , borderColor : color1}]}>
                          <Icon name='calendar' type='font-awesome' color={color1} />
      
                          <Text style={[styles.DateText,{color : color1,  textShadowColor: color1}]}>{item.date}</Text>
                      </View>
                      <View style={[styles.RelatteDateMsg,{backgroundColor : color2}]} />
                       <View style={[styles.RelatteDateMsg2,{backgroundColor : color2}]} />
                      <View style={[styles.DescriptionView,{backgroundColor : color2,borderColor : color1}]}>
                           <View style={styles.messageView}>
                           <ScrollView>
                           <Text style={styles.messageText}>{item.message}</Text>   
                           </ScrollView>
                                
                           </View>   
                     </View>
                   </View>
           </View>
           </TouchableOpacity>
       )
   }

const Saraha = (props) => {

    
    useEffect(()=> {
        Axios.post('http://192.168.43.16:4000/getSaraha' , {
            username : props.user.userName,
            email : props.user.email
        }).then(res => {
         props.getSaraha(res.data)
        })
    },[])




    if (props.saraha.length > 0 ) {
    return(
        <ImageBackground source={require('../tell4.jpg')} style={{width : '100%' , height : '100%'}} >
        <View style={{position : 'absolute' , width : '100%' , height : '100%' , backgroundColor : '#BD1E51AA'}}></View>
        <View  >
      
           <FlatList
           data={props.saraha}
           keyExtractor={(item) => item._id}
           renderItem={({item , index} ) =>{ return <RenderItem user={props.user} saraha={props.saraha} data={{item : item , index : index}} onDelete={props.removeSaraha} />} }
           showsVerticalScrollIndicator={false}
           style={{marginBottom : 180,borderTopLeftRadius : 80,borderTopRightRadius : 80,height : '100%'}}/>
        
        </View>
        </ImageBackground>
    )}
    else {
         return(
            <View style={{justifyContent : 'center' , alignItems : 'center',height : '100%',backgroundColor : '#FFF'}}>
            <Image style={{width : 250 , height : 200 }} source={require("../recherche.jpg")} />
            <Text style={{marginTop : 15,color : "#00000044" , fontWeight : 'bold'}}>NO messages Yet :| </Text>
          </View>
           )
    }
}
const mapStateToProps = (state) => {
    return {
        saraha : state.saraha , 
        user : state.user 
    }
}

const mapDispatchToProps = dispatch => ({
    getSaraha : (saraha) => dispatch(GetSaraha(saraha)),
    removeSaraha : (newSaraha) => dispatch(RemoveSaraha(newSaraha))
})
export default connect(mapStateToProps,mapDispatchToProps)(Saraha)

const styles = StyleSheet.create({
    container : {
        flex : 1,
        flexDirection : 'row',
        justifyContent : 'center',
        marginTop : 300,
        marginHorizontal : 50
    } ,
    introductionView  : {
        width : '100%',
        height : 150,
        backgroundColor : '#BD1E51',
        justifyContent :'center' ,
        alignItems : 'center'
    },
    introductionText : {
        marginTop : 35,
        fontSize : 24 , 
        textAlign : 'center',
        fontWeight: 'bold' ,
        color : '#FFF' , 
        textShadowColor: '#FFF',
        textShadowOffset: {width: 2, height: 3},
        textShadowRadius: 10,
        letterSpacing : 2,
        marginBottom : 15
    },
    absolute : {
        width : 80,
        height : 80,
        position : 'absolute',
        backgroundColor : '#BD1E51' ,
        top : 140
    },
    absolute2 : {
        width : 80,
        height : 80,
        position : 'absolute',
        backgroundColor : '#BD1E51' ,
        top : 140,
        left : 315,
    },
    itemView : {
        width : 300 ,
        height : 250 ,
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        marginHorizontal :40
        
    },
   
    DescriptionView : {
        width : 260,
        height : 140,
        backgroundColor : '#E5BACE', 
        marginLeft : 30 ,            
        borderRadius :10 ,
        alignItems : 'center',  
        justifyContent : 'center' ,    
        overflow : 'hidden', 
        borderLeftWidth : 10,
        borderColor : '#FE97B5' ,  
        marginTop : 20
     },                               
    titleView  : {                          
        width  :60 ,                                
        height : 180,                          
        borderRadius : 30,                        
        backgroundColor : '#ED335F',
        justifyContent : 'center' ,
        marginLeft : 10, 
        alignItems : 'center',    
    },
    titleText : {
       transform : [{rotate : '-90deg'}],
        fontSize : 18 , 
        textAlign : 'center' ,
        color : '#FFF' , 
        fontWeight : 'bold',
        letterSpacing : 1,
        width : "150%",
        overflow : 'visible'
        
    },
    DateView : {
        width : 260,
        height : 50,
        backgroundColor : '#FDC4A9',
        marginLeft : 30 ,            
        borderRadius :10 ,
        alignItems : 'center' ,
        paddingLeft : 15 ,
        overflow : 'hidden', 
        borderLeftWidth : 10,
        borderColor : '#FFA074',
        flexDirection :'row',

    },
    RelatteDateMsg : {
        width : 25 ,
        height : 40,
        backgroundColor : '#FDC4A9',
        position : 'absolute',
        top : 40,
        left : 70
    } ,
    RelatteDateMsg2 : {
        width : 25 ,
        height : 40,
        backgroundColor : '#FDC4A9',
        position : 'absolute',
        top : 40,
        left : 220
    } ,
    DateText :  {
        color : '#FFA074',
        fontWeight :'bold',
        fontSize : 18,
        marginLeft : 10,
        letterSpacing : 2,
        textShadowColor: '#FFA074',
        textShadowOffset: {width: 1, height: 3},
        textShadowRadius: 10,
    },
    messageText : {
        color : '#FFF',
        letterSpacing : 1,
        fontSize : 18,
        fontWeight : 'bold' ,
        marginHorizontal : 4,
        textAlign : 'center',
    },
    messageView : {
        justifyContent : 'center' , 
        alignItems  : 'center',
        marginTop : 10
    }
})