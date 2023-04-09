import { JSONArray } from "puppeteer";
import React from "react";

export function requestToList(locations: any) {
    let result = '{ "type": "FeatureCollection", "features": [';

    let l = JSON.stringify(locations.data)
    let parsed = JSON.parse(l)

    for (let i = 0; i < parsed.length; i++) {
        result += '{'
        result += '"type": "Feature",'
        result += '"properties": {'
        result += '"icon": "' + parsed[i].category + '-icon"'
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