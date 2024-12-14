# Express-Passport Auth Server

This project is an **Express.js server** with user authentication functionality implemented using **Passport.js**. It includes user registration, login, session management, CRUD operations, and protected routes accessible only to authenticated users. Sensitive user data like passwords is excluded from all API responses.

## Features

1. **User Registration**: Allows users to register with their email and password.
2. **User Login**: Authenticates users using Passport's Local Strategy.
3. **Session Management**: Stores user sessions using `express-session` with cookies.
4. **CRUD Operations**:
    - Create, read, update, and delete user data in MongoDB.
    - Enhanced `find` with filtering and projections.
5. **Protected Route**: A secure route only accessible to authenticated users.
6. **Exclude Sensitive Data**: Ensures passwords are excluded from all API responses.
7. **Fetch All Users**: A route to fetch all users without exposing sensitive data.
8. **Logout**: Logs out the user and destroys their session.

## Installation

1. Clone the repository:

    ```
    git clone https://github.com/SergiyKonrad/express-passport-auth-example.git
    ```

2. Navigate to the project directory:

    ```
    cd express-passport-auth-example
    ```

3. Install dependencies:

    ```
    npm install
    ```

4. Create a `.env` file in the root directory and add the following variables:

    ```
    SESSION_SECRET=your-session-secret
    MONGO_URI=your-mongodb-connection-string
    PORT=8080
    ```

5. Start the server:
    ```
    npm start
    ```
    For development mode with live reload:
    ```
    npm run dev
    ```

## Routes and Endpoints

### Authentication Routes:

### 1. **User Registration**

-   **Route**: `/auth/register`
-   **Method**: `POST`
-   **Request Body**:
    ```
    {
        "email": "user@example.com",
        "password": "password123"
    }
    ```
-   **Response**:
    -   `201 Created`: If registration is successful.
    -   `400 Bad Request`: If the user already exists.

### 2. **User Login**

-   **Route**: `/auth/login`
-   **Method**: `POST`
-   **Request Body**:
    ```
    {
        "email": "user@example.com",
        "password": "password123"
    }
    ```
-   **Response**:

    -   Redirects to `/protected` on successful login.
    -   Redirects to `/auth/login-failed` on failed login.

    ### 3. **Fetch All Users**

-   **Route**: `/auth/users`
-   **Method**: `GET`
-   **Description**: Fetches all users from the database, excluding sensitive fields like the password.
-   **Response**:
    ```
    [
        {
            "_id": "1234567890abcdef",
            "email": "user1@example.com"
        },
        {
            "_id": "0987654321fedcba",
            "email": "user2@example.com"
        }
    ]
    ```

### 4. **Protected Route**

-   **Route**: `/protected`
-   **Method**: `GET`
-   **Middleware**: `authMiddleware`
-   **Description**: Accessible only to authenticated users.
-   **Response**:
    -   `200 OK`: Returns a message and the authenticated user.
    -   `401 Unauthorized`: If the user is not logged in.

### 5. **Login Failure**

-   **Route**: `/auth/login-failed`
-   **Method**: `GET`
-   **Response**:
    ```
    {
        "message": "Login failed"
    }
    ```

### 6. **Logout**

-   **Route**: `/auth/logout`
-   **Method**: `POST`
-   **Description**: Logs out the user and destroys their session.
-   **Response**:
    ```
    {
        "message": "Logged out successfully"
    }
    ```

### CRUD Routes

#### 1. **Create One Document**

-   **Route**: `/data/create`
-   **Method**: `POST`
-   **Request Body**:
    ```
    {
        "email": "user@example.com",
        "password": "password123"
    }
    ```
-   **Response**:
    ```
    {
        "message": "Document created successfully",
        "newUser": {
            "email": "user@example.com",
            "_id": "1234567890abcdef",
            "createdAt": "2024-12-05T10:00:00.000Z"
        }
    }
    ```

#### 2. **Create Multiple Documents**

-   **Route**: `/data/create-many`
-   **Method**: `POST`
-   **Request Body**:
    ```
    [
        {
            "email": "user1@example.com",
            "password": "password123"
        },
        {
            "email": "user2@example.com",
            "password": "password456"
        }
    ]
    ```
-   **Response**:
    ```
    {
        "message": "Documents created successfully",
        "newUsers": [
            {
                "email": "user1@example.com",
                "_id": "1234567890abcdef",
                "createdAt": "2024-12-05T10:00:00.000Z"
            },
            {
                "email": "user2@example.com",
                "_id": "0987654321fedcba",
                "createdAt": "2024-12-05T10:00:00.000Z"
            }
        ]
    }
    ```

#### 3. **Update One Document**

-   **Route**: `/data/update`
-   **Method**: `PUT`
-   **Request Body**:
    ```
    {
        "filter": { "email": "user@example.com" },
        "update": { "$set": { "email": "newuser@example.com" } }
    }
    ```
-   **Response**:
    ```
    {
        "message": "Document updated successfully",
        "result": {
            "acknowledged": true,
            "matchedCount": 1,
            "modifiedCount": 1
        }
    }
    ```

#### 4. **Delete One Document**

-   **Route**: `/data/delete`
-   **Method**: `DELETE`
-   **Request Body**:
    ```
    {
        "filter": { "email": "user@example.com" }
    }
    ```
-   **Response**:
    ```
    {
        "message": "Document deleted successfully",
        "result": {
            "acknowledged": true,
            "deletedCount": 1
        }
    }
    ```

#### 5. **Enhanced Find with Projection**

-   **Route**: `/data/read`
-   **Method**: `POST`
-   **Request Body**:
    ```
    {
        "filter": { "email": "user@example.com" },
        "projection": { "email": 1, "createdAt": 1, "_id": 0 }
    }
    ```
-   **Response**:
    ```
    {
        "message": "Documents retrieved successfully",
        "users": [
            {
                "email": "user@example.com",
                "createdAt": "2024-12-05T10:00:00.000Z"
            }
        ]
    }
    ```

## Technologies Used

-   **Node.js**: Runtime environment
-   **Express.js**: Web framework
-   **Passport.js**: Authentication middleware
-   **MongoDB**: Database
-   **Mongoose**: MongoDB ODM
-   **bcryptjs**: Password hashing

## License

This project is licensed under the MIT License.
