

import { Request, Response } from 'express';
const Location = require("./LocationModel");


export async function createLocation(req:Request, res:Response): Promise<void>{
  try{
    const { name, category, comments, longitud, latitud} = req.body;

    const location = new Location({
      name,
      longitud,
      latitud,
      category,
      comments
    });
    await location.save();
    res.status(201).json({message: 'LocationCreated', location});
    console.log("Locations Created");
  }catch (err) {
    console.error(err);
    console.log(req.body);
    res.status(500).json({ message: 'error error' });
  }
}

export async function getLocationsByPodId(req: Request, res: Response) {
  const { pod_id } = req.params;

  try {
    const locations = await Location.find({ pod_id });
    res.json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener las ubicaciones");
  }
};

export async function getAllLocations(req: Request, res: Response, next: any) {
  try {
    const allLocations = await Location.find({});
    res.send({ status: "Ok", data: allLocations });
  } catch (error: any) {
    console.log(error);
  }
}
  