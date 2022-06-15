This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Installation

### Pre-requis

* npm
* Yarn
* mysql (ou équivalent)
* knex

### Création de la base de données

En ligne de commande ou via PhpMyAdmin, vous devez au préalable avoir créé une base de données : **todolist**
Ensuite, la création des tables se fait via le script de migration, via cette ligne de commande : 

```bash
knex migrate:latest
```

## Getting Started

Démarrer le serveur de développement : (url: http://localhost:3000)

```bash
npm run dev
# or
yarn dev
```
