# WalletAI Server - API Documentation

## Overview

WalletAI is a personal finance tracker API that allows users to manage their transactions, get AI-powered financial advice, and view financial news. This API uses JWT for authentication.

**Base URL:** `http://localhost:3000`

---

## Table of Contents

1. [Authentication](#authentication)
2. [Transactions](#transactions)
3. [AI Advisor](#ai-advisor)
4. [News](#news)
5. [Error Handling](#error-handling)

---

## Authentication

All protected endpoints require a JWT token in the request header.

### Header Format

```
Authorization: Bearer <access_token>
```

---

### Register

Create a new user account.

**Endpoint:** `POST /auth/register`

**Request Body:**

```json
{
  "username": "fahrizkysyah",
  "email": "fahrizkysyah@mail.com",
  "password": "password123"
}
```

**Response (201 Created):**

```json
{
  "user": "fahrizkysyah",
  "email": "fahrizkysyah@mail.com"
}
```

**Error Responses:**
| Status | Message |
|--------|---------|
| `400` | `email already taken` |
| `400` | `email format is incorrect` |
| `400` | `username cannot be empty` |
| `400` | `password must be at least 5 characters` |

---

### Login

Authenticate and receive a JWT token.

**Endpoint:** `POST /auth/login`

**Request Body:**

```json
{
  "email": "fahrizkysyah@mail.com",
  "password": "password123"
}
```

**Response (200 OK):**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
| Status | Message |
|--------|---------|
| `401` | `Invalid email/password` |

---

### Google Login

Authenticate using Google OAuth 2.0. Must be accessed from a browser — not via Postman — because it requires a redirect to Google's login page.

**Endpoint:** `GET /auth/google`

Redirects to Google login page. After successful authentication, Google redirects back to the callback URL and returns a JWT token.

**Callback Endpoint:** `GET /auth/google/callback`

**Response (200 OK):**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## Transactions

All transaction endpoints require authentication.

---

### Get All Transactions

Retrieve all transactions belonging to the authenticated user.

**Endpoint:** `GET /transactions`

**Authentication:** Required

**Response (200 OK):**

```json
{
  "data": [
    {
      "amount": 500000,
      "description": "Ngedate bareng doi",
      "transaction_date": "2026-03-26"
    }
  ]
}
```

**Error Responses:**
| Status | Message |
|--------|---------|
| `401` | `Unauthorized` |

---

### Get Transaction by ID

Retrieve a specific transaction by its ID.

**Endpoint:** `GET /transactions/:id`

**Authentication:** Required

**Response (200 OK):**

```json
{
  "id": 15,
  "UserId": 3,
  "CategoryId": 2,
  "amount": 200000,
  "description": "Ngopi di cafe",
  "transaction_date": "2026-03-26",
  "createdAt": "2026-03-25T23:31:44.165Z",
  "updatedAt": "2026-03-25T23:31:44.165Z"
}
```

**Error Responses:**
| Status | Message |
|--------|---------|
| `401` | `Unauthorized` |
| `404` | `Not Found` |

---

### Create Transaction

Add a new transaction for the authenticated user.

**Endpoint:** `POST /transactions`

**Authentication:** Required

**Request Body:**

```json
{
  "CategoryId": 2,
  "amount": 200000,
  "description": "Ngopi di cafe",
  "transaction_date": "2026-03-26"
}
```

**Request Body Fields:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `CategoryId` | integer | Yes | `1` for income, `2` for expense |
| `amount` | integer | Yes | Transaction amount in IDR |
| `description` | string | Yes | Transaction description |
| `transaction_date` | string | Yes | Date in `YYYY-MM-DD` format |

**Response (201 Created):**

```json
{
  "id": 15,
  "UserId": 3,
  "CategoryId": 2,
  "amount": 200000,
  "description": "Ngopi di cafe",
  "transaction_date": "2026-03-26",
  "createdAt": "2026-03-25T23:31:44.165Z",
  "updatedAt": "2026-03-25T23:31:44.165Z"
}
```

**Error Responses:**
| Status | Message |
|--------|---------|
| `400` | `amount cannot be empty` |
| `400` | `description cannot be empty` |
| `400` | `date cannot be empty` |
| `401` | `Unauthorized` |

---

### Update Transaction

Update an existing transaction by its ID.

**Endpoint:** `PUT /transactions/:id`

**Authentication:** Required

**Request Body:**

```json
{
  "CategoryId": 2,
  "amount": 500000,
  "description": "Nonton bareng doi dan makan malam",
  "transaction_date": "2026-03-26"
}
```

**Response (200 OK):**

```json
{
  "id": 15,
  "UserId": 3,
  "CategoryId": 2,
  "amount": 500000,
  "description": "Nonton bareng doi dan makan malam",
  "transaction_date": "2026-03-26",
  "createdAt": "2026-03-25T23:31:44.165Z",
  "updatedAt": "2026-03-25T23:32:03.135Z"
}
```

**Error Responses:**
| Status | Message |
|--------|---------|
| `401` | `Unauthorized` |
| `404` | `Not Found` |

---

### Delete Transaction

Delete a transaction by its ID.

**Endpoint:** `DELETE /transactions/:id`

**Authentication:** Required

**Response (200 OK):**

```json
{
  "message": "History succesfully deleted"
}
```

**Error Responses:**
| Status | Message |
|--------|---------|
| `401` | `Unauthorized` |
| `404` | `Not Found` |

---

## AI Advisor

### Analyze Finances

Analyze the authenticated user's transactions using AI and return personalized financial advice. No request body needed — data is fetched automatically from the user's transactions.

**Endpoint:** `POST /ai/analyze`

**Authentication:** Required

**Response (200 OK):**

```json
{
  "result": "- Analisis: Pengeluaran kamu didominasi oleh kategori expense sebesar Rp1.000.000\n- Saran 1: Kurangi pengeluaran hiburan\n- Saran 2: Sisihkan minimal 20% dari pemasukan\n- Saran 3: Catat setiap pengeluaran kecil"
}
```

**Response when no transactions exist (200 OK):**

```json
{
  "result": "Belum ada transaksi untuk dianalisis."
}
```

**Error Responses:**
| Status | Message |
|--------|---------|
| `401` | `Unauthorized` |
| `500` | `Internal Server Error` |

---

## News

### Get Financial News

Retrieve the latest financial news articles. Returns top 10 most popular articles related to finance and economy.

**Endpoint:** `GET /news`

**Authentication:** Required

**Response (200 OK):**

```json
{
  "totalResults": 42961,
  "articles": [
    {
      "title": "Global Markets React to Fed Rate Decision",
      "description": "Investors responded cautiously as the Federal Reserve...",
      "url": "https://example.com/article",
      "publishedAt": "2026-03-25T10:00:00Z",
      "source": "Reuters"
    }
  ]
}
```

**Error Responses:**
| Status | Message |
|--------|---------|
| `401` | `Unauthorized` |
| `500` | `Internal Server Error` |

---

## Error Handling

All error responses follow this format:

```json
{
  "message": "Error description"
}
```

### HTTP Status Codes

| Status | Meaning                                         |
| ------ | ----------------------------------------------- |
| `200`  | Success                                         |
| `201`  | Created                                         |
| `400`  | Bad Request — validation error or invalid input |
| `401`  | Unauthorized — missing or invalid token         |
| `403`  | Forbidden — insufficient permissions            |
| `404`  | Not Found — resource does not exist             |
| `500`  | Internal Server Error                           |

---

## Data Validation

### User

| Field      | Rules                                |
| ---------- | ------------------------------------ |
| `username` | Required, cannot be empty            |
| `email`    | Required, unique, valid email format |
| `password` | Required, minimum 5 characters       |

### Transaction

| Field              | Rules                                 |
| ------------------ | ------------------------------------- |
| `CategoryId`       | Required, `1` = income, `2` = expense |
| `amount`           | Required, cannot be empty             |
| `description`      | Required, cannot be empty             |
| `transaction_date` | Required, format `YYYY-MM-DD`         |

---

## Version History

| Version | Date       | Changes                   |
| ------- | ---------- | ------------------------- |
| 1.0.0   | 2026-03-26 | Initial API Documentation |
