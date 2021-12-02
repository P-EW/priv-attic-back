/**
 * This script is to insert initial data inside the collection Compte of the database priv_attic
 * You can use it with mongo-shell or a tool like Robo3T
 */
db.createCollection('users');
db.createCollection('comments');
db.createCollection('likes');
db.createCollection('posts');



/**
 * This script is to insert initial data inside the collection Compte of the database priv_attic
 * You can use it with mongo-shell or a tool like Robo3T
 */
db.getCollection('users').insertMany([
  /* 1 */
  {
    "_id" : ObjectId("61a7f676a3a1f96bff947c41"),
    "password" : "$2b$10$GQAvXGJ0NcmIXVo9je/IC.VlxtuUa4/WHQPQFrWjJ2lnjzt/I7ONW",
    "phone" : "+33777777777",
    "isPrivate" : false,
    "birthDate" : ISODate("1996-03-04T23:00:00.000Z"),
    "email" : "test@test.com",
    "lastname" : "Watelot",
    "firstname" : "Paul-Emile",
    "pseudo" : "Peheu",
    "motto" : "I love coding ! 💻",
    "image" : "fa6140d2-bbf7-4231-b5aa-81118d265690.png"
  },

  /* 2 */
  {
    "_id" : ObjectId("61a7fb20a3a1f96bff947c6e"),
    "password" : "$2b$10$wJzRzxV.skn3lU0hTZd1P.kgPYAP146xoNUSiMT6/fZp7/ag25N0W",
    "phone" : "+33666666666",
    "isPrivate" : false,
    "birthDate" : ISODate("2021-11-30T23:00:00.000Z"),
    "email" : "test@test.com",
    "lastname" : "Etchebest",
    "firstname" : "Philippe",
    "pseudo" : "Etchebest",
    "motto" : "La cuisine c'est sacré !",
    "image" : "b3d8bef0-ad14-44e7-9b93-b7ff721e22d9.png"
  },

  /* 3 */
  {
    "_id" : ObjectId("61a7fd6aa3a1f96bff947ccc"),
    "password" : "$2b$10$g9xkwf/UwVtoRDv9Md4e0uWfUtXy5PBFYW2RXwYG75BCTrX/AFo0u",
    "phone" : "+33666666666",
    "isPrivate" : true,
    "birthDate" : ISODate("2021-10-31T23:00:00.000Z"),
    "email" : "test@test.com",
    "lastname" : "Anonymous",
    "firstname" : "Jean",
    "pseudo" : "Anon123",
    "motto" : "👀",
    "image" : "e88b6389-3c4d-4289-9cfe-6705ec04dd1a.jpg"
  },

  /* 4 */
  {
    "_id" : ObjectId("61a7ff80a3a1f96bff947d19"),
    "password" : "$2b$10$f5sD8TH5hybDh0sdwlLMM.8ZHTTk5HhDX1dC8s/lh1WVvvh/kivyy",
    "phone" : "+33777777777",
    "isPrivate" : false,
    "birthDate" : ISODate("2021-11-30T23:00:00.000Z"),
    "email" : "test@test.com",
    "lastname" : "Troll",
    "firstname" : "Jean",
    "pseudo" : "TopMemer",
    "motto" : null,
    "image" : "915c52d5-7af7-460d-befa-0d7219c59ed6.jpg"
  },

  /* 5 */
  {
    "_id" : ObjectId("61a802cfa3a1f96bff947dc8"),
    "password" : "$2b$10$5228/3.N/FzwkfY080qYsu0Ubi.gdzeaLfRIaBmUuDHJ87iADUhuq",
    "phone" : "+33777777777",
    "isPrivate" : false,
    "birthDate" : ISODate("2021-11-30T23:00:00.000Z"),
    "email" : "test@test.com",
    "lastname" : "Mulder",
    "firstname" : "Fox",
    "pseudo" : "Mulder",
    "motto" : "La vérité est ailleurs ! 👽",
    "image" : "f1cda394-f674-43a2-a931-75326317641c.png"
  },

  /* 6 */
  {
    "_id" : ObjectId("61a80469a3a1f96bff947e1f"),
    "password" : "$2b$10$inJGP9lzHEJBzM2nIRckQ.hMMPxGyVifHHewQhuaE9ph5gj0aTBZy",
    "phone" : "+33777777777",
    "isPrivate" : false,
    "birthDate" : ISODate("2021-12-14T23:00:00.000Z"),
    "email" : "test@test.fr",
    "lastname" : "Lover",
    "firstname" : "Cat",
    "pseudo" : "CatLover420",
    "motto" : "😻🐱‍👓🐱‍🐉🐱‍💻🐱‍🏍🐱‍👤🐱‍🚀🙀😿😾🐱🐈😸😹😺😽😼",
    "image" : "2c11a6ab-a2af-4242-af25-ae25e0c52912.jpg"
  },

  /* 7 */
  {
    "_id" : ObjectId("61a7fd8743928b8273a6b974"),
    "password" : "$2b$10$aEmx0WjRMBlhBxs910ZWUOQFuN0UOKSBVC98QbOvQ5C9gjUwwXjka",
    "phone" : "+33658856452",
    "isPrivate" : false,
    "birthDate" : ISODate("1998-01-25T23:00:00.000Z"),
    "email" : "hugoambrozik.1@gmail.com",
    "lastname" : "ambrozik",
    "firstname" : "hugo",
    "pseudo" : "ziak",
    "motto" : null,
    "image" : "ad48f244-bf56-4ac6-96b5-f0a687968c82.png"
  },

  /* 8 */
  {
    "_id" : ObjectId("61a7ff0943928b8273a6b998"),
    "password" : "$2b$10$N8ioMdAh6eNhm.PARFr2Fu2EhNfeXL3FY19DbJTJ6EwEDHNIgNqlO",
    "phone" : "+33605045632",
    "isPrivate" : false,
    "birthDate" : ISODate("1971-05-07T23:00:00.000Z"),
    "email" : "ant.a@gmail.com",
    "lastname" : "ambrozik",
    "firstname" : "anton",
    "pseudo" : "JohnRico",
    "motto" : null,
    "image" : "579f3bb2-3526-4f04-ad90-d38f35b33931.png"
  },

  /* 9 */
  {
    "_id" : ObjectId("61a8010043928b8273a6ba2d"),
    "password" : "$2b$10$w.mt/yPvomF/NgyEwAF2Iu7RCCwwOmfBd7AMHA6osKcCz3cmnfi7O",
    "phone" : "+33658856451",
    "isPrivate" : false,
    "birthDate" : ISODate("1993-07-20T22:00:00.000Z"),
    "email" : "hugoambrozik.1@gmail.com",
    "lastname" : "dupont",
    "firstname" : "clara",
    "pseudo" : "bakaboo",
    "motto" : "j'adore les petits chats ❤❤",
    "image" : "342fd2b0-5919-4b38-98c6-417b79b2e06c.jpg"
  },

  /* 10 */
  {
    "_id" : ObjectId("61a802c843928b8273a6baa6"),
    "password" : "$2b$10$iMoCKSkDOr4yg2J82BoCmeWV7MMWvoTgFAuJB.fG8D4P.gD2JGnWy",
    "phone" : "+33600000000",
    "isPrivate" : false,
    "birthDate" : ISODate("1997-07-23T22:00:00.000Z"),
    "email" : "pierre.p@hotmail.fr",
    "lastname" : "Petit",
    "firstname" : "pierre",
    "pseudo" : "piWind",
    "motto" : null,
    "image" : "0f4e2278-6594-439d-b031-1830183e9d46.png"
  }
]);

