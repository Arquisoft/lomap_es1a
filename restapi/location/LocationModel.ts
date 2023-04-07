import mongoose, { Document, Schema, model} from 'mongoose'


const locationSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
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

module.exports = model('locations', locationSchema);

  