# Priv'Attic : Back-End

⚠️ | This application is unsecure, deploy at your own risks.
:---: | :---

## Priv'Attic

Priv'Attic est un réseau social permettant de partager un peu de texte ou des images.
Réalisé en 5 jours dans le cadre de l'UE "Nouvelles technologies du web" par :
- Ambrozik Hugo
- Watelot Paul-Emile


## End-Points
Les end-points dans le back-end sont les suivantes et disponibles dans le Swagger (il faut avoir lancé le projet pour que les liens soient fonctionnels) :
(🔒 route nécessitant d'être authentifié)
- [http://localhost:3000/documentation/auth](http://localhost:3000/documentation/auth)
  - Se connecter
- [http://localhost:3000/documentation/users](http://localhost:3000/documentation/users)
  - Créer un Compte
  - 🔒 Modifier son Compte
  - 🔒 Supprimer son Compte
  - Récupérer un Compte par le pseudo ou par l'id
- [http://localhost:3000/documentation/posts](http://localhost:3000/documentation/posts)
  - Récupérer tous les Posts avec le pseudo d'un utilisateur
  - Récupérer tous les Posts publics
  - Récupérer tous les Posts publics par [catégories]
  - Récupérer un Post par son id
  - 🔒 Créer un Post
  - 🔒 Modifier un Post par son id
  - 🔒 Supprimer un Post par son id
  - 🔒 Supprimer tous les Posts d'un utilisateur
- [http://localhost:3000/documentation/comments](http://localhost:3000/documentation/comments)
  - 🔒 Publier un Commentaire
  - 🔒 Supprimer tous ses Commentaires
  - 🔒 Supprimer tous les Commentaires d'un Post
  - 🔒 Supprimer un Commentaire par son id
  - Récupérer les Commentaires d'un Post via son id
  - Récupérer les Commentaires d'un Utilisateur par son id
- [http://localhost:3000/documentation/likes](http://localhost:3000/documentation/likes)
  - 🔒 Ajouter un Like
  - 🔒 Supprimer son Like
  - 🔒 Supprimer tous les Likes d'un Post
  - 🔒 Supprimer tous les Likes d'un Utilisateur
  - 🔒 Supprimer un Like par son id
  - Récupérer le nombre de Likes d'un Post
  - Récupérer le nombre de Likes qu'a reçu un Utilisateur
  - Savoir si un Utilisateur a Liké un Post
  - Récupérer la liste des Likes d'un Utilisateur
  - Récupérer la liste des Likes d'un Post

Un compte peut être "public" ou "privé, si il est privé, seul son propriétaire peut voir ses posts.

L'application utilise des Tokens JWT pour l'authentification.

## Installation du projet
- Télécharger, installer et lancer la partie [back end](https://github.com/P-EW/priv-attic-back) (ici)
- Télécharger, installer et lancer la partie [front end](https://github.com/P-EW/priv-attic-front)

## Dépendances :

```bash
 _   _             _      ___  _____  _____  _     _____
| \ | |           | |    |_  |/  ___|/  __ \| |   |_   _|
|  \| |  ___  ___ | |_     | |\ `--. | /  \/| |     | |
| . ` | / _ \/ __|| __|    | | `--. \| |    | |     | |
| |\  ||  __/\__ \| |_ /\__/ //\__/ /| \__/\| |_____| |_
\_| \_/ \___||___/ \__|\____/ \____/  \____/\_____/\___/


[System Information]
OS Version     : Windows 10
NodeJS Version : v16.10.0
NPM Version    : 8.1.1

[Nest CLI]
Nest CLI Version : 8.1.5

[Nest Platform Information]
platform-express version : 8.2.3
platform-fastify version : 8.2.3
schematics version       : 8.0.5
mongoose version         : 9.0.1
passport version         : 8.0.1
swagger version          : 5.1.5
testing version          : 8.2.3
common version           : 8.2.3
core version             : 8.2.3
jwt version              : 8.0.0
cli version              : 8.1.5
```

## Installation
```bash
# Clonage du git en repo local
$ git clone https://github.com/P-EW/priv-attic-back
# Se rendre dans le dossier du projet
$ cd priv-attic-back
```
Il faut aussi Docker sur votre machine pour la base de donnée.
```bash
$ docker-compose up
$ docker-compose start
```
- Créer la base de donnée "priv_attic"
- Ajouter les données/indexes dans le [script](https://github.com/P-EW/priv-attic-back/blob/master/scripts/init.mongo.js). (lancer dans votre console mongo)


```bash
# installation des dependances au choix :
$ npm install
# OU
$ yarn install
# Lancer le projet
$ nest start
```
- La documentation Swagger est maintenant accessible dans les liens plus haut.

Si vous avez lancé le front, le projet est accessible et entièrement fonctionnel à l'adresse suivante : [http://localhost:4200/](http://localhost:4200/)