db.getCollection('posts').insertMany([
  /* 1 */
  {
    "_id" : ObjectId("61a7f7c1a3a1f96bff947c5b"),
    "publisherId" : ObjectId("61a7f676a3a1f96bff947c41"),
    "categories" : [
      "Coding",
      "Project",
      "Party",
      "NWT"
    ],
    "date" : ISODate("2021-12-01T22:31:29.268Z"),
    "textContent" : "Le projet de NWT est terminé !",
    "mediaContent" : "64bc7add-5c05-43ec-81d0-869d71a2593a.gif"
  },

  /* 2 */
  {
    "_id" : ObjectId("61a7fbcda3a1f96bff947c89"),
    "publisherId" : ObjectId("61a7fb20a3a1f96bff947c6e"),
    "categories" : [
      "Cooking",
      "Fire",
      "Kitchen",
      "Intern",
      "Fired",
      "Not Paid"
    ],
    "date" : ISODate("2021-12-01T22:48:45.489Z"),
    "textContent" : "Le nouveau stagiaire a encore mis le feu à la cuisine !",
    "mediaContent" : "64710175-9d33-4ace-959e-b86ccbf0504c.jpg"
  },

  /* 3 */
  {
    "_id" : ObjectId("61a7fcb2a3a1f96bff947c94"),
    "publisherId" : ObjectId("61a7fb20a3a1f96bff947c6e"),
    "categories" : [
      "Chrismas",
      "Cake",
      "Desert",
      "Photography"
    ],
    "date" : ISODate("2021-12-01T22:52:34.891Z"),
    "textContent" : "Décembre a déjà commencé !",
    "mediaContent" : "2af6d7fc-4204-4109-ba79-11a88725a329.jpg"
  },

  /* 4 */
  {
    "_id" : ObjectId("61a7fe9ba3a1f96bff947cf1"),
    "publisherId" : ObjectId("61a7fd6aa3a1f96bff947ccc"),
    "categories" : [
      "Hidden",
      "Spy"
    ],
    "date" : ISODate("2021-12-01T23:00:43.298Z"),
    "textContent" : "AHAHAH, Personne ne peut voir ce post !",
    "mediaContent" : "be0952a7-dee2-4196-b486-f97bc10fea72.gif"
  },

  /* 5 */
  {
    "_id" : ObjectId("61a800eca3a1f96bff947d35"),
    "publisherId" : ObjectId("61a7ff80a3a1f96bff947d19"),
    "categories" : [
      "Cat",
      "Gif",
      "Meme",
      "Lol"
    ],
    "date" : ISODate("2021-12-01T23:10:36.194Z"),
    "textContent" : "tro lol",
    "mediaContent" : "4745bcb1-5f59-42bd-bdd2-face1305e58d.gif"
  },

  /* 6 */
  {
    "_id" : ObjectId("61a80122a3a1f96bff947d45"),
    "publisherId" : ObjectId("61a7ff80a3a1f96bff947d19"),
    "categories" : [],
    "date" : ISODate("2021-12-01T23:11:30.127Z"),
    "textContent" : "tro vré",
    "mediaContent" : "99337fc6-51cf-4100-9b3c-6ad797adb996.jpg"
  },

  /* 7 */
  {
    "_id" : ObjectId("61a80255a3a1f96bff947d58"),
    "publisherId" : ObjectId("61a7ff80a3a1f96bff947d19"),
    "categories" : [
      "Meme",
      "Old",
      "Granny",
      "Computer",
      "Coding"
    ],
    "date" : ISODate("2021-12-01T23:16:37.633Z"),
    "textContent" : "c ma mere gran sa",
    "mediaContent" : "5b1ff70d-7b56-4013-93ff-70594c02b5f2.jpg"
  },

  /* 8 */
  {
    "_id" : ObjectId("61a803cca3a1f96bff947de6"),
    "publisherId" : ObjectId("61a802cfa3a1f96bff947dc8"),
    "categories" : [
      "Paranormal",
      "Alien",
      "Theory",
      "Conspiracy"
    ],
    "date" : ISODate("2021-12-01T23:22:52.694Z"),
    "textContent" : "The truth is out there !",
    "mediaContent" : "c303e169-9bda-4c1a-a745-323552a9c9ee.jpg"
  },

  /* 9 */
  {
    "_id" : ObjectId("61a80530a3a1f96bff947e6c"),
    "publisherId" : ObjectId("61a80469a3a1f96bff947e1f"),
    "categories" : [
      "Cat",
      "Cute",
      "Photography",
      "Food",
      "Desert"
    ],
    "date" : ISODate("2021-12-01T23:28:48.326Z"),
    "textContent" : "Miam !",
    "mediaContent" : "d1d64a81-f07f-47d5-b811-eac4c0bcdec4.jpg"
  },

  /* 10 */
  {
    "_id" : ObjectId("61a80573a3a1f96bff947e81"),
    "publisherId" : ObjectId("61a80469a3a1f96bff947e1f"),
    "categories" : [
      "Cat",
      "Photography",
      "Burger"
    ],
    "date" : ISODate("2021-12-01T23:29:55.722Z"),
    "textContent" : "Juste un croc tkt 🎩🎩",
    "mediaContent" : "78557a93-3df3-44f8-ba1a-afe607df25bc.jpg"
  },

  /* 11 */
  {
    "_id" : ObjectId("61a7fe0d43928b8273a6b989"),
    "publisherId" : ObjectId("61a7fd8743928b8273a6b974"),
    "categories" : [
      "foot",
      "league of champions"
    ],
    "date" : ISODate("2021-12-01T22:58:21.162Z"),
    "textContent" : "encore une super victoire de liverpool !! bravo l'équipe",
    "mediaContent" : "57801275-f1cd-43d9-9dc9-c3e9d1277100.jpg"
  },

  /* 12 */
  {
    "_id" : ObjectId("61a7ff6b43928b8273a6b9a7"),
    "publisherId" : ObjectId("61a7ff0943928b8273a6b998"),
    "categories" : [
      "movie",
      "interstellar"
    ],
    "date" : ISODate("2021-12-01T23:04:11.703Z"),
    "textContent" : "une vraie claque ce film ! je recommande !",
    "mediaContent" : "a259ed95-43ee-4f77-b9ec-c67201fc9811.png"
  },

  /* 13 */
  {
    "_id" : ObjectId("61a8009b43928b8273a6b9fa"),
    "publisherId" : ObjectId("61a7ff0943928b8273a6b998"),
    "categories" : [
      "star wars",
      "movie"
    ],
    "date" : ISODate("2021-12-01T23:09:15.499Z"),
    "textContent" : "le film de ma jeunesse !",
    "mediaContent" : "c73b0f41-39b1-4506-b07d-d7a8b34994eb.jpg"
  },

  /* 14 */
  {
    "_id" : ObjectId("61a801fc43928b8273a6ba59"),
    "publisherId" : ObjectId("61a8010043928b8273a6ba2d"),
    "categories" : [
      "cat",
      "cute"
    ],
    "date" : ISODate("2021-12-01T23:15:08.307Z"),
    "textContent" : "voici un photo de mon chat 😀",
    "mediaContent" : "1b2bb6cb-3918-4b1a-b147-1af839f257a9.jpg"
  },

  /* 15 */
  {
    "_id" : ObjectId("61a8024f43928b8273a6ba7c"),
    "publisherId" : ObjectId("61a7fd8743928b8273a6b974"),
    "categories" : [
      "foot",
      "liverpool",
      "chelsea",
      "win"
    ],
    "date" : ISODate("2021-12-01T23:16:31.182Z"),
    "textContent" : "une très belle victoire contre chelsea",
    "mediaContent" : "a9a24c6a-4be6-4841-bb57-1d6c182a8486.jpg"
  },

  /* 16 */
  {
    "_id" : ObjectId("61a8035143928b8273a6bac1"),
    "publisherId" : ObjectId("61a802c843928b8273a6baa6"),
    "categories" : [
      "movie",
      "meme"
    ],
    "date" : ISODate("2021-12-01T23:20:49.802Z"),
    "textContent" : "quand tu vois l'image d'un meme dans le  film Once Upon a Time… in Hollywood",
    "mediaContent" : "abc534a5-277a-49a5-80f9-16e272ac5609.jpg"
  },

  /* 17 */
  {
    "_id" : ObjectId("61a804bd43928b8273a6bb80"),
    "publisherId" : ObjectId("61a8010043928b8273a6ba2d"),
    "categories" : [
      "star wars",
      "cake"
    ],
    "date" : ISODate("2021-12-01T23:26:53.013Z"),
    "textContent" : "j'ai fait un super gateau pour ma copine 😚😋",
    "mediaContent" : "6b15ade3-3671-4d26-80f5-c94654910066.jpg"
  },

  /* 18 */
  {
    "_id" : ObjectId("61a8055f43928b8273a6bc86"),
    "publisherId" : ObjectId("61a7ff0943928b8273a6b998"),
    "categories" : [
      "movie"
    ],
    "date" : ISODate("2021-12-01T23:29:35.847Z"),
    "textContent" : "surement un des heros préféré quand j'etais ado ! Johnny Rico !",
    "mediaContent" : "25c1017c-9ca5-4418-a61e-8d6782daa30d.jpg"
  },

  /* 19 */
  {
    "_id" : ObjectId("61a805c643928b8273a6bcb6"),
    "publisherId" : ObjectId("61a7ff0943928b8273a6b998"),
    "categories" : [
      "movie"
    ],
    "date" : ISODate("2021-12-01T23:31:18.777Z"),
    "textContent" : "un film à me conseiller  ? histoire de passer une bonne soirée en cette soirée de froid (┬┬﹏┬┬)"
  }
]);

