import React from 'react';
import { mount } from 'enzyme';
import {HomePage} from './HomePage';
import { getImageForEnv } from '../../../images/index'

describe('auctionForm', () => {
  it('renders without error', () => {
    getImageForEnv = jest.fn();
    const wrapper = mount(<HomePage/>);

    expect(wrapper).toBe.ok;
    expect(getImageForEnv).toHaveBeenCalledWith('he-lockup.png')
  })
});
