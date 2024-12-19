# Node.js File Handling API

This project is a Node.js-based backend application designed to manage file-based data. The API supports CRUD operations to manage data stored in a postgres database. It includes input validation and error handling for efficient data management as well as api endpoints testing with swagger.

---

## Features

- **Retrieve Data**: Fetch all stored data.
- **Add Data**: Add new entries to the data file.
- **Update Data**: Modify existing entries by ID.
- **Delete Data**: Remove entries by ID.
- **Validation**: Ensure data integrity with middleware for request validation.
- **Testing**: Testing with Swagger for API endpoints.

---

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [npm](https://www.npmjs.com/)
- [postgreSQL](https://www.postgresql.org/download/)

---

## Installation

### 1. Clone the repository:

git clone https://github.com/ankitdwivedi-wmp/WMP_TR_06_Node_Assessment.git

cd WMP_TR_06_Node_Assessment

### 2. Install dependencies:

npm install

### 3.Create .env file
Define PORT variable

username= username for database

password = Password for the user of database

database = Name of the database

db_host = localhost

### 4.Start the server:

npm start
The application will run on defined port as in .env otherwise on http://localhost:8000 by default.

### API's
### 1.GET /comments
Fetches all data from the JSON file.

Response:
json
[
  { "c_id": 1, "comment": "This is a sample comment" },
  { "c_id": 2, "comment": "Another comment" }
]
### 2.POST /comments/add
Adds a new data entry in the JSON file.

Request Body:
json

{ "c_id": 3, "comment": "New comment" }
Response:
json

{ "message": "Data added successfully" }
### 3.PUT /comments/update
Updates an existing entry by ID.

Request Body:
json

{ "c_id": 3, "comment": "Updated comment" }
Response:
json

{ "message": "Data updated successfully" }
### 4.DELETE /comments/delete/:c_id
Deletes an entry by its ID.

Response:
json

{ "message": "Data deleted successfully" }
### 5.Swagger-docs /api-docs
UI for the Swagger



### Contributing
### 1.Fork the repository.
Create a new branch:

git checkout -b feature/your-feature-name
### 2.Commit your changes:

git commit -m "Add some feature"
### 3.Push to the branch:

git push origin feature/your-feature-name
