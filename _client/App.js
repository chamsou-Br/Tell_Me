import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator  , Button , Alert} from 'react-native';
import Compte from './components/compte';
import Main from './components/main';
import LoginNav from './components/Sign_Login_Nav';
import {createStore , applyMiddleware, combineReducers} from 'redux'
import { UserRedux } from './redux/userRedux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { connect, Provider } from 'react-redux';
import AfficheScreen from './components/AfficheScreen';
import { RechercheRedux } from './redux/rechercheRedux';
import Recherche from './components/recherche';
import Saraha from './components/saraha';
import { SarahaRedux } from './redux/SrahaRedux';

const App = () => {

  // Store
  const store = createStore(
    combineReducers({
      user : UserRedux,
      rech : RechercheRedux,
      saraha : SarahaRedux
    }),
    applyMiddleware(thunk,logger)
  )

  // Screen Affiche isLogin ou NON 
  

    return(
      <Provider store={store}>
   <AfficheScreen />
      </Provider>
      
    )
  }

export default App