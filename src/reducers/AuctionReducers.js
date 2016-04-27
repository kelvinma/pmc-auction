import {
    CONFIRM_BID_TOGGLE,
    FETCH_AUCTIONS,
    LOAD_AUCTION,
    UPDATE_AUCTION,
    PLACE_BID,
    HIDE_AUCTION_DETAIL,
    SHOW_AUCTION_DETAIL,
    CREATE_AUCTION_SUCCESS
} from '../actions/AuctionActions'

import {
    LOGIN_CONSTANTS
} from '../actions/LoginActions'

const defaultAuctionState = {
    auctionCollection : [],
    confirmedBids : [],
    expandedAuction : {},
    ownedAuctionCollection: [],
    bidTotal: 0,
    selectedBids : [],
    userId : null
}

let _userId = null

function auctions(state = defaultAuctionState, action) {

    switch (action.type) {

        case CONFIRM_BID_TOGGLE:
            
            let auction = state.ownedAuctionCollection.find( auction => auction.id === action.auctionId)
            let bidObj = auction.bids[action.bidId]
            
            if (!bidObj.checked) {
                bidObj.checked = true
                auction.bidTotal += parseInt(bidObj.bidAmount, 10)
                state.bidTotal += parseInt(bidObj.bidAmount, 10)
            } else {
                bidObj.checked = false
                auction.bidTotal -= parseInt(bidObj.bidAmount, 10)
                state.bidTotal -= parseInt(bidObj.bidAmount, 10)
            }
            
            

            return Object.assign({}, state, {
                ownedAuctionCollection: [
                    ...state.ownedAuctionCollection
                ]
            });
            
            return state;

        case CREATE_AUCTION_SUCCESS:
            // console.log('create success');
            // TODO: clear form
            return state;

        case UPDATE_AUCTION:
            // console.log('auction reducers', state, action.auction);

            return Object.assign({}, state, {
                auctionCollection: state.auctionCollection.map( auction => {
                    // if updated auction, then replace with new
                    if (auction.id === action.auction.id) {
                        return action.auction;
                    } else {
                        return auction;
                    }
                })
            });

        case LOAD_AUCTION:

            let ownList = state.ownedAuctionCollection.slice()

            if (action.auction.donorId === state.userId) {
                
                // process bids
                action.auction.bidTotal = 0

                ownList = [
                    ...ownList,
                    action.auction
                ]
                
            }



            return Object.assign({}, state, {
                auctionCollection: [
                    ...state.auctionCollection,
                    action.auction
                ],
                ownedAuctionCollection : ownList
                        
            });

        // case PLACE_BID:

        //     console.log('place bid reducer', action);
        //     return state;

        case HIDE_AUCTION_DETAIL:

            return Object.assign({}, state, {
                expandedAuction: {}
            });

        case LOGIN_CONSTANTS.AUTH_SUCCESS:
            return Object.assign({}, state, {
                userId: action.user.uid
            });

        case SHOW_AUCTION_DETAIL:

            const expandedAuction = state.auctionCollection.find( auction => {
                return auction.id === action.auctionId;
            });

            return Object.assign({}, state, {
                expandedAuction: expandedAuction
            });

        default:
            return state
    }
}

export default auctions