import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

export default class DialogExampleModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };
  
  handleSubmit = () => {
    this.setState({open: false});
    this.props.confirmWinnersSubmit()
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Confirm"
        primary={true}
        onTouchTap={this.handleSubmit}
      />,
    ];
        
    var awesomeBidListOfGreatness = [];
    var a = awesomeBidListOfGreatness;
    this.props.auctions.forEach( (auction, index) => {
        a.push(<div key={index}>{auction.title}</div>)
        Object.keys(auction.bids).forEach( (bid, bidIndex) => {
            if (auction.bids[bid].checked) {
                a.push(<div key={bidIndex}>${auction.bids[bid].bidAmount} {auction.bids[bid].bidderObj.name}</div>)
            }
        })
    })
    
    

    return (
      <div>
        <RaisedButton
            label="Confirm"
            primary={true}
            onTouchTap={this.handleOpen}
        />
        <Dialog
          title="Confirm Auction Winners"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
            <p>Are you sure you want to confirm the following auction winners?  Once confirmed you will
            not be able to change the confirmation.</p>
            
            {awesomeBidListOfGreatness}
            
        </Dialog>
      </div>
    );
  }
}