import React from 'react';
import { shallow, configure } from 'enzyme';
import Map from '../components/Map';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({adapter: new Adapter()});

describe('Map component', () => {
  it('renders the map container', () => {
    const wrapper = shallow(<Map lng={-0.118092} lat={51.509865} zoom={12} mapWidth="100%" mapHeight="400px" mapTheme="light-v10" />);
    expect(wrapper.find('.mapboxgl-canvas-container').exists()).toBe(true);
  });
});
