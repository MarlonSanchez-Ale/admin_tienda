import User from '@/database/models/user';
import sequelize from '@/database/config';
import Connection from '../connection/connection';

export default async function handler(req, res) {

    try {

        await Connection();

        /*const conection = await sequelize.authenticate();
        console.log(conection)
        if (!conection) {
            return res.status(500).json({ mensaje: 'No se pudo establecer la conexión a la base de datos.' });
        }*/

        if (req.method === 'POST') {

            if (!req.body) {
                return res.status(404).json({ message: "Don't have form data... " })
            }

            const { username, password } = req.body;
            //Permite letras,no permite _ o . en el inicio ni al final , no permine _. y una longitud de 3 a 15
            const validausuario = /^(?=.{3,15}$)(?![_.])(?![0-9])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

            //La contraseña debe tener al más de 15 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico.
            const passwordValid = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/

            //Validacion de datos
            // Errores con estado 400, estos son utilizados para errores de parte del cliente, el cual ha ingresado datos invalidos o no ha ingresado un dato

            //Validando que ha llegado un userName desde el cliente
            if (!username) {
                return res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar el nombre de usuario'
                });
            }


            //Validando que el username cumpla con los parametros de las expresiones regulares.
            if (!validausuario.test(username)) {
                res.status(400).json({
                    title: 'Se ha detectado un error, el nombre de usuario es inválido.',
                    message: 'Permite letras,no permite _ o . en el inicio ni al final , no permine _. y una longitud de 3 a 15'
                });
                return;
            }


            if (!credentials.password) {
                return res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar la contraseña'
                });
            }

            //Validando que la contraseña  cumpla con las expresiones regulares
            if (!passwordValid.test(credentials.password)) {
                res.status(400).json({
                    title: 'Se ha detectado un error, la contraseña es inválida',
                    message: 'La contraseña debe tener al más de 5 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico.'
                });
                return;
            }

            // Validando si existe el usuario ingresado
            //Los errores con codigo 404 se dan cuando el servidor no pudo encontrar el contenido solicitado

            const userSearched = await User.findOne({
                where: {
                    user_name: credentials.username,
                },
                order: [
                    ['user_name', 'DESC']
                ]
            });



            if (!userSearched) {
                return res.status(404).json({
                    title: 'Se ha detectado un error, no se encontró el usuario ingresado.',
                    message: 'El usuario ingresado no existe en la base de datos, asegurese de escribir el usuario correctamente.'
                });

            }



            const dataUser = userSearched.toJSON();
            const userId = dataUser.id_users,
                userUsername = dataUser.user_name,
                userStatus = dataUser.status

            console.log(dataUser)
            //Validando si el usuario esta activo

            if (userStatus === 'INACTIVO') {
                return res.status(404).json({
                    title: 'Se ha detectado un error, usuario no activo.',
                    message: 'El usuario ingresado existe en la base de datos, sin embargo no se encuentra activo.'
                });

            }

            //Validando que el password es correcto 

            const inputHash = CryptoJS['PBKDF2'](credentials.password, userSearched.salt, { keySize: 256 / 32, iterations: 1000 }).toString();
            const passwordsMatch = userSearched.hash === inputHash

            console.log(passwordsMatch)

            if (!passwordsMatch) {
                return res.status(404).json({
                    title: 'Se ha detectado un error, contraseña incorrecta.',
                    message: 'Asegurese de escribir la contraseña correctamente.'
                });

            }


            return res.status(200).json({
                title: 'Operación exitosa!',
                message: 'Bienvenido al portal Puntos Luz.',
            });
        } else {
            return res.status(500).json({ message: 'HTTP METHOD NOT VALID ONLY POST ACCEPTED' })
        }

    } catch (error) {
        console.error('Error al insertar el usuario:', error);
        return res.status(500).json({ mensaje: 'Error al insertar el usuario en la base de datos.' });

    }
}