db.getCollection('users').createIndex(
  { pseudo: 1 },
  { unique: true }
);
