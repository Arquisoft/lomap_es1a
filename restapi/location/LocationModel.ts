import mongoose, { Document, Schema} from 'mongoose'


interface Location extends Document {
    id: mongoose.Types.ObjectId;
    longitud: Int16Array;
    latitud: Int16Array;
    category: string;
    pod_id: mongoose.Types.ObjectId;
    isPublic:boolean;
    sharedUsers: mongoose.Types.ObjectId[];
}


const locationSchema: Schema = new Schema({
  _id: { type: mongoose.Types.ObjectId, default: mongoose.Types.ObjectId },
  longitud: {
    type: Int16Array,
    required:true
  },
  latitud: {
    type: Int16Array,
    required:true
  },
  category: {
    type: String,
    required: true
  },
  pod_id: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  isPublic: {
    type: Boolean,
    required: true
  },
  sharedUsers:{
    type: [mongoose.Types.ObjectId],
    required:true
  }
});

const Location = mongoose.model<Location>('Location', locationSchema);

export default Location;


  