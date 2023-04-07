import User from "./UserModel";

import { Request, Response } from "express";

export async function createUser(req: Request, res:Response): Promise<void> {
    try{
        const { pod_id} = req.body;
    
        const user = new User({
          pod_id
        });
        await user.save();
        res.status(201).json({message: 'LocationCreated', location});
      }catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
    
}

export async function getUserByPodId(req: Request, res: Response){
    const { pod_id } = req.params;
  
    try {
      const locations = await User.find({ pod_id });
      res.json(locations);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al obtener las ubicaciones");
    }
  };