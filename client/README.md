
# Proyecto client para la gestion de usuarios, roles, permisos y licencias

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
npm run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

## test


#### PARA CONVERTIR AAB to APK
java -jar bundletool-all-1.8.2.jar build-apks --bundle=app.aab --output=app.apks --mode=universal
Cambiar extencion a .rar el archivo resultante
Extraer el universal.apk