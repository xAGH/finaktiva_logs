# Entrega de Prueba Técnica - Finaktiva

Estimado equipo de Finaktiva,

Adjunto encontrarán la solución desarrollada para la prueba técnica solicitada. A continuación, proporciono
detalles sobre la implementación realizada.

## Detalles de la Solución

- **Tecnologías Utilizadas:**

  - Backend
    - NodeJs versión 22.6.0
    - ExpressJS versión 4.19.2
    - Typescript versión 5.5.4
  - Frontend
    - NodeJs versión 22.6.0
    - Angular versión 18.2.0
    - TailwindCSS versión 3.4.10
  - Almacenamiento
    - MongoDB versión 8.0.0
  - Despliegue
    - Railway ([link](https://client-production-0c7b.up.railway.app/))
    - Docker versión 27.1.1

- **Arquitectura:**
  - He seguido una arquitectura limpia hexagonal basada en puertos y adaptadores.

## Instrucciones y despliegue

La aplicación ha sido desplegada en [Railway](https://client-production-0c7b.up.railway.app/).
Además, se han subido imágenes de docker al repositorio oficial de docker bajo los nombres de:

- Backend: xagh/finaktiva-technical-test-server
- Frontend: xagh/finaktiva-technical-test-client

### Inicialización con docker

> Requisitos: docker >= 27.1.1

En el directorio raíz se encuentra un archivo `docker-compose.yml` que permite inicializar, configurar y enlazar los 3 contenedores, para esto es necesario ejecutar el comando `docker compose up -d` en la raíz del proyecto. Esto, por defecto, comenzará los 3 servicios con un enlace de puertos a la máquina local de esta manera:

- Backend: puerto 3000
- Base de datos: puerto 27017
- Frontend: puerto 8080

### Inicialización manual

> Requisitos: NodeJs >= 22.6.0, MongoDB >= 8.0.0

- Ingresar a la carpeta `backend`
- Instalar las dependencias con npm (o algún gestor de paqetes de NodeJs): `npm install`
- Crear un archivo llamado .env con. Este archivo contiene las variables de entorno requeridas. Ejemplo:
  ```ini
  PORT = 3000
  HOST = http://localhost
  MONGO_URI=`mongodb://finaktiva:finaktiva@localhost:27017/Registration`;
  ```
- Levantar el servidor con el comando `npm start` (o en modo de desarolllo con `npm run dev`)
- Volver a la carpeta raíz `backend`
- Ingresar a la carpeta `frontend`
- Instalar las dependencias con npm (o algún gestor de paqetes de NodeJs): `npm install`
- Modificar, si es necesario, el archivo `frontend/src/environments/environment.ts`
- Levantar el servidor con el comando `ng serve`

## Tipos

Los siguientes modelos pueden ser de utilidad:

```ts
enum Type {
  API,
  FORM,
}
```

```ts
enum Severity {
  ERROR,
  DEBUG,
  WARNING,
  SECURITY,
  INFORMATION,
}
```

```ts
interface Response {
  status: boolean;
  data: any;
  message: string;
}
```

## Endpoints

Todos los endpoints tienen el prefijo `/event` y el modelo de respuesta `Response`

- `GET /`

  - Descripcion: Obtiene todos los eventos.
  - Respuesta: Lista de los eventos.

- `GET /`

  - Descripcion: Obtiene los eventos que coincidan con los filtros suministrados.
  - Parámetros de consulta, todos son opcionales y la mayoria stackeables:
    - `id: string[]` (Identificadores de los eventos)
    - `description: string[]` (Descripciones de los eventos)
    - `type: Type[]` (Tipos de los eventos)
    - `severity: Severity[]` (Severidad de los eventos)
    - `dateMin: string` (Valor de la fecha mínima para el filtro de rango de fechas)
    - `dateMax: string` (Valor de la fecha máxima para el filtro de rango de fechas)
    - `timeMin: string` (Valor de la hora mínima para el filtro de rango de horas)
    - `timeMax: string` (Valor de la hora máxima para el filtro de rango de horas)
  - Respuesta: Información de los eventos filtrados.

- `POST /`

  - Descripción: Crea un nuevo evento.
  - Body, todos los elementos son requeridos:

    ```ts
    interface {
      "date": string, // ISO format
      "time": string ,// ISO format
      "description": string,
      "type": Type,
      "severity": Severity
    }
    ```

  - Respuesta: Información del evento creado.

- `DELETE /:id`

  - Descripción: Elimina un evento existente.
  - Parámetro de ruta, requerido:
    - `id: string` (Identificador del evento a eliminar)
  - Respuesta: No-Content.
