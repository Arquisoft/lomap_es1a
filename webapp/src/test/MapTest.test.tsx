import React, {Component} from 'react';
import Map from '../components/Map';
import Enzyme, {shallow, mount} from "enzyme"
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({adapter: new Adapter()});

test("DefineMap", ()=>{
    expect(Map).toBeDefined();
});

test("RenderMap", ()=>{
  const temp = shallow(<Map lng={4.34878} lat={50.85045} zoom={10} mapWidth='100%' mapHeight='100%' mapTheme='light'/>);
  expect(temp).toMatchSnapshot();
});