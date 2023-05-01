import React from 'react';
import Map from '../components/Map';
import { render, fireEvent } from '@testing-library/react';
import ReactDOM from 'react-dom';

describe('Map component', () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render(<Map lng={4.34878} lat={50.85045} zoom={10} mapWidth='100%' mapHeight='100%' mapTheme="light"/>,container)
  })

  afterEach(() =>{
    document.body.removeChild(container);
    container.remove();
  }
  )

  it('renders without crashing', () => {
    const m = container.querySelector("#mapboxgl-canvas")
    expect(m).toBeInTheDocument();
  });
});
