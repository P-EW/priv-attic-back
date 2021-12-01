/**
 * This script is to insert initial data inside the collection Compte of the database priv_attic
 * You can use it with mongo-shell or a tool like Robo3T
 */
db.createCollection('users');
db.createCollection('comments');
db.createCollection('likes');
db.createCollection('posts');


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