import mongoose, { Document, Schema} from "mongoose";

interface User extends Document{
  pod_id: String
}

const userSchema: Schema = new Schema({
  pod_id:{
    type: String, 
    required: true
  }
});

const User = mongoose.model<User>('User', userSchema);

export default User