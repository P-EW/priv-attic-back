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

// display the final initial data
db.getCollection('users').find({});
