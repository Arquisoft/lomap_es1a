

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

export async function getShops(req: Request, res:Response) {
  try{
    const locations = await Location.find({category: "shop"}).exec();
    res.send({ status: "Ok", data: locations });
  } catch (error: any) {
    console.log(error);
    res.status(500).send("Error al obtener las tiendas");
  }
}

export async function getRestaurants(req: Request, res:Response) {
  try{
    const locations = await Location.find({category: "restaurant"}).exec();
    res.send({ status: "Ok", data: locations });
  } catch (error: any) {
    console.log(error);
    res.status(500).send("Error al obtener los restaurantes");
  }
}

export async function getMonuments(req: Request, res:Response) {
  try{
    const locations = await Location.find({category: "monument"}).exec();
    res.send({ status: "Ok", data: locations });
  } catch (error: any) {
    console.log(error);
    res.status(500).send("Error al obtener los monumentos");
  }
}

export async function getOther(req: Request, res:Response) {
  try{
    const locations = await Location.find({category: "other"}).exec();
    res.send({ status: "Ok", data: locations });
  } catch (error: any) {
    console.log(error);
    res.status(500).send("Error al obtener otros");
  }
}
