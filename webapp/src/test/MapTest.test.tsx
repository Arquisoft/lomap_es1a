import React from 'react';
import Map from '../components/Map';
import ReactDOM from 'react-dom';

describe('Map component', () => {
  const mockProps = {
    lng: -73.935242,
    lat: 40.73061,
    zoom: 10,
    mapWidth: '100%',
    mapHeight: '500px',
    mapTheme: 'light',
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Map {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('sets up the map correctly', () => {
    const map = new Map(mockProps);
    expect(map.map).not.toBeNull();
    expect(map.mapMarkers).toHaveLength(0);
  });

});
