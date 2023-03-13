interface LocationData {
    id: number;
    longitude: number;
    latitude: number;
    category: string;
  }  

class LocationModel {
    private id: number;
    private longitude: number;
    private latitude: number;
    private category: string;
  
    constructor(id: number, longitude: number, latitude: number, category: string) {
      this.id = id;
      this.longitude = longitude;
      this.latitude = latitude;
      this.category = category;
    }
  
    public getId(): number {
      return this.id;
    }
  
    public setId(id: number): void {
      this.id = id;
    }
  
    public getLongitude(): number {
      return this.longitude;
    }
  
    public setLongitude(longitude: number): void {
      this.longitude = longitude;
    }
  
    public getLatitude(): number {
      return this.latitude;
    }
  
    public setLatitude(latitude: number): void {
      this.latitude = latitude;
    }
  
    public getCategory(): string {
      return this.category;
    }
  
    public setCategory(category: string): void {
      this.category = category;
    }
  }
  