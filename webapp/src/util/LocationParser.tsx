import { JSONArray } from "puppeteer";
import React from "react";

export function requestToList(locations: any) {
    let result = '{ "type": "FeatureCollection", "features": [';

    let l = JSON.stringify(locations.data)
    let parsed = JSON.parse(l)
    //console.log ("Transformación del json");
    for (let i = 0; i < parsed.length; i++) {
        //console.log ("parsed[i]", parsed[i]);
        result += '{'
        result += '"type": "Feature",'
        result += '"properties": {'
        result += '"icon": "' + parsed[i].category + '-icon",'
        result += '"id": "' + parsed[i]._id + '"'
        result += '},'
        result += '"geometry": {'
        result += '"type": "Point",'
        result += '"coordinates": ["' + parsed[i].longitud + '", "' + parsed[i].latitud + '"]'
        
        if (i == parsed.length - 1)
            result += '}}'
        else 
            result += '}},'
    }
    
    result += '] }';

    return result;
}