db.getCollection('likes').insertMany([
  /* 1 */
  {
    "_id" : ObjectId("61a7fcbba3a1f96bff947cb0"),
    "authorId" : ObjectId("61a7fb20a3a1f96bff947c6e"),
    "postId" : ObjectId("61a7f7c1a3a1f96bff947c5b")
  },

  /* 2 */
  {
    "_id" : ObjectId("61a7fce8a3a1f96bff947cc0"),
    "authorId" : ObjectId("61a7fb20a3a1f96bff947c6e"),
    "postId" : ObjectId("61a7fcb2a3a1f96bff947c94")
  },

  /* 3 */
  {
    "_id" : ObjectId("61a7fceda3a1f96bff947cc2"),
    "authorId" : ObjectId("61a7fb20a3a1f96bff947c6e"),
    "postId" : ObjectId("61a7fbcda3a1f96bff947c89")
  },

  /* 4 */
  {
    "_id" : ObjectId("61a7feb7a3a1f96bff947d09"),
    "authorId" : ObjectId("61a7fd6aa3a1f96bff947ccc"),
    "postId" : ObjectId("61a7fcb2a3a1f96bff947c94")
  },

  /* 5 */
  {
    "_id" : ObjectId("61a7fed1a3a1f96bff947d0f"),
    "authorId" : ObjectId("61a7fd6aa3a1f96bff947ccc"),
    "postId" : ObjectId("61a7f7c1a3a1f96bff947c5b")
  },

  /* 6 */
  {
    "_id" : ObjectId("61a8008fa3a1f96bff947d26"),
    "authorId" : ObjectId("61a7ff80a3a1f96bff947d19"),
    "postId" : ObjectId("61a7f7c1a3a1f96bff947c5b")
  },

  /* 7 */
  {
    "_id" : ObjectId("61a803f4a3a1f96bff947e07"),
    "authorId" : ObjectId("61a802cfa3a1f96bff947dc8"),
    "postId" : ObjectId("61a800eca3a1f96bff947d35")
  },

  /* 8 */
  {
    "_id" : ObjectId("61a8040ea3a1f96bff947e0d"),
    "authorId" : ObjectId("61a802cfa3a1f96bff947dc8"),
    "postId" : ObjectId("61a7f7c1a3a1f96bff947c5b")
  },

  /* 9 */
  {
    "_id" : ObjectId("61a8047ba3a1f96bff947e38"),
    "authorId" : ObjectId("61a80469a3a1f96bff947e1f"),
    "postId" : ObjectId("61a800eca3a1f96bff947d35")
  },

  /* 10 */
  {
    "_id" : ObjectId("61a8047ea3a1f96bff947e3a"),
    "authorId" : ObjectId("61a80469a3a1f96bff947e1f"),
    "postId" : ObjectId("61a7f7c1a3a1f96bff947c5b")
  },

  /* 11 */
  {
    "_id" : ObjectId("61a805d7a3a1f96bff947ef4"),
    "authorId" : ObjectId("61a7f676a3a1f96bff947c41"),
    "postId" : ObjectId("61a80573a3a1f96bff947e81")
  },

  /* 12 */
  {
    "_id" : ObjectId("61a805dca3a1f96bff947ef6"),
    "authorId" : ObjectId("61a7f676a3a1f96bff947c41"),
    "postId" : ObjectId("61a803cca3a1f96bff947de6")
  },

  /* 13 */
  {
    "_id" : ObjectId("61a805e2a3a1f96bff947ef8"),
    "authorId" : ObjectId("61a7f676a3a1f96bff947c41"),
    "postId" : ObjectId("61a800eca3a1f96bff947d35")
  },

  /* 14 */
  {
    "_id" : ObjectId("61a805e6a3a1f96bff947efa"),
    "authorId" : ObjectId("61a7f676a3a1f96bff947c41"),
    "postId" : ObjectId("61a7fbcda3a1f96bff947c89")
  },

  /* 15 */
  {
    "_id" : ObjectId("61a7ff7343928b8273a6b9b9"),
    "authorId" : ObjectId("61a7ff0943928b8273a6b998"),
    "postId" : ObjectId("61a7fe0d43928b8273a6b989")
  },

  /* 16 */
  {
    "_id" : ObjectId("61a8035a43928b8273a6badf"),
    "authorId" : ObjectId("61a802c843928b8273a6baa6"),
    "postId" : ObjectId("61a8024f43928b8273a6ba7c")
  },

  /* 17 */
  {
    "_id" : ObjectId("61a8035d43928b8273a6bae1"),
    "authorId" : ObjectId("61a802c843928b8273a6baa6"),
    "postId" : ObjectId("61a8009b43928b8273a6b9fa")
  },

  /* 18 */
  {
    "_id" : ObjectId("61a8035e43928b8273a6bae3"),
    "authorId" : ObjectId("61a802c843928b8273a6baa6"),
    "postId" : ObjectId("61a7ff6b43928b8273a6b9a7")
  },

  /* 19 */
  {
    "_id" : ObjectId("61a8036043928b8273a6bae5"),
    "authorId" : ObjectId("61a802c843928b8273a6baa6"),
    "postId" : ObjectId("61a7fe0d43928b8273a6b989")
  },

  /* 20 */
  {
    "_id" : ObjectId("61a803cf43928b8273a6bb60"),
    "authorId" : ObjectId("61a8010043928b8273a6ba2d"),
    "postId" : ObjectId("61a8009b43928b8273a6b9fa")
  },

  /* 21 */
  {
    "_id" : ObjectId("61a803d143928b8273a6bb62"),
    "authorId" : ObjectId("61a8010043928b8273a6ba2d"),
    "postId" : ObjectId("61a8024f43928b8273a6ba7c")
  },

  /* 22 */
  {
    "_id" : ObjectId("61a804e143928b8273a6bc0e"),
    "authorId" : ObjectId("61a8010043928b8273a6ba2d"),
    "postId" : ObjectId("61a8035143928b8273a6bac1")
  },

  /* 23 */
  {
    "_id" : ObjectId("61a8064843928b8273a6bd44"),
    "authorId" : ObjectId("61a7fd8743928b8273a6b974"),
    "postId" : ObjectId("61a8055f43928b8273a6bc86")
  },

  /* 24 */
  {
    "_id" : ObjectId("61a8064a43928b8273a6bd46"),
    "authorId" : ObjectId("61a7fd8743928b8273a6b974"),
    "postId" : ObjectId("61a805c643928b8273a6bcb6")
  },

  /* 25 */
  {
    "_id" : ObjectId("61a8067443928b8273a6bd81"),
    "authorId" : ObjectId("61a802c843928b8273a6baa6"),
    "postId" : ObjectId("61a805c643928b8273a6bcb6")
  },

  /* 26 */
  {
    "_id" : ObjectId("61a8068143928b8273a6bdb4"),
    "authorId" : ObjectId("61a8010043928b8273a6ba2d"),
    "postId" : ObjectId("61a805c643928b8273a6bcb6")
  }
])

