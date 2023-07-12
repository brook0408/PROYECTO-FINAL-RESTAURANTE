const AWS = require('aws-sdk');
const ses = new AWS.SES();
const mysql = require("mysql2");
const conexion = mysql.createConnection({
    host: "proyecto-final-dev-mydatabase-fnxxevi4pvva.cyseurqujrbn.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "12345678",
    database: "restaurante_proyecto_final"
});

function getDataByString(value) {
    const oValue = {};
    value.split("&").forEach((_value) => {
        const tmpValue = _value.split("=");
        oValue[tmpValue[0]] = tmpValue[1];
    });
    return oValue;
}

module.exports.handler = async (event) => {
    // Obtener los datos del pedido del evento recibido

    // Crear una instancia del servicio SQS
    const sqs = new AWS.SQS();

    // Configurar los parámetros del mensaje
    const params = {
        MessageBody: JSON.stringify(event.body), // Obtener los datos del pedido del evento recibido
        QueueUrl: 'https://sqs.us-east-1.amazonaws.com/574448609231/order-queue' // Reemplaza con tu URL de la cola
    };

    try {
        // Enviar el mensaje a la cola
        await sqs.sendMessage(params).promise();

        // Enviar el correo electrónico al cliente
        const emailParams = {
            Destination: {
                ToAddresses: ['sasnidia11@gmail.com'] // Reemplaza con la dirección de correo electrónico del destinatario verificado
            },
            Message: {
                Body: {
                    Text: {
                        Data: '¡Gracias por tu pedido!' // Reemplaza con el cuerpo del mensaje que deseas enviar
                    }
                },
                Subject: {
                    Data: 'Confirmación de pedido' // Reemplaza con el asunto del correo electrónico
                }
            },
            Source: 'gianella6456@gmail.com' // Reemplaza con tu dirección de correo electrónico de origen verificada
        };

        await ses.sendEmail(emailParams).promise();
        const datos = getDataByString(event.body);

        // Verificar si los campos requeridos están definidos
        if (datos.nombre && datos.direccion && datos.telefono && datos.correo_electronico && datos.producto && datos.cantidad && datos.valor_unidad && datos.valor_total) {
            conexion.execute(
                "INSERT INTO Cliente (nombre_completo, direccion, telefono, correo_electronico) VALUES (?, ?, ?, ?)",
                [datos.nombre, datos.direccion, datos.telefono || null, datos.correo_electronico],
                (error, clienteResults, fields) => {
                    if (error) {
                        // Manejar el error de la consulta
                        console.error('Error al insertar datos del cliente:', error);
                        return {
                            statusCode: 500,
                            body: JSON.stringify({ message: 'Error al crear el pedido', error: error.message })
                        };
                    }

                    // Insertar datos en la tabla Pedido
                    const clienteId = clienteResults.insertId;
                    conexion.execute(
                        "INSERT INTO Pedido (cliente_id, producto, cantidad, valor_unidad, valor_total) VALUES (?, ?, ?, ?, ?)",
                        [clienteId, datos.producto, datos.cantidad, datos.valor_unidad, datos.valor_total],
                        (pedidoError, pedidoResults, pedidoFields) => {
                            if (pedidoError) {
                                // Manejar el error de la consulta
                                console.error('Error al insertar datos del pedido:', pedidoError);
                                return {
                                    statusCode: 500,
                                    body: JSON.stringify({ message: 'Error al crear el pedido', error: pedidoError.message })
                                };
                            }
                            // La consulta se ejecutó correctamente
                            console.log('Pedido creado correctamente');
                            return {
                                statusCode: 200,
                                body: JSON.stringify({ message: 'Pedido creado exitosamente' })
                            };
                        }
                    );
                }
            );
        } else {
            // Si alguno de los campos requeridos no está definido, retornar un error
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Faltan campos requeridos en el pedido' })
            };
        }
    } catch (error) {
        // En caso de error, manejarlo adecuadamente

        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error al crear el pedido', error: error.message })
        };
    }
};
