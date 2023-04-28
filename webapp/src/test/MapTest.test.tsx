import React from 'react';
import { render, screen } from '@testing-library/react';
import Map from '../components/Map';

describe('Map', () => {
  test('renders with correct props', () => {
    const lng = 2.1234;
    const lat = 48.5678;
    const zoom = 10;
    const mapWidth = '100%';
    const mapHeight = '400px';
    const mapTheme = 'light';
    render(
      <Map
        lng={lng}
        lat={lat}
        zoom={zoom}
        mapWidth={mapWidth}
        mapHeight={mapHeight}
        mapTheme={mapTheme}
      />
    );
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });

  

});