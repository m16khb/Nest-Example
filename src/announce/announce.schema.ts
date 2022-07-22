import { Schema } from 'dynamoose';

export const AnnouncesSchema = new Schema({
  aid: {
    type: String,
    hashKey: true,
  },
  title: {
    type: String,
    index: {
      name: 'title-index',
      global: true,
    },
  },
  content: {
    type: String,
    index: {
      name: 'content-index',
      global: true,
    },
  },
});
