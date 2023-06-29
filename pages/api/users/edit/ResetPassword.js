import { validatePassword } from '@/app/api/accounts/ValidatePass/core';
import { apiHandler } from '@/app/helpers/api/api-handler';
import sequelize from '@/database/config';
const moment = require('moment');
const CryptoJS = require('crypto-js');
const { v4 } = require('uuid');
import User from '@/database/models/user';
export default apiHandler(handler);

function handler(req, res) {
    switch (req.method) {
        case 'PUT':
            return changePassword();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function changePassword() {
        const newUserTransaction = await sequelize.transaction();
        const { id_user, user_name, password, conf_pass } = req.body;

        //La contraseña debe tener Al menos 8 carácteres, al menos un dígito, debe contener al menos 1 letra mayúscula, 1 letra minúscula y 1 número, Puede contener caracteres especiales.
        const passwordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm


        try {

            //validaciones 

            //validando que ha sido recibido el dato a cambiar
            // validando que se ha enviado un userName

            if (!user_name) {
                res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'No se ha recibido ningún usuario.'
                });
                return;
            }

            if (!password) {
                res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar la contraseña a registrar.'
                });
                return;
            }

            // validando si el password nuevo cumple con las expresiones regulares
            if (!passwordValid.test(password)) {
                res.status(400).json({
                    title: 'Se ha detectado un error por dato inválido.',
                    message: 'La contraseña debe tener Al menos 8 carácteres, al menos un dígito, debe contener al menos 1 letra mayúscula, 1 letra minúscula y 1 número, Puede contener caracteres especiales.'
                });
                return;
            }

            // Validando confirmacion de password

            if (!conf_pass) {
                res.status(400).json({
                    title: 'Se ha detectado un error por falta de datos.',
                    message: 'Debe ingresar la confirmación de contraseña.'
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

            const userSearched = await User.findOne({
                where: {
                    user_name: user_name,
                },
                order: [
                    ['user_name', 'DESC']
                ]
            });


            const validatePASw = await validatePassword(userSearched, password)

            if (validatePASw === true) {
                res.status(400).json({
                    title: 'Se ha detectado un error de dato inválido.',
                    message: 'Las contraseñas ingresada es igual a la que ya tiene el usuario.'
                });
                return;
            }

            const salt = CryptoJS["lib"].WordArray.random(128 / 8).toString();
            const hash = CryptoJS['PBKDF2'](password, salt, { keySize: 256 / 32, iterations: 1000 }).toString();

            const updateUserPass = {
                user_update: req.user.username,
                user_name: user_name,
                hash: hash,
                salt: salt,
                date_update: moment().format('YYYY-MM-DD')
            };

            await User.update({ user_update: updateUserPass.user_update, date_update: updateUserPass.date_update, salt: updateUserPass.salt, hash: updateUserPass.hash }, {
                where: {
                    user_name: updateUserPass.user_name
                }
            });

            await newUserTransaction.commit();

            return res.status(200).send({ title: 'Operación exitosa', message: 'Se editado la contraseña correctamente.', status: 200 })
        } catch (error) {
            await newUserTransaction.rollback();
            throw error;
        }
    }

}