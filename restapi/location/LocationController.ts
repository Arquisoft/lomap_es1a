import { Await } from "react-router-dom";
import { LocationModel } from "./LocationModel";

import { Request, Response } from 'express';
import { json } from "body-parser";

interface Location{
  name:string;
  category:string;
  comments:string
}

const locations: Location[] = [];

export function createLocation(req:Request, res:Response):void{

  const location = req.body;

  const locationToAdd = {name: req.body.name, category:req.body.category, comments:req.body.comments}

  location.push(locationToAdd);
}

  