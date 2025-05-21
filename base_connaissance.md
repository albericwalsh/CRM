# Base technique Node.js (Architecture MVC)

Ce document présente une architecture claire et modulaire pour un projet Node.js avec Express, structurée en dossiers : `controllers`, `middlewares`, `models`, `routes`, et `services`. Il est destiné à servir de guide de référence ou base de connaissances.

---

## ᴺᵗᵎᵉ ⚙️ Objectif

Organiser ton projet Node.js de manière propre, lisible et scalable.

---

## 🗂️ `controllers/`

> **Responsabilité** : Contient la logique métier (ce qui se passe quand une route est appelée).

### Exemples :

* `authController.js` → login, logout, SSO
* `userController.js` → profil utilisateur, mise à jour

### Structure type :

```js
// controllers/authController.js
exports.login = async (req, res) => { /* login */ }
exports.ssoAuth = async (req, res) => { /* SSO auth */ }
```

---

## 🗂️ `middlewares/`

> **Responsabilité** : Fonctions qui s'exécutent **avant** d'atteindre un contrôleur. Idéal pour les vérifications d'accès, de token JWT, etc.

### Exemples :

* `authMiddleware.js` → vérification de JWT
* `errorHandler.js` → gestion d'erreurs globales

### Structure type :

```js
// middlewares/authMiddleware.js
module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: 'Accès refusé' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(403).json({ error: 'Token invalide' });
  }
};
```

---

## 🗂️ `models/`

> **Responsabilité** : Interactions directes avec la base de données (PostgreSQL, MySQL, MongoDB...)

### Exemples :

* `userModel.js` → fonctions `findUserByEmail`, `createUser`, etc.

### Structure type :

```js
// models/userModel.js
const db = require('../db');

exports.findByEmail = async (email) => {
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};
```

---

## 🗂️ `routes/`

> **Responsabilité** : Définition des routes Express et liaison avec les contrôleurs.

### Exemples :

* `authRoutes.js` → POST /login, POST /auth
* `userRoutes.js` → GET /me

### Structure type :

```js
// routes/authRoutes.js
const express = require('express');
const { login, ssoAuth } = require('../controllers/authController');
const router = express.Router();

router.post('/login', login);
router.post('/auth', ssoAuth);

module.exports = router;
```

---

## 🗂️ `services/` (optionnel mais recommandé)

> **Responsabilité** : Code réutilisable et sans dépendance à Express (génération de token, hachage de mot de passe, envoi d'emails, etc.)

### Exemples :

* `jwtService.js` → signer, vérifier les JWT
* `passwordService.js` → hachage/compare via bcrypt

### Structure type :

```js
// services/jwtService.js
const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
```

---

## 🪧 Exemple de structure finale du projet

```
backend/
├── controllers/
│   └── authController.js
├── middlewares/
│   └── authMiddleware.js
├── models/
│   └── userModel.js
├── routes/
│   └── authRoutes.js
├── services/
│   └── jwtService.js
├── db.js
├── index.js
├── .env
```

---

## 🔄 Démarrage du projet

1. Installer les dépendances :

```bash
npm install express dotenv pg jsonwebtoken bcrypt cors
```

2. Créer un fichier `.env` :

```
PORT=3001
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=motdepasse
DB_NAME=pegassus
DB_PORT=5432
JWT_SECRET=supersecret
```

3. Lancer l'application :

```bash
node index.js
# ou avec nodemon :
nodemon index.js
```

---

Tu peux maintenant décliner ce modèle pour d'autres modules (users, apps, services, etc.) en suivant la même logique : routes ➞ controllers ➞ models/services.
