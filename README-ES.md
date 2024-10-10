# Ecommerce API

Esta es una API de ejemplo para un sistema de ecommerce que incluye CRUD de usuarios, productos, y la creación y consulta de órdenes de compra. El proyecto está desarrollado utilizando **NestJS**, **TypeORM**, y **PostgreSQL**, y está completamente **dockerizado** para facilitar el despliegue.

## Tecnologías Utilizadas

- **NestJS**: Framework para Node.js para crear aplicaciones backend escalables.
- **TypeORM**: ORM para interactuar con la base de datos PostgreSQL.
- **PostgreSQL**: Base de datos relacional.
- **Docker**: Contenedores para facilitar el despliegue y la consistencia del entorno.
- **Docker Compose**: Herramienta para definir y ejecutar aplicaciones multi-contenedor de Docker.

## Funcionalidades

- **CRUD de Usuarios**: Crear, Leer, Actualizar y Eliminar usuarios.
- **CRUD de Productos**: Crear, Leer, Actualizar y Eliminar productos.
- **Gestión de Órdenes de Compra**: Crear nuevas órdenes, consultar el historial de órdenes de un usuario.

## Instalación y Configuración

### Requisitos:
- Docker y Docker Compose instalados en tu sistema.

### Pasos para ejecutar:

1. Clona el repositorio:

    ```bash
    git clone https://github.com/tuusuario/ecommerce-api.git
    cd ecommerce-api
    ```


2. Ejecuta el siguiente comando para levantar la aplicación y la base de datos:

    ```bash
    docker-compose up
    ```


3. La aplicación estará disponible en http://localhost:3000.


### Endpoints Principales:

- **Usuarios**:

  - `GET /users`: Obtener todos los usuarios.
  - `GET /users/:id`: Obtener un usuario existente.
  - `PUT /users/:id`: Actualizar un usuario existente.
  - `DELETE /users/:id`: Eliminar un usuario.
  - `POST /auth/signin`: Login del usuario.
  - `POST /auth/signup`: Register del usuario.

- **Productos**:

  - `GET /products`: Obtener todos los productos.
  - `GET /products/seeder`: Realiza una precarga de productos en la base de datos.
  - `GET /products/byname`: Obtener un producto por su nombre o parte de él.
  - `GET /products/:id`: Obtener un producto existente.
  - `POST /products`: Crear un nuevo producto.
  - `PUT /products/:id`: Actualizar un producto existente.
  - `DELETE /products/:id`: Eliminar un producto.

- **Órdenes**:

  - `POST /orders`: Crear una nueva orden de compra.
  - `GET /orders`: Obtener todas las órdenes de compra.
  - `GET /orders/:id`: Obtener una orden existente.

- **Categorias**:
  - `GET /categories`: Obtener todas las categorías.
  - `GET /categories/seeder`: realiza precarga de categorías en la base de datos.

- **File Upload**:
  - `POST /files/uploadImage/:id`: Actualiza la imagen de un producto existente.


## Notas

- Asegúrate de que los puertos `3000` (para la aplicación) y `5432` (para la base de datos) estén libres en tu máquina local antes de ejecutar el comando `docker-compose up`.


## Autor

Desarrollado por Mariano Hilario.