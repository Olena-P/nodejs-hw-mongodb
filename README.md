# Node.js Contacts API with MongoDB

This project is a simple Node.js application for managing a collection of contacts. It allows you to retrieve all contacts or a specific contact by ID using HTTP requests. The application uses MongoDB for storing contact data and is deployed on Render.com.

## Installation

1.  **Install dependencies:**

    ```sh
    npm install
    ```

2. **Create a `.env` file based on `.env.example` and fill in your MongoDB credentials:**

    ```env
    PORT=3000
    MONGODB_USER=yourMongoUser
    MONGODB_PASSWORD=yourMongoPassword
    MONGODB_URL=yourMongoURL
    MONGODB_DB=yourDatabaseName
    ```

3. **Start the server:**

    ```sh
    npm start
    ```

## Usage

Once the server is running, you can access the following API endpoints:

- **GET /api/contacts**: Retrieve all contacts.
- **GET /api/contacts/:contactId**: Retrieve a contact by ID.

## API Endpoints

### Get All Contacts

- **URL**: `/api/contacts`
- **Method**: `GET`
- **Response**:
    ```json
    {
      "status": "success",
      "message": "Successfully found contacts!",
      "data": [...]
    }
    ```

### Get Contact by ID

- **URL**: `/api/contacts/:contactId`
- **Method**: `GET`
- **Response**:
    ```json
    {
      "status": "success",
      "message": "Successfully found contact with id {contactId}!",
      "data": {...}
    }
    ```


