class LocationController {
    private locations: LocationModel[] = [];
  
    createLocation(id: number, longitude: number, latitude: number, category: string): LocationModel {
      const location = new LocationModel(id, longitude, latitude, category);
      this.locations.push(location);
      return location;
    }
  
    getLocations(): LocationModel[] {
      return this.locations;
    }
  }
  