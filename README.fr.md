# @neylorxt/react-api

[English Version](README.md)

**@neylorxt/react-api** est un mini-package léger qui simplifie l'envoi de données avec [Axios](https://axios-http.com/) dans vos projets. Conçu pour être simple et accessible aux débutants.

## 🤔 Pourquoi utiliser React API ?

Quand on débute, interagir avec des serveurs (API) peut sembler compliqué. **React API** a été créé pour vous faciliter la vie :

- **Simple à utiliser** : Des fonctions claires pour chaque besoin (recevoir, envoyer, mettre à jour).
- **Gestion des erreurs simplifiée** : Fini les `try...catch` à rallonge. On vous retourne un objet simple pour savoir si tout s'est bien passé.
- **Standardisé** : Les réponses du serveur sont toujours au même format, facile à traiter.

En gros, vous vous concentrez sur votre application, et **React API** s'occupe de la communication avec le serveur.


## 🚀 Installation

Pour utiliser ce package, vous devez avoir `axios` installé dans votre projet.

```bash
npm install axios
npm install @neylorxt/react-api

ou

npm install axios @neylorxt/react-api
```

## ✨ Comment ça marche ?

### `getData(url, config)`

Pour recevoir (GET) des données.

- **`url`** : L'adresse du serveur.
- **`config`** (optionnel) : Pour passer des paramètres dans l'URL ou des en-têtes. Voir les détails plus bas.

**Exemple :**

```javascript
import { getData } from '@neylorxt/react-api';

const response = await getData('https://api.example.com/posts/1');
if (response.success) {
  console.log('Article :', response.data);
} else {
  console.error('Erreur :', response.errorMessage);
}
```

### `sendData(url, data, config)`

Pour envoyer (POST) de nouvelles données.

- **`url`** : L'adresse du serveur.
- **`data`** : Les données à créer.
- **`config`** (optionnel) : Configuration Axios.

**Exemple :**

```javascript
import { sendData } from '@neylorxt/react-api';

const newPost = { title: 'Mon super article', content: '...' };
const response = await sendData('https://api.example.com/posts', newPost);

if (response.success) {
  console.log('Article créé :', response.data);
}
```

### `updateData(url, data, config)`

Pour mettre à jour (PUT) des données existantes.

- **`url`** : L'adresse du serveur.
- **`data`** : Les données à modifier.
- **`config`** (optionnel) : Configuration Axios.

**Exemple :**

```javascript
import { updateData } from '@neylorxt/react-api';

const updatedPost = { title: 'Mon titre mis à jour' };
const response = await updateData('https://api.example.com/posts/1', updatedPost);

if (response.success) {
  console.log('Article mis à jour :', response.data);
}
```

### `deleteData(url, config)`

Pour supprimer (DELETE) des données.

- **`url`** : L'adresse du serveur.
- **`config`** (optionnel) : Configuration Axios (par exemple, pour les en-têtes).

**Exemple :**

```javascript
import { deleteData } from '@neylorxt/react-api';

const response = await deleteData('https://api.example.com/posts/1');

if (response.success) {
  console.log('Article supprimé :', response.data);
}
```

### `sendRequest(url, options)`

C'est la fonction "couteau suisse". Elle peut tout faire !

- **`url`** : L'adresse du serveur (API) que vous voulez appeler.
- **`options`** (optionnel) : Un objet pour configurer votre requête.
    - **`method`**: La méthode HTTP (`'get'`, `'post'`, `'put'`, `'delete'`). Par défaut, c'est `'get'`.
    - **`data`**: Les données à envoyer (pour POST, PUT).
    - **`config`**: La configuration avancée d'Axios.

**Exemple :**

```javascript
import { sendRequest } from '@neylorxt/react-api';

// Requête GET simple
const { data } = await sendRequest('https://api.example.com/users');

// Requête DELETE avec un token d'authentification
const config = {
  headers: { Authorization: `Bearer ${votre_token}` }
};
const response = await sendRequest('https://api.example.com/posts/1', {
  method: 'delete',
  config: config,
  params: {
    id: 1,
    ...
  }
});

if (response.success) {
  console.log('Article supprimé !');
}
```

---

## ⚙️ L'objet `config`

L'objet `config` vous permet de passer des options avancées directement à Axios. Cela vous donne plus de contrôle sur la requête.

Voici les propriétés les plus courantes que vous pouvez utiliser :

| Clé               | Type      | Description                                                                                                         |
| :---------------- | :-------- | :------------------------------------------------------------------------------------------------------------------ |
| `headers`         | `object`  | Un objet d'en-têtes personnalisés à envoyer (ex: `Authorization`, `Content-Type`).                                 |
| `params`          | `object`  | Les paramètres d'URL à envoyer avec la requête (ex: pour la pagination ou le tri).                                   |
| `withCredentials` | `boolean` | Indique si les requêtes cross-domaines doivent être effectuées en utilisant des informations d'authentification (cookies). |
| `timeout`         | `number`  | Le nombre de millisecondes avant qu'une requête n'expire. Si la requête prend plus de temps, elle sera annulée.      |
| `responseType`    | `string`  | Le format des données de la réponse (ex: `'json'`, `'blob'`, `'text'`). Par défaut, `'json'`.                      |

**Exemple avec `config`:**

```javascript
import { getData } from '@neylorxt/react-api';

const token = 'votre-token-secret';

const config = {
  // Définir des en-têtes pour l'authentification
  headers: {
    Authorization: `Bearer ${token}`
  },
  // Ajouter des paramètres à l'URL
  params: {
    page: 2,
    limit: 10
  },
  // Définir un timeout de 5 secondes
  timeout: 5000
};

// Ceci effectuera une requête GET vers :
// https://api.example.com/items?page=2&limit=10
const response = await getData("https://api.example.com/items", config);

if (response.success) {
  console.log('Éléments :', response.data);
}
```

---

## 📦 Format de la réponse

Toutes les fonctions retournent une promesse avec un objet qui a la même structure :

```javascript
{
  success: true,      // ou false si ça a échoué
  status: 200,        // Le code HTTP (200, 404, 500...)
  data: { ... },      // Les données reçues du serveur
  headers: { ... },   // Les en-têtes de la réponse
  // Présent uniquement en cas d'erreur :
  errorMessage: 'Erreur réseau...',
  errorType: 'NETWORK_ERROR'
}
```

Vous pouvez toujours vérifier la propriété `success` pour déterminer si votre requête a réussi.

## 🤝 Contribuer

Ce projet est open-source. Si vous voulez l'améliorer, n'hésitez pas à ouvrir une *issue* ou une *pull request* sur [GitHub](https://github.com/neylorxt/react-api).

## 📜 Licence

Ce projet est sous licence MIT.
