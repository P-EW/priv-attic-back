/**
 * This script is to insert initial data inside the collection Compte of the database priv_attic
 * You can use it with mongo-shell or a tool like Robo3T
 */
db.getCollection('users').insertMany([
  {
    image: 'https://randomuser.me/portraits/women/59.jpg',
    pseudo: 'Ziak',
    firstname: 'Hugo',
    lastname: 'ambrozik',
    email: 'hugoambrozik.1@gmail.com',
    birthDate: ISODate('1998-01-26T23:00:00.000Z'),
    phone: '0658856352',
    isPrivate: false,
    motto: [
      {
        title: 'Le jour de ma rencontre avec X',
        contents: "c'etait une journée d'hiver 2010, c'est super cool",
      },
      {
        title: 'Victoire 2018',
        contents:
          "on c'etait retrouvé avec mes amis pour voir la finale de la coupe du monde, ce fut un moment très marquant dans ma vie",
      },
    ],
  },
  {
    image: 'https://randomuser.me/portraits/women/59.jpg',
    pseudo: 'P-EW',
    firstname: 'Paul-Emille',
    lastname: 'Watelot',
    email: 'PE.1@gmail.com',
    birthDate: ISODate('1996-03-05T23:00:00.000Z'),
    phone: '0649936792',
    isPrivate: true,
    motto: [
      {
        title: 'Mon petit grenier secret',
        contents: "c'est la où je joue au jeu video, c'est mon endroit à moi",
      },
    ],
  },
]);

db.getCollection('posts').insertMany([
  {
    publisher: 'P-EW',
    textContent: 'Bonsoir',
    mediaContent:
      'https://cdn.discordapp.com/attachments/909012057159008256/912497910724329542/unknown.png',
    date: ISODate('2021-11-26T17:00:00.000Z'),
    categories: ['Photo', 'Test'],
  },
  {
    publisher: 'Ziak',
    textContent: 'voici une très jolie photo de mon chat',
    mediaContent:
      'https://cdn.discordapp.com/attachments/909012057159008256/912487452273414175/unknown.png',
    date: ISODate('2021-11-26T18:00:00.000Z'),
    categories: ['Photo', 'Chat'],
  },
]);





// Create an array with publisher element
let posts = db
  .getCollection('posts')
  .find({})
  .map(function (element) {
    return {
      _id: element._id,
      publisher: element.publisher,
    };
  });

let users = db
  .getCollection('users')
  .find({})
  .map(function (element) {
    return {
      _id: element._id,
      pseudo: element.pseudo,
    };
  });

// For each element of the array ...
posts.forEach(function (element) {
  // ... check if we have a publisher
  if (!!element.publisher) {
    // try to get the related manager element inside the array
    let publisher = users.find(function (elt) {
      return elt.pseudo.toLowerCase() === element.publisher.toLowerCase();
    });

    // check if we found one
    if (!!publisher) {
      // update the post with the publisherId
      db.getCollection('posts').updateOne(
        { _id: element._id },
        { $set: { publisherId: publisher._id } }
      );
      // remove the publisher field
      db.getCollection('posts').updateOne(
        { _id: element._id },
        { $unset: { publisher } }
      );
    }
  }
});
