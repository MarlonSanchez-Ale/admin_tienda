import User from '@/database/models/user';
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
import { apiHandler } from '../../../../app/helpers/api/api-handler';

import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();

const KEY = serverRuntimeConfig.JWT_KEY;

export default apiHandler(handler);

function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return authenticate();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function authenticate() {
    try {
      const { userName, password } = req.body;

      //Permite letras,no permite _ o . en el inicio ni al final , no permine _. y una longitud de 3 a 15
      const validausuario = /^(?=.{3,15}$)(?![_.])(?![0-9])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

      //La contraseña debe tener al más de 15 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico.
      const passwordValid = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{4,}$/

      //Validacion de datos
      // Errores con estado 400, estos son utilizados para errores de parte del cliente, el cual ha ingresado datos invalidos o no ha ingresado un dato

      //Validando que ha llegado un userName desde el cliente
      if (!userName) {
        return res.status(400).json({
          title: 'Se ha detectado un error por falta de datos.',
          message: 'Debe ingresar el nombre de usuario'
        });
      }


      //Validando que el username cumpla con los parametros de las expresiones regulares.
      if (!validausuario.test(userName)) {
        res.status(400).json({
          title: 'Se ha detectado un error, el nombre de usuario es inválido.',
          message: 'Permite letras,no permite _ o . en el inicio ni al final , no permine _. y una longitud de 3 a 15'
        });
        return;
      }


      if (!password) {
        return res.status(400).json({
          title: 'Se ha detectado un error por falta de datos.',
          message: 'Debe ingresar la contraseña'
        });
      }

      //Validando que la contraseña  cumpla con las expresiones regulares
      /*if (!passwordValid.test(password)) {
        res.status(400).json({
          title: 'Se ha detectado un error, la contraseña es inválida',
          message: 'La contraseña debe tener al más de 5 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico.'
        });
        return;
      }*/

      // Validando si existe el usuario ingresado
      //Los errores con codigo 404 se dan cuando el servidor no pudo encontrar el contenido solicitado

      const userSearched = await User.findOne({
        where: {
          user_name: userName,
        },
        order: [
          ['user_name', 'DESC']
        ]
      });

      //console.log(userSearched)

      if (!userSearched) {
        res.status(404).json({
          title: 'Se ha detectado un error, no se encontró el usuario ingresado.',
          message: 'El usuario ingresado no existe en la base de datos, asegurese de escribir el usuario correctamente.'
        });
        req?.log?.info(`-authenticate- Usuario no encontrado: ${userName}`);
        throw "Usuario no encontrado";
        return;
      }

     

      const dataUser = userSearched.toJSON();
      const userId = dataUser.userId,
        userUsername = dataUser.userName,
        userStatus = dataUser.userStatus

        //Validando si el usuario esta activo

        if(userStatus === 'INACTIVO') {
          res.status(404).json({
            title: 'Se ha detectado un error, usuario no activo.',
            message: 'El usuario ingresado existe en la base de datos, sin embargo no se encuentra activo.'
          });
          req?.log?.info(`-authenticate- Usuario no encontrado: ${userName}`);
          throw "Usuario no encontrado";
          return;
        }

      //Validando que el password es correcto 

      const inputHash = CryptoJS['PBKDF2'](password, userSearched.salt, { keySize: 256 / 32, iterations: 1000 }).toString();
      const passwordsMatch = userSearched.hash === inputHash

      if (!passwordsMatch) {
        res.status(404).json({
          title: 'Se ha detectado un error, contraseña incorrecta.',
          message: 'Asegurese de escribir la contraseña correctamente.'
        });
        req?.log?.info(`-authenticate- Contraseña incorrecta: ${userName}`);
        throw "Contraseña incorrecta";
        return;
      }

      //Creacion de token de seguridad


      /* Create JWT Payload */
      const payload = {
        id_user: userId,
        username: userName,
      };
      /* Sign token */
      const token = jwt.sign(payload, KEY, { expiresIn: 31556926 });

      req?.log?.info(`-authenticate- Autenticado correctamente: ${userUsername}`);
      
      return res.status(200).json({
        title: 'Operación exitosa!',
        message: 'Bienvenido al portal Puntos Luz.',
        id_user: userId,
        username: userName,
        token,
      });

    } catch (error) {
      req?.log?.error(`-authenticate- Error: ${error}`);
      throw error;
    }
  }
}