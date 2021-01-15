import * as ActionRedux from './action_redux'

export const LoginUser = (user) => ({
    type : ActionRedux.LOGIN_USER,
    data : user
});

export const LogoutUser = (id) => ({
    type : ActionRedux.LOGOUT_USER ,
    data : id
})

export const ChangeInfo = (info) => ({
    type : ActionRedux.MODIFY_INFO ,
    data : info
})

export const ChangeUserName = (username) => ({
    type : ActionRedux.CHANGE_USERNAME,
    data :username
})

export const AddRech = (rech) => ({
    type : ActionRedux.ADD_RECH,
    data : rech
})

export const GetSaraha = (saraha) => ({
    type : ActionRedux.GET_SARAHA , 
    data : saraha
})

export const RemoveSaraha = (id) => ({
    type : ActionRedux.REMOVE_SARAHA,
    data : id
}) 