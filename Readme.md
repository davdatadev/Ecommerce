# E-commerce Backend API

Este proyecto es el desarrollo del backend para una aplicación e-commerce, construida con **Node.js** y **Express**. Incluye gestión de productos, carritos de compra, y un sistema completo de autenticación y autorización utilizando **Passport**, **JWT** y **Cookies**.

## Tecnologías Utilizadas

* **Core:** Node.js, Express.js
* **Base de Datos:** MongoDB
* **Autenticación:** Passport.js, JWT, Bcrypt (Hashing)
* **Vistas:** Handlebars (Motor de plantillas)
* **Utilidades:** Cookie-parser

## Características Principales

* **CRUD de Productos:** Creación, lectura, actualización y eliminación de productos.
* **Gestión de Carritos:** Creación de carritos y agregado de productos.
* **Sistema de Usuarios:**
    * Registro con hasheo de contraseñas (`bcrypt`).
    * Login mediante JWT almacenado en Cookies (`httpOnly`).
    * Estrategia `current` para validar sesiones activas.
    * Roles de usuario (`user`, `admin`).
    * Logout (limpieza de cookies).
* **Conexión Robusta:** Sistema de conexión a base de datos.

## Instalación y Puesta en Marcha

Sigue estos pasos para correr el proyecto localmente:

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/davdatadev/Ecommerce.git
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Ejecutar el servidor:**
    ```bash
    npm start
    ```
    *El servidor iniciará en el puerto 8080 por defecto.*

## Configuración de Base de Datos

**Modo Corrección (Fallback):** El sistema se conecta automáticamente a **MongoDB Atlas** utilizando un usuario restringido (`coderhouse_teacher`) configurado específicamente para pruebas de lectura/escritura.

**Nota:** No es necesario configurar archivos `.env` para probar la aplicación básica.

## Endpoints Principales

Puedes probar la API utilizando **Postman** o las vistas del navegador.

### 🔐 Auth / Sessions (`/api/sessions`)

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `POST` | `/register` | Registra un nuevo usuario. Crea un carrito automáticamente. |
| `POST` | `/login` | Autentica al usuario y setea la cookie `cookieToken`. |
| `GET` | `/current` | **(Protegido)** Devuelve los datos del usuario logueado desencriptando el JWT. |
| `GET` | `/logout` | Cierra la sesión y elimina la cookie. |

### 📦 Productos (`/api/products`)

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `GET` | `/` | Lista todos los productos (soporta paginación). |
| `POST` | `/` | **(Protegido)** Crea un nuevo producto. |

### 🛒 Carritos (`/api/carts`)

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `POST` | `/` | Crea un carrito vacío. |
| `GET` | `/:cid` | Muestra los productos de un carrito específico. |

## 🖥️ Vistas (Frontend)

Accede desde el navegador:

* **Login:** `http://localhost:8080/login`
* **Productos:** `http://localhost:8080/products`.

## 🧪 Testing con Postman

Para probar las rutas protegidas en Postman:
1.  Realiza el **Login** primero.
2.  Postman guardará automáticamente la Cookie.
3.  Ejecuta la petición a `/current` o rutas protegidas.

---
Hecho por David Arenas