# Hospital App

---

### Instalación

1. Clona el repositorio

2. Instala las dependencias en la carpeta raíz del proyecto

3. Navega a la carpeta backend e instala las dependencias

### Configuración

Para configurar el entorno de desarrollo local, necesitarás añadir un archivo `.env` en la carpeta `backend` con las siguientes variables:

DB_USER=TuUsuarioDeBaseDeDatos
DB_PASSWORD=TuContraseñaDeBaseDeDatos
DB_HOST=HostDeBaseDeDatos
DB_NAME=NombreDeBaseDeDatos
DB_PORT=PuertoDeBaseDeDatos

### Ejecución

Para poner en funcionamiento el proyecto, debes iniciar tanto el backend como el frontend. Sigue estos pasos para hacerlo:

1. **Iniciar el Backend**

   Primero, navega a la carpeta `backend` desde la línea de comandos.

   Luego, inicia el servidor backend ejecutando: npm start

Esto debería poner en marcha el servidor backend en el puerto especificado.

2. **Iniciar el Frontend**

En una nueva terminal, navega a la carpeta raíz del proyecto.

Ahora, inicia el frontend con el siguiente comando: npm run dev

Esto levantará el frontend, accesible a través de un navegador web en `http://localhost:3000`
