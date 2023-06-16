var  {  expressjwt : jwt  }  =  require ( "express-jwt" ) ; 
const util = require('util');
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
const SECRET_KEY = serverRuntimeConfig.JWT_KEY;

export { jwtMiddleware };

function jwtMiddleware(req, res) {
    const middleware = jwt({ secret: SECRET_KEY, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/api/users/auth/authenticate'
        ]
    });

    return util.promisify(middleware)(req, res);
}