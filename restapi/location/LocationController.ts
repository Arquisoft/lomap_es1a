

import { Request, Response } from 'express';
const Location = require("./LocationModel");

export async function createLocation(req:Request, res:Response): Promise<void>{
  try{
    const { name, category, longitud, latitud} = req.body;

    const location = new Location({
      name,
      longitud,
      latitud,
      category
    });
    await location.save();
    res.status(201).json({message: 'LocationCreated', location});
    console.log("Location created: ", location);
  }catch (err) {
    console.error(err);
    console.log(req.body);
    res.status(500).json({ message: 'error error' });
  }
}

export async function getAllLocations(req: Request, res: Response, next: any) {

  try {
    const allLocations = await Location.find({ });
    res.send({ status: "Ok", data: allLocations });
  } catch (error: any) {
    console.log(error);
    res.status(500).send("Error al obtener las ubicaciones");
  }
}

export async function getLocationById(req: Request, res:Response) {
  let id = req.params.id
  try {
    const allLocations = await Location.findById(id);
    res.send({ status: "Ok", dir: id, data: allLocations });
  } catch (error: any) {
    console.log(error);
    res.status(500).send("Error al obtener las ubicaciones");
  }
}

export async function getMonuments(req: Request, res:Response) {
  
  try {
    const monuments = await Location.find({ category: "monuments"}).exec();
    res.send({ status: "Ok", data: monuments });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al obtener los monumentos");
  }

}

export async function getRestaurants(req: Request, res:Response) {
  
  try {
    const restaurants = await Location.find({ category: "restaurant"}).exec();
    res.send({ status: "Ok", data: restaurants });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al obtener los monumentos");
  }

}


export async function getShops(req: Request, res:Response) {
  
  try {
    const shops = await Location.find({ category: "shop"}).exec();
    res.send({ status: "Ok", data: shops });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al obtener los monumentos");
  }

}

export async function getOthers(req: Request, res:Response) {
  
  try {
    const others = await Location.find({ category: "other"}).exec();
    res.send({ status: "Ok", data: others });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al obtener los monumentos");
  }

}


