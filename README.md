# pccautofichaje

Esto es una herramienta de autofichaje para pccomponentes, usando el bot de Telegram. Deja tus fichajes programados con antelación, y olvídate de volver a fichar manualmente. Los fichajes programados se pueden borrar en cualquier momento usando la aplicación oficial de Telegram.

Esta herramienta hace login con tu cuenta de Telegram para poder programar todos los fichajes.

## Requisitos

- Tener una cuenta de Telegram, y el bot de `@pccomponentes_za_bot` configurado.
- `git`
- `docker`
- `docker-compose`
- `make`

## Setup

1. Clona el repo: `git clone https://github.com/pjnicolas/pccautofichaje`
2. Accede al la carpeta del repo: `cd pccautofichaje`
3. Copia el ejemplo del `.env`: `cp .env.example .env`
4. Edita el archivo `.env` que acabas de crear y añade tus `API_ID` y `API_HASH`. Estos valores los puedes conseguir de **https://my.telegram.org** , en la sección **Api development tools**.
5. Instala las dependencias: `make install`.

## Ejecución del script

1. Editar las variable de entorno `GENERATE_CALENDAR_*` a tu gusto en el archivo `.env`.
2. General el JSON de calendario con `make generate`
3. Revisar el archivo generado `calendar.json`. Aquí se muestran todos los fichajes que se van a programar en el siguiente paso. Eliminar alguna fecha si es festivo. Los fines de semana se filtran automáticamente.
4. Ejecutar el script principal con `make schedule`. Esto te pedirá tu número de teléfono (necesitas meterlo con prefijo, e.g. `+34626123123`). Tras meterlo, te llegará un mensaje a tu Telegram con un código de verificación. Introdúcelo en el siguiente paso.
5. Listo, ya tienes todos tus fichajes programados. Si miras el log, verás que después de la linea `You should now be connected` hay otra linea muy larga con un token. Si copias ese token a la variable de entorno `STRING_SESSION` en el archivo `.env`, el script no te pedirá que te loguees la proxima vez que lo ejecutes.
