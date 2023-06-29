import { apiHandler } from '@/app/helpers/api/api-handler';
import sequelize from '@/database/config';
import User from '@/database/models/user';
import User_Profile from '@/database/models/user_profile'

const moment = require('moment');
const CryptoJS = require('crypto-js');
const { v4 } = require('uuid');

export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return createUser()
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function createUser() {
        const newUserTransaction = await sequelize.transaction();

        try {

            const { firstname, lastname, email, phone, password, conf_pass, id_profile } = req.body;
            //Permite letras,no permite _ o . en el inicio ni al final , no permine _. y una longitud de 3 a 15
            const validausuario = /^(?=.{3,15}$)(?![_.])(?![0-9])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

            //La contraseña debe tener Al menos 8 carácteres, al menos un dígito, debe contener al menos 1 letra mayúscula, 1 letra minúscula y 1 número, Puede contener caracteres especiales.
            const passwordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm

            const esValido = /^\d{8}$/

            //Realizando validaciones
            //Validando la llegada de un nombre de usuario
            if (!firstname) {
                return res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar el primer nombre'
                });
            }

            if (!lastname) {
                return res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar el primer apellido'
                });
            }

            if (!email) {
                return res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar su email'
                });
            }

            if (!phone) {
                return res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar su número de teléfono'
                });
            }

            if (!esValido.test(phone)) {
                return res.status(400).json({
                    title: 'Se ha detectado un error por dato inválido.',
                    message: 'El número de teléfono debe tener 8 digitos.'
                });
            }


            if (!id_profile) {
                return res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar del perfil de usuario'
                });
            }

            //Validacion de dato entrante
            if (!password) {
                res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar la contraseña.'
                });
                return;
            }


            // Validando confirmacion de password

            if (!conf_pass) {
                res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar la confirmación de contraseña.',
                    status: 400
                });
                return;
            }

            // Validando que la contraseñas sean iguales

            if (password != conf_pass) {
                res.status(400).json({
                    title: 'Se ha detectado un error de dato inválido.',
                    message: 'Las contraseñas ingresadas deben ser iguales'
                });
                return;
            }

            //Validando si cumple con los parametros
            /* if (!validausuario.test(userName)) {
                 res.status(400).json({
                     title: 'Usuario inválido. Asegurarse de cumplir la siguiente condición.',
                     message: 'Permite letras,no permite _ o . en el inicio ni al final , no permine _. y una longitud de 3 a 15'
                 });
                 return;
             }*/

            //Validando si existe un nombre de usuario igual

            const user_name = firstname.charAt(0) + lastname;

            const userNameExist = await User.findAll({
                where: {
                    user_name,
                }
            });

            if (userNameExist.length > 0) {
                res.status(400).json({
                    title: 'Se ha detectado un error, dato inválido.',
                    message: 'El nombre de usuario ya existe en la base de datos.'
                });
                return;
            }



            //Validando que el password cumpla con la sintaxis que nosotros queremos, con ayuda de
            //expresiones regulares

            if (!passwordValid.test(password)) {
                res.status(400).json({
                    title: 'Se ha detectado un error por dato inválido.',
                    message: 'La contraseña debe tener Al menos 8 carácteres, al menos un dígito, debe contener al menos 1 letra mayúscula, 1 letra minúscula y 1 número, Puede contener caracteres especiales.'
                });
                return;
            }

            const salt = CryptoJS["lib"].WordArray.random(128 / 8).toString();
            const hash = CryptoJS['PBKDF2'](password, salt, { keySize: 256 / 32, iterations: 1000 })
                .toString();


            const newUser = {
                user_create: req.user.username,
                user_update: req.user.username,
                date_create: moment().format('YYYY-MM-DD'),
                date_update: moment().format('YYYY-MM-DD'),
                id_users: v4(),
                user_name: user_name.toLowerCase(),
                salt: salt,
                hash: hash,
                status: "ACTIVO",
                name: firstname + " " + lastname,
                email: email,
                phone: phone
            };

            const newProfileUser = {
                id_user_profile: v4(),
                id_users: newUser.id_users,
                id_profile: id_profile.value
            };

            await User.create(newUser, {
                transaction: newUserTransaction
            });

            await User_Profile.create(newProfileUser, {
                transaction: newUserTransaction
            });

            await newUserTransaction.commit();

            return res.status(200).json({
                title: 'Operación exitosa',
                message: 'El usuario se ha creado correctamente.',
                newUser,
                status: 200
            });

        } catch (error) {
            await newUserTransaction.rollback()
            throw error;
        }

    }

}

