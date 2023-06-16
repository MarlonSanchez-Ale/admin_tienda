//const path = require("path");
const fs = require("fs");
const db = require("../../../db/databaseIndex");
const logger = require('../../services/logger.service')
import { Parser } from "json2csv";

export {
  isJsonString,
  downloadResource
}

/**
 * Verifica si un string es un Json valido.
 * Devuelve una respuesta indicando si es un json o no, pero tambien el contenido del JSON.
 * Tener en cuenta que si la cadena no tiene algun contenido,
 * se considera que no es un json.
 *
 * @param {string} str Cadena de texto a evaluar
 * @returns {object} Retorna un objeto con la informacion del json
 * Ejemplo: {isJson: boolean, jsonValue: object}
 */
function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return { isJson: false, jsonValue: null };
  }

  return { isJson: true, jsonValue: JSON.parse(str) };
}

const downloadResource = (
  res,
  fileName,
  fields,
  data,
  options = {
    delimiter: ";",
    quote: '"',
    contentType: "text/csv",
    header: true,
  }
) => {
  const json2csv = new Parser({
    fields,
    delimiter: options.delimiter,
    quote: options.quote,
    header: options.header,
  });
  const csv = json2csv.parse(data);
  res.setHeader("Content-Type", options.contentType);
  res.setHeader("Content-disposition", `attachment; filename=${fileName}`);
  return res.send(csv);
};