

import { Router, Route, IndexRoute, UPDATE_LOCATION } from 'react-router'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'
import firebase from 'firebase'
import 'firebase/firestore'


import React from 'react';
import { render, ReactDOM } from 'react-dom';
import { Provider } from 'react-redux';


// Styles
import './app.scss';
// React Components
import {
    AddAuctionPage,
    AppPage,
    AuctionsPage,
    ConfirmWinnersPage,
    DonatePage,
    HomePage,
    LoginPage,
    ResultsPage,
    DonorsPage,
    SponsorsPage
    } from './components/index';
// Actions
import { LoginActions } from './actions/LoginActions'
import { fetchUsers } from './actions/UserActions'
import { toggleAuctionDetail, fetchAuctions, updateAuctions } from './actions/AuctionActions'
// Store
import configureStore from './stores/configureStore'
// History
import hashHistory from './history'
// DevTools
import DevTools from './components/containers/devTools/DevTools'

import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

// Material UI
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// set in webpack
// console.log('__PRODUCTION__', __PRODUCTION__)
// console.log('__DEV__', __DEV__)
const __DEV__ = !!(process.env.NODE_ENV === 'dev');
console.log('Environment:', JSON.stringify(process.env.NODE_ENV))


const firebaseConfig = {
  apiKey: "AIzaSyA3JKgI5y36_yDZUcL2JTFWaKKziF6ikgg",
  authDomain: "pmc-2018.firebaseapp.com",
  databaseURL: "https://pmc-2018.firebaseio.com",
  projectId: "pmc-2018",
  storageBucket: "pmc-2018.appspot.com",
  messagingSenderId: "606291690097",
}
 
// Initialize firebase instance
const firebaseApp = firebase.initializeApp(firebaseConfig)
// Initialize Cloud Firestore through Firebase
firebase.firestore();
 
// Add reduxFirestore store enhancer to store creator
const createStoreWithFirebase = compose(
  reduxFirestore(firebaseApp), // firebase instance as first argument
)(createStore)
 
// Add Firebase to reducers
const rootReducer = combineReducers({
  firestore: firestoreReducer
})
 
// Create store with reducers and initial state
const initialState = {}
const store = createStoreWithFirebase(rootReducer, initialState)
 

const routerHistory = syncHistoryWithStore(hashHistory, store)

// listen for authorization event to load app
let unsubscribe = store.subscribe(authCheckHandler);
let logoutUnsubscribe;

store.dispatch(LoginActions.authCheckRequest());




function authCheckHandler() {
  
      const state = store.getState()
  
      if(state.login.applicationClosed) {
          loadLockdownView()
      } else if (state.login.forceLoginView) {
          unsubscribe()
          loadLoginView()
      } else if (state.login.user) {
          unsubscribe()
          loadAppView()
          // post login logout handler
          logoutUnsubscribe = store.subscribe(logoutHandler);
  
      } else {
          console.log("auth logic failed in app.js")
          unsubscribe()
      }
  }

function loadAppView () {

    // on Auctions Page click, always go to list view
    hashHistory.listen(location => {
        if (location.pathname === '/auctions') {
            store.dispatch(toggleAuctionDetail(false));
        }
    })

    render(
        <Provider store={store}>
            <div>
                <Router history={hashHistory}>
                    <Route path="/" component={AppPage}>
                        <IndexRoute component={HomePage}/>
                        <Route path="/auctions" component={AuctionsPage}/>
                        <Route path="/auctions/confirmWinners" component={ConfirmWinnersPage}/>
                        <Route path="/auctions/add" component={AddAuctionPage} />
                        <Route path="/donate" component={DonatePage} />
                        <Route path="/results" component={ResultsPage} />
                        <Route path="/donors" component={DonorsPage} />
                        <Route path="/sponsors" component={SponsorsPage} />
                    </Route>
                </Router>
                {
                    (() => {
                        if (__DEV__ && false) {
                            return <DevTools />;
                        }
                    })() || 'a'
                }
            </div>
        </Provider>,
        document.getElementById('app-page')
    )

    // Fetch Once to Rule Them ALL
    store.dispatch(fetchUsers())
    store.dispatch(fetchAuctions())
    store.dispatch(updateAuctions())
    store.dispatch(LoginActions.getConfig())
    store.dispatch(LoginActions.updateConfig())
}

function loadLoginView () {
  
      // console.log('load login view')
  
      render(
          <LoginPage />,
          document.getElementById('app-page')
      )
  }
  
function loadLockdownView () {
    render(
        <div>APPLICATION CLOSED AT THIS TIME</div>,
        document.getElementById('app-page')
    )
}
  
  function logoutHandler() {
  
      let state = store.getState()
  
      if (state.login.forceLoginView) {
          logoutUnsubscribe()
          ReactDOM.unmountComponentAtNode(document.getElementById('app-page'))
          loadLoginView()
      }
  }
  