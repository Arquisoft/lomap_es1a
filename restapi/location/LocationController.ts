

import { Request, Response } from 'express';
const Location = require("./LocationModel");


export async function createLocation(req:Request, res:Response): Promise<void>{
  try{
    const {  longitud,name, latitud, category, comments} = req.body;

    const location = new Location({
      name,
      longitud,
      latitud,
      category,
      comments
    });
    await location.save();
    res.status(201).json({message: 'LocationCreated', location});
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

  