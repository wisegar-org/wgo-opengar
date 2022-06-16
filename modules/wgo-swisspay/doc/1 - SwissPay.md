# WGO-SWISSPAY

## Solucion una gestion segure de recibos de pagos

El proyecto consiste en la gestion de certificados de salarios. Una gestion basica al inicio.

Certificado de salario mensual: es un documento oficial del salario bruto con los detalles (jubulacion (x%), lpp (y%), .... n%) de cada descuento y la cantidad real de efectivo recibido (salario bruto - (...impuestos)).

Certificado de salario anual: es un documento oficial del salario bruto anual con sus respectivos impuestos anuales y otras especificaciones como bonus y otros. Es vital para la declaracion de impuestos al estado!

Actores:  

- Cliente: Entiendase como la empresa que se registra en la plataforma para distribuir la documentacion al los usuarios/empleados
- Usuario: Empleado de uno o mas clientes tanto historicamente como en paralello, el cual debe disponer de la documentacion distribuida por los clientes.

Caracteristicas del proyecto:

- Recibir documetacion a travez de un flujo de correos electronicos certificados.
- Archivar la documentacion recibida por clientes y usuarios.
- Distribuir la documentacion a cada usuario a travez de una app mobil.
- Permitir el registro de clientes a travez de una plataforma web.
- Permitir el registro de usuarios a travez de una app mobil/plataforma web.
- Cada registro db y/o trafico de datos debe ocurrir en modo de cifrado end-to-end!

Tegnologias:

- Backend: NodeJs
- Database: Postgres  
- Cliente Web: Quasar/Vue
- Cliente Mobil: Flutter? - React Native?  
