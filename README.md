# PROYECTO-FINAL-RESTAURANTE

 Proyecto de Toma de Pedidos a Domicilio de un Restaurante
El propósito de este proyecto es reforzar los conocimientos adquiridos durante las clases y fomentar la investigación y resolución de problemas. El enfoque principal está en la creación de una infraestructura completa utilizando CloudFormation para asegurar que todos los recursos estén centralizados.

Descripción del Proyecto
Se desarrollará una aplicación completa para la toma de pedidos a domicilio de un restaurante. El proyecto se enfoca principalmente en la infraestructura, por lo que no es necesario profundizar en los detalles de las tablas y el código.

La aplicación permitirá a los clientes realizar pedidos proporcionando la siguiente información:

Datos del Cliente:

-Nombre completo

-Dirección

-Teléfono

-Correo electrónico

-Detalles del Pedido:

Producto

-Cantidad

-Valor unitario

-Valor total

Una vez que se realice un pedido, el cliente recibirá una notificación por correo electrónico que mostrará los detalles del pedido. Además, el pedido se colocará en una cola para su posterior procesamiento y envío.
Los propietarios del restaurante podrán acceder a través de un API Gateway que contará con dos servicios:

POST: Para crear un pedido.

GET: Para buscar un pedido por su identificador.

Cada pedido será almacenado en un bucket de respaldo. Los archivos en este bucket se eliminarán automáticamente después de dos días.

Requisitos

Asegúrate de cumplir con los siguientes requisitos antes de comenzar con la instalación:

Node.js: Descargar e Instalar Node.js

https://nodejs.org/en

AWS Account: Crea una cuenta en AWS si aún no tienes una.

https://aws.amazon.com/es/

Framework Serverless: Instala el framework Serverless utilizando el siguiente comando:

npm install -g serverless

MySQL: Descargar e Instalar MySQL Workbench

Instalación

Sigue los pasos a continuación para instalar y configurar el proyecto:

Clona el repositorio:

git clone URL_DEL_REPOSITORIO

Reemplaza URL_DEL_REPOSITORIO con la URL de tu repositorio en GitHub.

Instala las dependencias:

Copy code

npm install

Configura la base de datos:

Crea una base de datos en MySQL.

host: “proyecto-final-dev-mydatabase-fnxxevi4pvva.cyseurqujrbn.us-east-1.rds.amazonaws.com”

user: “admin”

pass: 12345678,

database: "restaurante_proyecto_final"

Configura AWS:

-Crea una cuenta en AWS si aún no tienes una.

Configura tus credenciales de AWS en tu máquina local.

con los comandos: en el cual te pedira ingresar tus datos

AWS Access Key ID

AWS Secret Access Key


aws configure

aws s3 ls

Configura CloudFormation:

Revisa el archivo serverless.yml y asegúrate de que los recursos (RDS, SQS, S3, SES, etc.) estén configurados correctamente.

Despliega la infraestructura:

serverless deploy

Esto creará y configurará todos los recursos en AWS utilizando CloudFormation.


Accede a la aplicación:

Utiliza el API Gateway para acceder a los servicios:

POST: https://uzpird8co9.execute-api.us-east-1.amazonaws.com/dev/orders)

GET: https://uzpird8co9.execute-api.us-east-1.amazonaws.com/dev/orders){orderId}

¡Listo! Ahora puedes comenzar a utilizar la aplicación de toma de pedidos.

Contacto
Si tienes alguna pregunta o sugerencia, no dudes en contactarme.

Nombre: Gianella vanessa Londoño Rios

Correo electrónico: gianella.londono26762@ucaldas.edu.co

Telefono: 320 6513043
