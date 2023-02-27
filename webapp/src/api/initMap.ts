import { Map } from 'mapbox-gl';


export const initMap = (container: HTMLDivElement, coords: [number, number]) => {
    
    const map = new Map({
        container,
        style: 'mapbox://styles/mapbox/dark-v10',
        pitchWithRotate: false,
        center: coords,
        zoom: 15,
        accessToken: "pk.eyJ1IjoidW8yNjQ1NzgiLCJhIjoiY2xlbTZvbXFyMTJqNzNucGdwem9wY3JxeCJ9.okXxTcASFep9BCpiqduY2Q",
        doubleClickZoom: false
    });
    return map
}