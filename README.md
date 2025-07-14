# @neylorxt/react-request

> **🎉 New version available!** This package was formerly known as `@neylorxt/react-api`. The name has been updated to `@neylorxt/react-request` for better clarity and this new version brings many improvements!

**@neylorxt/react-request** is a lightweight package that simplifies sending HTTP requests with [Axios](https://axios-http.com/) in your React projects. Designed to be simple and accessible for beginners while offering the flexibility needed by experienced developers.

## 🆕 What's new in this version?

### ✨ **Unified API with `sendRequest`**
- **New universal function**: `sendRequest()` can handle all types of requests (GET, POST, PUT, DELETE)
- **Simplified interface**: One function for all your requests
- **Maximum flexibility**: Combines simplicity with the power of Axios

### 🔧 **Enhanced API for specialized functions**
- **New signature**: `sendData()`, `updateData()`, `deleteData()` now use an `options` object for better clarity
- **URL parameters support**: All functions now support `params` in the config
- **Enhanced error handling**: Better error detection and categorization

### 📦 **Native TypeScript support**
- **Included types**: No need to install separate types
- **Improved IntelliSense**: Autocompletion and type checking

## 🤔 Why use React Request?

**React Request** was created to simplify your API interactions:

- **🎯 Simple to use**: Clear functions for every need
- **🛡️ Simplified error handling**: No more complex `try...catch` blocks
- **📊 Standardized responses**: Consistent format for all responses
- **🔄 Flexible**: From basic usage to advanced configurations

## 🚀 Installation

```bash
# Installation with npm
npm install axios @neylorxt/react-request

# Installation with Yarn
yarn add axios @neylorxt/react-request

# Migration from old version
npm uninstall @neylorxt/react-api
npm install @neylorxt/react-request@latest
```

## 🎯 Usage

### 🆕 `sendRequest()` - The universal function ⭐

**This is the new star of the package!** This function can do everything and greatly simplifies your code.

```javascript
import { sendRequest } from '@neylorxt/react-request';

// Simple GET
const users = await sendRequest('/api/users');

// POST with data
const newUser = await sendRequest('/api/users', {
  method: 'post',
  data: { name: 'John', email: 'john@example.com' }
});

// PUT with authentication
const updatedUser = await sendRequest('/api/users/1', {
  method: 'put',
  data: { name: 'John Updated' },
  config: {
    headers: { Authorization: `Bearer ${token}` }
  }
});

// DELETE with parameters
const result = await sendRequest('/api/users/1', {
  method: 'delete',
  params: { force: true },
  config: {
    headers: { Authorization: `Bearer ${token}` }
  }
});
```

### 📥 `getData()` - Fetch data

```javascript
import { getData } from '@neylorxt/react-request';

// Simple GET
const response = await getData('/api/posts');

// GET with parameters and authentication
const response = await getData('/api/posts', {
  params: { page: 2, limit: 10 },
  headers: { Authorization: `Bearer ${token}` }
});

if (response.success) {
  console.log('Posts:', response.data);
}
```

### 📤 `sendData()` - Send data (POST)

**⚠️ New API!** The function now uses an `options` object for better clarity.

```javascript
import { sendData } from '@neylorxt/react-request';

// Old version (still supported)
// const response = await sendData(url, data, config);

// ✅ New recommended version
const response = await sendData('/api/posts', {
  data: { title: 'My post', content: 'Content...' },
  config: {
    headers: { Authorization: `Bearer ${token}` },
    params: { draft: false }
  }
});
```

### 🔄 `updateData()` - Update data (PUT)

```javascript
import { updateData } from '@neylorxt/react-request';

const response = await updateData('/api/posts/1', {
  data: { title: 'Updated title' },
  config: {
    headers: { Authorization: `Bearer ${token}` }
  }
});
```

### 🗑️ `deleteData()` - Delete data (DELETE)

```javascript
import { deleteData } from '@neylorxt/react-request';

const response = await deleteData('/api/posts/1', {
  config: {
    headers: { Authorization: `Bearer ${token}` },
    params: { force: true }
  }
});
```

## ⚙️ Advanced configuration

### The `config` object - All the power of Axios

| Property | Type | Description |
|----------|------|-------------|
| `headers` | `object` | Custom headers (Authentication, Content-Type, etc.) |
| `params` | `object` | URL parameters (?page=1&limit=10) |
| `timeout` | `number` | Timeout in milliseconds |
| `withCredentials` | `boolean` | Send cross-domain cookies |
| `responseType` | `string` | Response format ('json', 'blob', 'text') |

### Complete example with authentication

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

// Fetch posts with comments
const response = await sendRequest('/api/posts', {
  method: 'get',
  config
});

// Create a new post
const newPost = await sendRequest('/api/posts', {
  method: 'post',
  data: { title: 'My title', content: 'My content' },
  config
});
```

## 📊 Standardized response format

All functions return the same response format:

```javascript
// On success
{
  success: true,
  status: 200,
  data: { /* server data */ },
  headers: { /* response headers */ }
}

// On error
{
  success: false,
  status: 404,
  data: { /* server error data */ },
  headers: { /* response headers */ },
  errorMessage: "Not Found",
  errorType: "HTTP_ERROR" // or "NETWORK_ERROR", "CONFIG_ERROR"
}
```

## 🔧 Practical examples

### Complete authentication

```javascript
import { sendRequest } from '@neylorxt/react-request';

// Login
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

// Authenticated request
const fetchUserData = async () => {
  const token = localStorage.getItem('authToken');
  
  return await sendRequest('/api/user/profile', {
    config: {
      headers: { Authorization: `Bearer ${token}` }
    }
  });
};
```

### Pagination and filtering

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

## 🚀 Migration from old version

### Name changes

```javascript
// Before
import { ... } from '@neylorxt/react-api';

// Now
import { ... } from '@neylorxt/react-request';
```

### New API for specialized functions

```javascript
// Before
const response = await sendData(url, data, config);
const response = await updateData(url, data, config);
const response = await deleteData(url, config);

// Now (recommended)
const response = await sendData(url, { data, config });
const response = await updateData(url, { data, config });
const response = await deleteData(url, { config });

// The old API still works for backward compatibility
```

## 🤝 Contributing

This project is open-source! Your contributions are welcome:

- 🐛 Report bugs
- 💡 Suggest improvements
- 📝 Improve documentation
- 🔧 Submit pull requests

[Contribute on GitHub](https://github.com/neylorxt/react-request)

## 📜 License

MIT License - Use freely in your projects!