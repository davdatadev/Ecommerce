# E-commerce Backend API

Este proyecto es el desarrollo del backend para una aplicación e-commerce, construida con **Node.js** y **Express**. Incluye gestión de productos, carritos de compra, y un sistema completo de autenticación y autorización utilizando **Passport**, **JWT** y **Cookies**.

## 🏗️ Arquitectura del Proyecto

El servidor ha sido refactorizado para seguir el patrón **Controller-Service-DAO**, separando las responsabilidades para un código más limpio y mantenible:

* **Controllers:** Manejan las peticiones HTTP (req/res) y respuestas al cliente.
* **Repositories (Services):** Contienen la lógica de negocio y actúan como intermediarios.
* **DAOs (Data Access Objects):** Abstraen la persistencia de datos (MongoDB/Mongoose).
* **DTOs (Data Transfer Objects):** Filtran la información sensible (ej: datos del usuario) antes de enviarla al frontend.

## 🚀 Tecnologías y Herramientas

* **Runtime:** Node.js
* **Framework:** Express.js
* **Base de Datos:** MongoDB Atlas (Mongoose ODM)
* **Motor de Plantillas:** Handlebars
* **Autenticación:** Passport + JWT (Cookies httpOnly) + Bcrypt
* **Mailing:** Nodemailer (Gmail Service)
* **Arquitectura:** Repository Pattern, DAO, DTO, Singleton (DB Connection).

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

## ✨ Nuevas Funcionalidades Implementadas

### 1. Proceso de Compra (Checkout)
* Validación de **Stock** en tiempo real.
* Si hay stock suficiente, se descuenta del producto y se procesa la compra.
* Si NO hay stock suficiente, el producto permanece en el carrito (no procesado).
* Generación automática de **Ticket de Compra** con código único y monto total.

### 2. Sistema de Usuarios Seguro
* Uso de **DTOs** en la estrategia `current` para no exponer contraseñas ni datos internos.
* Roles definidos: `user` (compras) y `admin` (gestión de productos).

### 3. Recuperación de Contraseña (Password Reset)
* Flujo completo mediante correo electrónico.
* Envío de link con **Token temporal** (1 hora de duración).
* Validación para asegurar que la nueva contraseña no sea igual a la anterior.
* Vistas frontend integradas para solicitar y restablecer la clave.

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

### 🔐 Autenticación y Sesiones
| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `POST` | `/api/sessions/login` | Inicia sesión y setea cookie. |
| `POST` | `/api/sessions/register` | Registra nuevo usuario. |
| `GET` | `/api/sessions/current` | Devuelve datos del usuario (DTO). |
| `POST` | `/api/sessions/forgot-password` | Envía correo de recuperación. |
| `POST` | `/api/sessions/reset-password` | Cambia la contraseña con token válido. |

### 🛒 Carrito y Compras
| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `POST` | `/api/carts` | Crea un carrito nuevo. |
| `POST` | `/api/carts/:cid/product/:pid` | Agrega producto (Solo User). |
| `POST` | `/api/carts/:cid/purchase` | **Finaliza la compra** y genera Ticket. |

### 📦 Productos
| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `GET` | `/api/products` | Lista productos con paginación. |
| `POST` | `/api/products` | Crea producto (Solo Admin). |

## 🖥️ Vistas Disponibles (Frontend)

* `/login` - Iniciar Sesión.
* `/register` - Registro.
* `/products` - Listado principal.
* `/cart/:cid` - Vista del carrito.
* `/forgot-password` - Formulario de solicitud de recuperación.
* `/reset-password` - Formulario de cambio de clave.

## 🧪 Testing con Postman

Para probar las rutas protegidas en Postman:
1.  Realiza el **Login** primero.
2.  Postman guardará automáticamente la Cookie.
3.  Ejecuta la petición a `/current` o rutas protegidas.

---
Hecho por David Arenas