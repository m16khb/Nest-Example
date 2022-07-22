import { Schema } from 'dynamoose';

export const ServiceApplicaionSchema = new Schema({
  id: {
    type: String,
    hashKey: true,
  },
  CEOName: {
    type: String,
  },
  idImage: {
    type: String,
  },
});
