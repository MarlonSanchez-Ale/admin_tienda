import logger from '../../../services/logger.service'

const CryptoJS = require('crypto-js');

export async function validatePassword(userInstance, inputPassword) {
    logger.info('validating user pass');
    
  
    try {
      const inputHash = CryptoJS['PBKDF2'](inputPassword, userInstance.salt, {keySize: 256 / 32, iterations: 1000})
        .toString();
  
      const passwordsMatch = userInstance.hash === inputHash
      logger.info('validating user pass the result is: ' + passwordsMatch);
      return passwordsMatch
  
    } catch (error) {
      const child = logger.child({errMessage: error.message, printStack: error.stack});
      child.fatal(`Unable to validate the user pass : validatePassword`);
    }
  
    return false;
  }