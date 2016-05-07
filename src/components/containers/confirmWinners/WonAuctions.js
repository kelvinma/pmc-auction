// Libraries
import React, { Component } from 'react'


// MATERIAL UI!!!
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

import Divider from 'material-ui/lib/divider';
import CommunicationCall from 'material-ui/lib/svg-icons/communication/call';
import CommunicationChatBubble from 'material-ui/lib/svg-icons/communication/chat-bubble';
import { amber400 } from 'material-ui/lib/styles/colors';
import CommunicationEmail from 'material-ui/lib/svg-icons/communication/email';

// Styles
// import './ConfirmWinners.scss';
// Application Components

class WonAuctions extends Component {

    constructor(props) {
        super(props);
    }

    emailOwner(emailAddress) {
        var win = window.open('mailto:'+emailAddress+'?Subject=Happiness%20Exchange%20Winners!', '_top');
    }

    render () {

        const style = {
            icon: {
                fill: amber400
            }
        }

        let wonList = this.props.auctions.map( (auction) => {

            let auctionOwner = auction.auctionOwner || {};

            let winningBid = auction.winningBids.find( winningBid => {
                return winningBid.bidderObj.uid === auctionOwner.uid;
            });

            if (winningBid) {
                let bidder = winningBid.bidderObj;
                return (
                    <List key={auction.id}>
                      <ListItem
                        key={bidder.email + bidder.uid}
                        leftIcon={<CommunicationEmail style={style.icon} />}
                        onTouchTap={() => {
                            this.emailOwner( auctionOwner.email )
                        }}
                        primaryText={
                            'You won ' +
                            auction.title +
                            ' with ' +
                            auctionOwner.name +
                            ' for $' + winningBid.bidAmount
                        }
                        secondaryText={
                            'Contact them at ' + auctionOwner.email
                        }
                      />
                    </List>
                );
            } else {
                return '';
            }

        });

                // <h3>Confirmed Auctions</h3>
        return (
            <div>
                {wonList}
            </div>
        )
    }

}

export default WonAuctions