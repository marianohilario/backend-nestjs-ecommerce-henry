# Ecommerce API

This is an example API for an ecommerce system that includes CRUD for users, products, and creating and querying purchase orders. The project is developed using **NestJS**, **TypeORM**, and **PostgreSQL**, and is fully **dockerized** for easy deployment.

## Technologies Used

- **NestJS**: Framework for Node.js to create scalable backend applications.
- **TypeORM**: ORM to interact with the PostgreSQL database.
- **PostgreSQL**: Relational database.
- **Docker**: Containers to facilitate deployment and environment consistency.
- **Docker Compose**: Tool to define and run multi-container Docker applications.

## Features

- **Users CRUD**: Create, Read, Update, and Delete users.
- **Products CRUD**: Create, Read, Update, and Delete products.
- **Purchase Order Management**: Create new orders, check a user's order history.

## Installation and Configuration

### Requirements:
- Docker and Docker Compose installed on your system.

### Steps to run:

1. Clone the repository:

```bash
git clone https://github.com/youruser/ecommerce-api.git
cd ecommerce-api
```

2. Run the following command to start the application and the database:

```bash
docker-compose up
```

3. The application will be available at http://localhost:3000.

### Main Endpoints:

- **Users**:

- `GET /users`: Get all users.
- `GET /users/:id`: Get an existing user.
- `PUT /users/:id`: Update an existing user.
- `DELETE /users/:id`: Delete a user.
- `POST /auth/signin`: User login.
- `POST /auth/signup`: User registration.

- **Products**:

- `GET /products`: Get all products.
- `GET /products/seeder`: Preload products into the database.
- `GET /products/byname`: Get a product by name or part of it.
- `GET /products/:id`: Get an existing product.
- `POST /products`: Create a new product.
- `PUT /products/:id`: Update an existing product.
- `DELETE /products/:id`: Delete a product.

- **Orders**:

- `POST /orders`: Create a new purchase order.
- `GET /orders`: Get all purchase orders.
- `GET /orders/:id`: Get an existing order.

- **Categories**:
- `GET /categories`: Get all categories.
- `GET /categories/seeder`: Preload categories into the database.

- **File Upload**:
- `POST /files/uploadImage/:id`: Update the image of an existing product.

## Notes

- Make sure that ports `3000` (for the application) and `5432` (for the database) are free on your local machine before running the `docker-compose up` command.

## Author

Developed by Mariano Hilario.