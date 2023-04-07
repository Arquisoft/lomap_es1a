import { Await } from "react-router-dom";
import Location from "./LocationModel";

import { Request, Response } from 'express';
import { json } from "body-parser";


export async function createLocation(req:Request, res:Response): Promise<void>{
  try{
    const { _id, longitud, latitud, category, pod_id, isPublic, sharedUsers} = req.body;

    const location = new Location({
      _id,
      longitud,
      latitud,
      category,
      pod_id,
      isPublic,
      sharedUsers
    });
    await location.save();
    res.status(201).json({message: 'LocationCreated', location});
  }catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
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

  