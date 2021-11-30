db.getCollection('users').createIndex(
  { pseudo: 1 },
  { collation :{ locale : "en" , strength : 2 },
    unique: true
  }
);

db.getCollection('likes').createIndex(
  { postId: 1,authorId:1 },
  { unique: true }
);