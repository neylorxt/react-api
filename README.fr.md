# @neylorxt/react-request

> **🎉 Nouvelle version disponible !** Ce package était anciennement connu sous le nom de `@neylorxt/react-api`. Le nom a été mis à jour en `@neylorxt/react-request` pour plus de clarté et cette nouvelle version apporte de nombreuses améliorations !

**@neylorxt/react-request** est un package léger qui simplifie l'envoi de requêtes HTTP avec [Axios](https://axios-http.com/) dans vos projets React. Conçu pour être simple et accessible aux débutants tout en offrant la flexibilité nécessaire aux développeurs expérimentés.

## 🆕 Quoi de neuf dans cette version ?

### ✨ **API Unifiée avec `sendRequest`**
- **Nouvelle fonction universelle** : `sendRequest()` peut gérer tous les types de requêtes (GET, POST, PUT, DELETE)
- **Interface simplifiée** : Une seule fonction pour toutes vos requêtes
- **Flexibilité maximale** : Combine la simplicité et la puissance d'Axios

### 🔧 **API Améliorée pour les fonctions spécialisées**
- **Nouvelle signature** : `sendData()`, `updateData()`, `deleteData()` utilisent maintenant un objet `options` pour plus de clarté
- **Support des paramètres d'URL** : Toutes les fonctions supportent maintenant les `params` dans la config
- **Gestion des erreurs renforcée** : Meilleure détection et catégorisation des erreurs

### 📦 **Support TypeScript natif**
- **Types inclus** : Plus besoin d'installer des types séparément
- **IntelliSense amélioré** : Autocomplétion et vérification des types

## 🤔 Pourquoi utiliser React Request ?

**React Request** a été créé pour simplifier vos interactions avec les API :

- **🎯 Simple à utiliser** : Des fonctions claires pour chaque besoin
- **🛡️ Gestion d'erreurs simplifiée** : Fini les `try...catch` complexes
- **📊 Réponses standardisées** : Format cohérent pour toutes les réponses
- **🔄 Flexible** : De l'usage basique aux configurations avancées

## 🚀 Installation

```bash
# Installation avec npm
npm install axios @neylorxt/react-request

# Installation avec Yarn
yarn add axios @neylorxt/react-request

# Migration depuis l'ancienne version
npm uninstall @neylorxt/react-api
npm install @neylorxt/react-request@latest
```

## 🎯 Utilisation

### 🆕 `sendRequest()` - La fonction universelle ⭐

**C'est la nouvelle star du package !** Cette fonction peut tout faire et simplifie grandement votre code.

```javascript
import { sendRequest } from '@neylorxt/react-request';

// GET simple
const users = await sendRequest('/api/users');

// POST avec données
const newUser = await sendRequest('/api/users', {
  method: 'post',
  data: { name: 'John', email: 'john@example.com' }
});

// PUT avec authentification
const updatedUser = await sendRequest('/api/users/1', {
  method: 'put',
  data: { name: 'John Updated' },
  config: {
    headers: { Authorization: `Bearer ${token}` }
  }
});

// DELETE avec paramètres
const result = await sendRequest('/api/users/1', {
  method: 'delete',
  params: { force: true },
  config: {
    headers: { Authorization: `Bearer ${token}` }
  }
});
```

### 📥 `getData()` - Récupérer des données

```javascript
import { getData } from '@neylorxt/react-request';

// Simple GET
const response = await getData('/api/posts');

// GET avec paramètres et authentification
const response = await getData('/api/posts', {
  params: { page: 2, limit: 10 },
  headers: { Authorization: `Bearer ${token}` }
});

if (response.success) {
  console.log('Articles :', response.data);
}
```

### 📤 `sendData()` - Envoyer des données (POST)

**⚠️ Nouvelle API !** La fonction utilise maintenant un objet `options` pour plus de clarté.

```javascript
import { sendData } from '@neylorxt/react-request';

// Ancienne version (toujours supportée)
// const response = await sendData(url, data, config);

// ✅ Nouvelle version recommandée
const response = await sendData('/api/posts', {
  data: { title: 'Mon article', content: 'Contenu...' },
  config: {
    headers: { Authorization: `Bearer ${token}` },
    params: { draft: false }
  }
});
```

### 🔄 `updateData()` - Mettre à jour des données (PUT)

