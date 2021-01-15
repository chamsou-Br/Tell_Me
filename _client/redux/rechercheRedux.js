
import * as ActionRedux from './action_redux'
const rech = {
    isLogin : false,
    userName : '',
    email : '' ,
    sexe : '',
    info : {
        Etude : false ,
        Birthday : false,
        Work : false,
        live : false,
        Relation : false,
        Hobbies : false,
        Nationality : false, 
    },
    imageSocial : '',
    isImageSocial : false,
    isImageBuffer : false,
    img : ''
}

export const RechercheRedux = (state = rech , Action) => {
    switch(Action.type) {
        
        case ActionRedux.ADD_RECH : 
            state = Action.data
            return state
        default : 
           return state ; 
    }
      
        
}