db.getCollection('comments').insertMany([
  /* 1 */
  {
    "_id" : ObjectId("61a7fcdda3a1f96bff947cb3"),
    "date" : ISODate("2021-12-01T22:53:17.505Z"),
    "content" : "ça se mange ? 🔪",
    "authorId" : ObjectId("61a7fb20a3a1f96bff947c6e"),
    "postId" : ObjectId("61a7f7c1a3a1f96bff947c5b")
  },

  /* 2 */
  {
    "_id" : ObjectId("61a7fecaa3a1f96bff947d0c"),
    "date" : ISODate("2021-12-01T23:01:30.542Z"),
    "content" : "Tu m'invites ?",
    "authorId" : ObjectId("61a7fd6aa3a1f96bff947ccc"),
    "postId" : ObjectId("61a7fcb2a3a1f96bff947c94")
  },

  /* 3 */
  {
    "_id" : ObjectId("61a80409a3a1f96bff947e0a"),
    "date" : ISODate("2021-12-01T23:23:53.125Z"),
    "content" : "Comment est-ce possible ? J'appelle Scully sur le champ !",
    "authorId" : ObjectId("61a802cfa3a1f96bff947dc8"),
    "postId" : ObjectId("61a800eca3a1f96bff947d35")
  },

  /* 4 */
  {
    "_id" : ObjectId("61a8059ea3a1f96bff947eb7"),
    "date" : ISODate("2021-12-01T23:30:38.488Z"),
    "content" : "Ou sont les chats ?!",
    "authorId" : ObjectId("61a80469a3a1f96bff947e1f"),
    "postId" : ObjectId("61a7f7c1a3a1f96bff947c5b")
  },

  /* 5 */
  {
    "_id" : ObjectId("61a805b0a3a1f96bff947ebc"),
    "date" : ISODate("2021-12-01T23:30:56.389Z"),
    "content" : "Je veux le meme !",
    "authorId" : ObjectId("61a80469a3a1f96bff947e1f"),
    "postId" : ObjectId("61a800eca3a1f96bff947d35")
  },

  /* 6 */
  {
    "_id" : ObjectId("61a805bca3a1f96bff947ec0"),
    "date" : ISODate("2021-12-01T23:31:08.433Z"),
    "content" : "tro vré",
    "authorId" : ObjectId("61a80469a3a1f96bff947e1f"),
    "postId" : ObjectId("61a80122a3a1f96bff947d45")
  },

  /* 7 */
  {
    "_id" : ObjectId("61a8001843928b8273a6b9cb"),
    "date" : ISODate("2021-12-01T23:07:04.570Z"),
    "content" : "ça ne vaut pas paris ^^",
    "authorId" : ObjectId("61a7ff0943928b8273a6b998"),
    "postId" : ObjectId("61a7fe0d43928b8273a6b989")
  },

  /* 8 */
  {
    "_id" : ObjectId("61a8038643928b8273a6bb2b"),
    "date" : ISODate("2021-12-01T23:21:42.663Z"),
    "content" : "il est trop mignon 😍",
    "authorId" : ObjectId("61a802c843928b8273a6baa6"),
    "postId" : ObjectId("61a801fc43928b8273a6ba59")
  },

  /* 9 */
  {
    "_id" : ObjectId("61a803a643928b8273a6bb51"),
    "date" : ISODate("2021-12-01T23:22:14.771Z"),
    "content" : "j'ai la ref !",
    "authorId" : ObjectId("61a8010043928b8273a6ba2d"),
    "postId" : ObjectId("61a8035143928b8273a6bac1")
  },

  /* 10 */
  {
    "_id" : ObjectId("61a803cb43928b8273a6bb5d"),
    "date" : ISODate("2021-12-01T23:22:51.898Z"),
    "content" : "j'adore ce film !",
    "authorId" : ObjectId("61a8010043928b8273a6ba2d"),
    "postId" : ObjectId("61a7ff6b43928b8273a6b9a7")
  },

  /* 11 */
  {
    "_id" : ObjectId("61a8041743928b8273a6bb7d"),
    "date" : ISODate("2021-12-01T23:24:07.150Z"),
    "content" : "bravo !",
    "authorId" : ObjectId("61a8010043928b8273a6ba2d"),
    "postId" : ObjectId("61a7fe0d43928b8273a6b989")
  },

  /* 12 */
  {
    "_id" : ObjectId("61a8062c43928b8273a6bd01"),
    "date" : ISODate("2021-12-01T23:33:00.821Z"),
    "content" : "regarde le film Dune, la bande son de Hans Zimmer est vraiment incroyable !",
    "authorId" : ObjectId("61a7fd8743928b8273a6b974"),
    "postId" : ObjectId("61a805c643928b8273a6bcb6")
  },

  /* 13 */
  {
    "_id" : ObjectId("61a8066843928b8273a6bd7d"),
    "date" : ISODate("2021-12-01T23:34:00.958Z"),
    "content" : "pourquoi pas oss 117 ? un classique  !",
    "authorId" : ObjectId("61a802c843928b8273a6baa6"),
    "postId" : ObjectId("61a805c643928b8273a6bcb6")
  }
])


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