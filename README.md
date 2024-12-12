# Express-Passport Auth Server

This project is an **Express.js server** with user authentication functionality implemented using **Passport.js**. It includes user registration, login, session management, and a protected route accessible only to authenticated users.

## Features

1. **User Registration**: Allows users to register with their email and password.
2. **User Login**: Authenticates users using Passport's Local Strategy.
3. **Session Management**: Stores user sessions using `express-session` with cookies.
4. **Protected Route**: A secure route only accessible to authenticated users.
5. **Logout**: Logs out the user and destroys their session.

---

## Installation

1. Clone the repository:

    ```
    git clone <repository_url>
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

---

## Routes and Endpoints

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

---

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

---

### 3. **Protected Route**

-   **Route**: `/protected`
-   **Method**: `GET`
-   **Middleware**: `authMiddleware`
-   **Description**: Accessible only to authenticated users.
-   **Response**:
    -   `200 OK`: Returns a message and the authenticated user.
    -   `401 Unauthorized`: If the user is not logged in.

---

### 4. **Login Failure**

-   **Route**: `/auth/login-failed`
-   **Method**: `GET`
-   **Response**:
    ```
    {
        "message": "Login failed"
    }
    ```

---

### 5. **Logout**

-   **Route**: `/auth/logout`
-   **Method**: `POST`
-   **Description**: Logs out the user and destroys their session.
-   **Response**:
    ```
    {
        "message": "Logged out successfully"
    }
    ```

---

## Technologies Used

-   **Node.js**: Runtime environment
-   **Express.js**: Web framework
-   **Passport.js**: Authentication middleware
-   **MongoDB**: Database
-   **Mongoose**: MongoDB ODM
-   **bcryptjs**: Password hashing

---

## License

This project is licensed under the MIT License.
