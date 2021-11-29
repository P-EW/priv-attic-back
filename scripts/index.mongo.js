db.getCollection('users').createIndex(
  { pseudo: 1 },
  { unique: true }
);

db.getCollection('likes').createIndex(
  { postId: 1,authorId:1 },
  { unique: true }
);