```javascript
import { updateData } from '@neylorxt/react-request';

const response = await updateData('/api/posts/1', {
  data: { title: 'Titre mis à jour' },
  config: {
    headers: { Authorization: `Bearer ${token}` }
  }
});
```

### 🗑️ `deleteData()` - Supprimer des données (DELETE)

```javascript
import { deleteData } from '@neylorxt/react-request';

const response = await deleteData('/api/posts/1', {
  config: {
    headers: { Authorization: `Bearer ${token}` },
    params: { force: true }
  }
});
```

## ⚙️ Configuration avancée

### L'objet `config` - Toute la puissance d'Axios

| Propriété | Type | Description |
|-----------|------|-------------|
| `headers` | `object` | En-têtes personnalisés (Authentication, Content-Type, etc.) |
| `params` | `object` | Paramètres d'URL (?page=1&limit=10) |
| `timeout` | `number` | Timeout en millisecondes |
| `withCredentials` | `boolean` | Envoyer les cookies cross-domain |
| `responseType` | `string` | Format de réponse ('json', 'blob', 'text') |

### Exemple complet avec authentification

```javascript
import { sendRequest } from '@neylorxt/react-request';

const token = localStorage.getItem('authToken');

const config = {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  params: {
    include: 'comments,author',
    page: 1
  },
  timeout: 10000
};

// Récupérer des articles avec commentaires
const response = await sendRequest('/api/posts', {
  method: 'get',
  config
});

// Créer un nouvel article
const newPost = await sendRequest('/api/posts', {
  method: 'post',
  data: { title: 'Mon titre', content: 'Mon contenu' },
  config
});
```

## 📊 Format de réponse standardisé

Toutes les fonctions retournent le même format de réponse :

```javascript
// En cas de succès
{
  success: true,
  status: 200,
  data: { /* données du serveur */ },
  headers: { /* en-têtes de réponse */ }
}

// En cas d'erreur
{
  success: false,
  status: 404,
  data: { /* données d'erreur du serveur */ },
  headers: { /* en-têtes de réponse */ },
  errorMessage: "Not Found",
  errorType: "HTTP_ERROR" // ou "NETWORK_ERROR", "CONFIG_ERROR"
}
```

## 🔧 Exemples pratiques

### Authentification complète

```javascript
import { sendRequest } from '@neylorxt/react-request';

// Connexion
const login = async (credentials) => {
  const response = await sendRequest('/api/auth/login', {
    method: 'post',
    data: credentials
  });
  
  if (response.success) {
    const token = response.data.token;
    localStorage.setItem('authToken', token);
    return token;
  }
  throw new Error(response.errorMessage);
};

// Requête authentifiée
const fetchUserData = async () => {
  const token = localStorage.getItem('authToken');
  
  return await sendRequest('/api/user/profile', {
    config: {
      headers: { Authorization: `Bearer ${token}` }
    }
  });
};
```

### Pagination et filtrage

```javascript
import { getData } from '@neylorxt/react-request';

const fetchPosts = async (page = 1, filters = {}) => {
  return await getData('/api/posts', {
    params: {
      page,
      limit: 20,
      ...filters
    }
  });
};

// Usage
const posts = await fetchPosts(1, { category: 'tech', status: 'published' });
```

## 🚀 Migration depuis l'ancienne version

### Changements de noms

```javascript
// Avant
import { ... } from '@neylorxt/react-api';

// Maintenant
import { ... } from '@neylorxt/react-request';
```

### Nouvelle API pour les fonctions spécialisées

```javascript
// Avant
const response = await sendData(url, data, config);
const response = await updateData(url, data, config);
const response = await deleteData(url, config);

// Maintenant (recommandé)
const response = await sendData(url, { data, config });
const response = await updateData(url, { data, config });
const response = await deleteData(url, { config });

// L'ancienne API fonctionne toujours pour la rétrocompatibilité
```

## 🤝 Contribuer

Ce projet est open-source ! Vos contributions sont les bienvenues :

- 🐛 Signaler des bugs
- 💡 Proposer des améliorations
- 📝 Améliorer la documentation
- 🔧 Soumettre des pull requests

[Contribuer sur GitHub](https://github.com/neylorxt/react-request)

## 📜 Licence

MIT License - Utilisez librement dans vos projets !