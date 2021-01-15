import React, { Component, useState } from 'react';
import Main from './main';
import LoginNav from './Sign_Login_Nav';

import { connect, Provider } from 'react-redux';
import RegisteTab from './recherche';
import ModifyInfo from './modifyinfo';

const AfficheScreen = (props) => {
    if (props.user.isLogin) {
        return (<Main />)
    }
    else{
        return( <LoginNav />)
    }
      
    }

    const mapStateToProps = state => {
      return {
        user : state.user
      }
      }

  export default  connect(mapStateToProps)(AfficheScreen)
    