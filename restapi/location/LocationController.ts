import { Await } from "react-router-dom";
import { LocationModel } from "./LocationModel";

export class LocationController {
    
    private static locations: LocationModel[] = [];


    static createLocation(name: string, category: string, comments:string): LocationModel {
      const location = new LocationModel(name, category, comments);
      this.locations.push(location);
      return location;
    }
  
    static getLocations(): LocationModel[] {
      return this.locations;
    }
  }
  