const logger = require('../../../app/services/logger.service')
import _ from 'lodash';
import { getWorkbookFromJsObj } from 'app/utils/files/WorkSheet';


export default async function handler(req, res) {
  try {
    res.setHeader('Content-Type', 'application/vnd.ms-excel');
    res.setHeader('Content-Disposition', 'attachment; filename="newFilename.xlsx"');
    res.status(200);
    getWorkbookFromJsObj(req.body).xlsx.write(res).then(() => res.end());
  } catch (error) {
    const child = logger.child({ errMessage: error.message, printStack: error.stack });
    child.fatal(`can't get shop report : ${JSON.stringify(req.body)}`);
    res.status(500).end('can\'t get shop report.')
  }
}
