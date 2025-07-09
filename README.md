# @neylorxt/react-api

[Version Française](README.fr.md)

**@neylorxt/react-api** is a lightweight wrapper around [Axios](https://axios-http.com/) that simplifies HTTP requests in your projects. It's designed to be straightforward and beginner-friendly.

## 🤔 Why Use It?

Interacting with APIs can be repetitive. This package aims to simplify that process:

-   **Easy to Use**: Clear, specific functions for GET, POST, and PUT requests.
-   **Simplified Error Handling**: No more complex `try...catch` blocks for every request. Functions return a simple object indicating success or failure.
-   **Standardized Responses**: Every response, whether successful or not, follows the same structure, making it predictable and easy to handle.

## 🚀 Installation

First, ensure you have `axios` in your project, as it is a required peer dependency.

```bash
npm install axios
npm install @neylorxt/react-api

or

npm install axios @neylorxt/react-api
```

## ✨ API Reference

### `getData(url, config)`

Use this function to fetch data from an endpoint (HTTP GET).

-   **`url`**: The API endpoint to call.
-   **`config`** (optional): An Axios config object. See details below.

**Example:**

```javascript
import { getData } from '@neylorxt/react-api';

const response = await getData('https://api.example.com/posts/1');

if (response.success) {
  console.log('Post:', response.data);
} else {
  console.error('Error:', response.errorMessage);
}
```

### `sendData(url, data, config)`

Use this function to create new data (HTTP POST).

-   **`url`**: The API endpoint to call.
-   **`data`**: The JavaScript object to send as the request body.
-   **`config`** (optional): An Axios config object.

**Example:**

```javascript
import { sendData } from '@neylorxt/react-api';

const newPost = { title: 'My Awesome Post', content: '...' };
const response = await sendData('https://api.example.com/posts', newPost);

if (response.success) {
  console.log('Post created:', response.data);
}
```

### `updateData(url, data, config)`

Use this function to update existing data (HTTP PUT).

-   **`url`**: The API endpoint to call.
-   **`data`**: The JavaScript object to send as the request body.
-   **`config`** (optional): An Axios config object.

**Example:**

```javascript
import { updateData } from '@neylorxt/react-api';

const updatedData = { title: 'My Updated Title' };
const response = await updateData('https://api.example.com/posts/1', updatedData);

if (response.success) {
  console.log('Post updated:', response.data);
}
```

### `deleteData(url, config)`

Use this function to delete data (HTTP DELETE).

-   **`url`**: The API endpoint to call.
-   **`config`** (optional): An Axios config object, e.g., for passing headers.

**Example:**

```javascript
import { deleteData } from '@neylorxt/react-api';

const response = await deleteData('https://api.example.com/posts/1');

if (response.success) {
  console.log('Post deleted:', response.data);
}
```

### `sendRequest(url, options)`

This is a general-purpose function that can handle any type of HTTP request.

-   **`url`**: The API endpoint to call.
-   **`options`** (optional): An object to configure the request:
    -   **`method`**: The HTTP method (`'get'`, `'post'`, `'put'`, `'delete'`). Defaults to `'get'`.
    -   **`data`**: The data to send (for POST, PUT, etc.).
    -   **`config`**: The advanced Axios config object.

**Example:**

```javascript
import { sendRequest } from '@neylorxt/react-api';

// A simple GET request
const { data } = await sendRequest('https://api.example.com/users');

// A DELETE request with an auth token
const config = {
  headers: { Authorization: `Bearer ${your_token}` }
};
const response = await sendRequest('https://api.example.com/posts/1', {
  method: 'delete',
  config: config
});

if (response.success) {
  console.log('Post deleted!');
}
```

---

## ⚙️ The `config` Object

The `config` object allows you to pass advanced options directly to Axios. This gives you more control over the request.

Here are some of the most common properties you can use:

| Key               | Type      | Description                                                                                                 |
| :---------------- | :-------- | :---------------------------------------------------------------------------------------------------------- |
| `headers`         | `object`  | An object of custom headers to be sent (e.g., `Authorization`, `Content-Type`).                             |
| `params`          | `object`  | URL parameters to be sent with the request (e.g., for pagination or sorting).                               |
| `withCredentials` | `boolean` | Indicates whether cross-site Access-Control requests should be made using credentials like cookies.         |
| `timeout`         | `number`  | The number of milliseconds before the request times out. If the request takes longer, it will be aborted. |
| `responseType`    | `string`  | The format of the response data (e.g., `'json'`, `'blob'`, `'text'`). Defaults to `'json'`.                  |

**Example using `config`:**

```javascript
import { getData } from '@neylorxt/react-api';

const token = 'your-secret-auth-token';

const config = {
  // Set custom headers for authentication
  headers: {
    Authorization: `Bearer ${token}`
  },
  // Add URL query parameters
  params: {
    page: 2,
    limit: 10
  },
  // Set a timeout of 5 seconds
  timeout: 5000
};

// This will make a GET request to:
// https://api.example.com/items?page=2&limit=10
const response = await getData("https://api.example.com/items", config);

if (response.success) {
  console.log('Items:', response.data);
}
```

---

## 📦 Response Format

All functions return a Promise that resolves to an object with the following structure:

```javascript
{
  success: true,      // `false` if the request failed
  status: 200,        // The HTTP status code (e.g., 200, 404, 500)
  data: { ... },      // The data from the server response
  headers: { ... },   // The headers from the server response
  // Only present on error:
  errorMessage: 'Network Error...',
  errorType: 'NETWORK_ERROR'
}
```

You can always check the `success` property to determine if your request was successful.

## 🤝 Contributing

This is an open-source project. If you want to help improve it, feel free to open an issue or a pull request on [GitHub](https://github.com/neylorxt/react-api).

## 📜 License

This project is licensed under the MIT License.