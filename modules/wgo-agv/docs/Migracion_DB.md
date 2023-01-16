## Migración de la base de datos a la versión wgo-agv de wgo-opengar api

### Pasos:

* Acceder a la base de datos de origen de la migración (pgAdmin), y realizar independientemente las siguientes consultas

`ALTER TABLE "storage_entity" RENAME TO "storage"`

`ALTER TABLE "storage_entity_image_list_media" RENAME TO "storage_image_list_media"`

`DROP TABLE "template_entity"`

`DROP TABLE "session"`

`DROP TABLE "seo"`

`ALTER SEQUENCE "storage_entity_id_seq" RENAME TO "storage_id_seq"`

* Acceder al servidor de base de datos (consola) para hacer el backup de la base de datos

`pg_dump --column-inserts --data-only -h localhost -p 5432 -U postgres -d db_nombre_origen > backup.sql`

* Acceder a la base de datos destino de la aplicación (pgAdmin) y realizar la siguiente consulta

`TRUNCATE media, users, languages, roles CASCADE`

* Acceder al servidor de base de datos (consola) para restaurar el backup realizado

`psql -d wgo-agv-test -a -U postgres -h localhost -p 5432 < backup.sql`
