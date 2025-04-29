## Description

NestJS Router Management API

This project is a NestJS-based REST API for managing a WiFi router. It includes features for fetching router status, managing router settings, and resetting access point credentials. The application also creates an admin user on startup if it doesn't exist in the database.

## Features

1. **Authentication**

   - Admin user is created on application startup with default credentials (`username: admin`, `password: admin`).
   - Login functionality for admin users.

2. **Fetch Router Status**

   - Retrieve details such as model, firmware version, MAC address, serial number, and uptime.

3. **Manage Router Settings**

   - Enable/Disable WiFi.
   - Enable/Disable Firewall.
   - Change the router password.

4. **Reset Access Point**
   - Change the access point name (SSID) and password.

## Technologies Stack

- NestJS
- TypeORM + MySQL
- JWT
- Bcrypt
- Redis
- Swagger (for API documentation)

## Setup

### 1. Install the required dependencies

```bash
$ npm install
```

### 2. Configure environment variables

Rename the `.env.example` file to `.env` and set the following variables:

```env
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=yourpassword
DATABASE_NAME=router_management

JWT_SECRET=your_jwt_secret
REDIS_HOST=localhost
REDIS_PORT=6379
```

### 3. Start the application

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### 4. Admin User Creation

On application startup, the system will check if an admin user exists in the database. If not, it will create one with the following default credentials:

- **Username:** `admin`
- **Password:** `admin`

You can log in using these credentials and change the password later.

## Endpoints

### Authentication

1. **POST /auth/login**
   - Logs in the admin user and returns a JWT token.

### Router Management

1. **GET /router/status**

   - Fetch router details such as model, firmware version, MAC address, serial number, and uptime.

   **Example Response:**

   ```json
   {
     "model": "RouterModel123",
     "firmwareVersion": "1.0.0",
     "macAddress": "AA:BB:CC:DD:EE:FF",
     "serialNumber": "SN123456789",
     "uptime": "48 hours"
   }
   ```

2. **POST /router/settings/wifi/enable**

   - Enable WiFi.

3. **POST /router/settings/wifi/disable**

   - Disable WiFi.

4. **POST /router/settings/firewall/enable**

   - Enable the firewall.

5. **POST /router/settings/firewall/disable**

   - Disable the firewall.

6. **POST /router/settings/password/change**

   - Change the router password.  
     **Request Body:**

   ```json
   {
     "password": "new-password"
   }
   ```

7. **POST /router/reset**

   - Reset the access point name (SSID) and password.  
     **Request Body:**

   ```json
   {
     "ssid": "NewAccessPointName",
     "password": "NewAccessPointPassword"
   }
   ```

   **Example Response:**

   ```json
   {
     "success": true,
     "message": "Access point credentials have been updated."
   }
   ```

## Database

The application uses MySQL as the database. The `Router` entity will be used to manage router-related data.

### Example `Router` Entity

```

## Swagger Documentation

The API documentation is available at:

- [http://localhost:3000/docs](http://localhost:3000/docs)

## Submission

Ensure your project is well-organized and follows best practices. Submit the project as a zip file or provide a link to a private GitHub repository.


```
