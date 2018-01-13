import {
    // AUTHENTICATION
    LOGIN_GOOGLE_REQUEST,
    LOGOUT_USER_REQUEST,
    
    // USER
    GET_USER,
    UPDATE_USER,
    SET_CURRENT_USER,    

    // MODALS
    OPEN_MODAL,

    // CONFIG
    FETCH_CONFIG,
    REFRESH_CONFIG,

    // PRODUCTS,
    GET_PRODUCTS,
    UPDATE_PRODUCTS,

    // AUCTIONS
    FETCH_AUCTION,
    FETCH_AUCTIONS,
    GET_AUCTIONS,
    HIDE_AUCTION_DETAIL,
    LOAD_AUCTION,
    PLACE_BID,
    REFRESH_AUCTIONS,
    REFRESH_AUCTION,
    SHOW_AUCTION_DETAIL,

} from '../constants';

/** AUTHENTICATION **/
export function loginGoogleRequest() {
    return { type: LOGIN_GOOGLE_REQUEST };
}

/** USER **/
export function setCurrentUser(user) {
    const { email='', displayName='', permissions={}, uid=null } = user;
    return {
        type: SET_CURRENT_USER,
        email,
        displayName,
        permissions,
        uid,
        authInitiated: true,
    };
}

export function logoutUserRequest() {
    return {
        type: LOGOUT_USER_REQUEST,
    };
}

export function getUser(uid, userData=null) {
    return {
        type: GET_USER,
        uid,
        userData,
    };
}

export function updateUser(userData) {
    return {
        type: UPDATE_USER,
        userData,
    };
}

export function openLoginModal() {
    return {
        type: OPEN_MODAL,
    };
}

/** CONFIG */
export function fetchConfig() {
    return {
        type: FETCH_CONFIG
    }
}
export function refreshConfig(config){
    return {
        type: REFRESH_CONFIG,
        config,
    }
}


/** AUCTIONS */
export function fetchAuctions() {
    return {
        type: FETCH_AUCTIONS
    }
}



export function getAuctions() {
    return {
        type: GET_AUCTIONS,
    };
}

export function refreshAuctions(auctionCollection) {
    console.log('REFRESH_AUCTIONS', REFRESH_AUCTIONS, auctionCollection)
    return {
        type: REFRESH_AUCTIONS,
        auctionCollection,
    }
}

export function refreshAuction(uid, auction) {
    return {
        type: REFRESH_AUCTION,
        uid,
        auction,
    }
}


export function loadAuctionObj(auction) {
    return {
        type: LOAD_AUCTION,
        auction
    }
}

export function toggleAuctionDetail(auctionId) {
    if (auctionId) {
        return {
            type: SHOW_AUCTION_DETAIL,
            auctionId
        }
    } else {
        return {
            type: HIDE_AUCTION_DETAIL
        }
    }
}

export function placeBid (bidDetails) {
    return Object.assign({}, bidDetails, {
        type: PLACE_BID,
        auctionId: bidDetails.auctionId,
        bidAmount: bidDetails.bidAmount,
        bidderObj: bidDetails.bidderObj
    });
}