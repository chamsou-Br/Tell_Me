
import * as ActionRedux from './action_redux'
const saraha = []

export const SarahaRedux = (state = [] , Action) => {
    switch(Action.type) {

        case ActionRedux.GET_SARAHA : 
        
            state = Action.data 
            return state

        case ActionRedux.REMOVE_SARAHA :
            state = state.filter(item => item._id != Action.data)
            return state 

        default : 
           return state ; 
    }
      
        
}