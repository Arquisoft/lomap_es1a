interface LocationData {
    id: number;
    longitude: number;
    latitude: number;
    category: string;
  }  

export class LocationModel {
    private name:string
    private category: string;
    private comments:string;

    constructor(name:string, category: string, comments:string) {
      this.name = name;
      this.category = category;
      this.comments = comments;
    }
  
  }
  