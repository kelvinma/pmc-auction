import users, {defaultAuctionState} from './UserReducers';

describe('user reducer', () => {
  it('should return default state', () => {
      expect(users(defaultAuctionState, {})).toEqual(defaultAuctionState);
    });
})
