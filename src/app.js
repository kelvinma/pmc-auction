// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import Promise from 'bluebird';

// Components
import { Router, Route, IndexRoute, UPDATE_LOCATION } from 'react-router'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { createDevTools } from 'redux-devtools'
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
console.log('__PRODUCTION__', __PRODUCTION__)
console.log('__DEV__', __DEV__)
console.log('JSON.stringify(process.env.NODE_ENV)', JSON.stringify(process.env.NODE_ENV))

// Styles
import './app.scss';
// React Components
import {
    AddAuctionPage,
    AppPage,
    AuctionsPage,
    ConfirmWinnersPage,
    HomePage,
    LoginPage
    } from './components/index';
// Actions
import { LoginActions } from './actions/LoginActions'
import { fetchAuctions } from './actions/AuctionActions'
// Store
import configureStore from './stores/configureStore'
// History
import hashHistory from './history'
// DevTools
import DevTools from './components/containers/devTools/DevTools'
// firebase read/write adapter
import firebase from './utils/firebaseAdapter'

const store = configureStore()
const routerHistory = syncHistoryWithStore(hashHistory, store)

// listen for authorization event to load app
let unsubscribe = store.subscribe(authCheckHandler);

store.dispatch(LoginActions.authCheckRequest());

function authCheckHandler() {
    
    const state = store.getState()
    
    if (state.login.forceLoginView) {
        unsubscribe()
        loadLoginView()
    } else if (state.login.user) {
        unsubscribe()
        loadAppView()
    } else {
        console.log("auth logic failed in app.js")
        unsubscribe()
    }
}

function loadAppView () {

    console.log('load app view');
    // store.dispatch(LoginActions.authCheck());
    // hashHistory.listen(location => LoginActions.requestRouteChange(location, store))

    render(
        <Provider store={store}>
            <div>
                <Router history={hashHistory}>
                    <Route path="/" component={AppPage}>
                        <IndexRoute component={HomePage}/>
                        <Route path="/auctions" component={AuctionsPage}/>
                        <Route path="/auctions/confirmWinners" component={ConfirmWinnersPage}/>
                        <Route path="/auctions/add" component={AddAuctionPage} />
                    </Route>
                </Router>
                {
                    (() => {
                        if (__DEV__ && false) {
                            return <DevTools />;
                        }
                    })() || ''
                }
            </div>
        </Provider>,
        document.getElementById('app-page')
    )

    // Fetch Once to Rule Them ALL
    store.dispatch(fetchAuctions())
}

function loadLoginView () {

    console.log('load login view')

    render(
        <LoginPage />,
        document.getElementById('app-page')
    )
}



