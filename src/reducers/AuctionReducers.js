import {
    FETCH_AUCTIONS,
    LOAD_AUCTION,
    PLACE_BID,
    TOGGLE_AUCTION_DETAIL,
    CLEAR_AUCTION_DETAIL,
    CREATE_AUCTION_SUCCESS
} from '../actions/AuctionActions'

const defaultAuctionState = {
    auctionCollection : [],
    expandedAuctionIdList : []
}

function auctions(state = defaultAuctionState, action) {
    switch (action.type) {
        case CREATE_AUCTION_SUCCESS:
            console.log('create success');
            // TODO: clear form
            return state;
        case LOAD_AUCTION:
            return Object.assign({}, state, {
                auctionCollection: [
                    ...state.auctionCollection,
                    action.auction
                ]
            });
        case PLACE_BID:
            console.log('place bid reducer', action);
            return state;
        case CLEAR_AUCTION_DETAIL:
        case TOGGLE_AUCTION_DETAIL:

            // console.log('TOGGLE_AUCTION_DETAIL')
            if ( state.expandedAuctionIdList.includes(action.auctionId) ) {

                state.expandedAuctionIdList.splice(
                    state.expandedAuctionIdList.findIndex( element => element === action.auctionId ), 1
                )

                return Object.assign({}, state, {
                    expandedAuctionIdList: [...state.expandedAuctionIdList]
                });

            } else {

                return Object.assign({}, state, {
                    expandedAuctionIdList: [
                        ...state.expandedAuctionIdList,
                        action.auctionId
                    ]
                });
            }

        default:
            return state
    }
}

export default auctions