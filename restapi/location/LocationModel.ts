import mongoose, { Document, Schema} from 'mongoose'

interface Location extends Document {
    id: mongoose.Types.ObjectId;
    longitud: number;
    latitud: number;
    category: string;
    comments: string;
}

const locationSchema: Schema = new Schema({
  _id: { type: mongoose.Types.ObjectId, default: mongoose.Types.ObjectId },
  longitud: {
    type: String,
    required: true
  },
  latitud: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  comments: {
    type: String,
    required: true
  }
});

const Location = mongoose.model<Location>('Location', locationSchema);

export default Location;


  