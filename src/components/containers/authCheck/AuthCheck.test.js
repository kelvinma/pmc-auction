import React from 'react';
import { mount } from 'enzyme';
import AuthCheck from './AuthCheck';

describe('AuthCheck', () => {
  it('should render without error', () => {
    const wrapper = shallow(<AuthCheck/>);

    expect(wrapper).toBe.ok;
  })
})
