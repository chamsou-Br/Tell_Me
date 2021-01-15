import { State } from 'react-native-gesture-handler'
import * as ActionRedux from './action_redux'
const user = {
    isLogin : false,
    userName : '',
    email : '' ,
    sexe : '',
    info : {
        Etude : "" ,
        Birthday : "",
        Work : "",
        live : "",
        Relation : "",
        Hobbies : '',
        Nationality : "" 
    },
    imageSocial : '',
    isImageSocial : false,
    isImageBuffer : false,
    img : ''
}

export const UserRedux = (state = user , Action) => {
    switch(Action.type) {
        
        case ActionRedux.LOGIN_USER :
            state = Action.data
            return state

        case ActionRedux.LOGOUT_USER : 
             state = null
            return state

        case ActionRedux.MODIFY_INFO : 
            state.info = Action.data
            return state

        case ActionRedux.CHANGE_USERNAME  : 
            state.userName = Action.data
            return state
        
        default : 
           return state ; 
    }
      
        
}
