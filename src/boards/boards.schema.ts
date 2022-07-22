import { Schema } from 'dynamoose';

export const BoardsSchema = new Schema({
  bid: {
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
