import moment from 'moment';

import query from '../db/query';

import {
  empty,
} from '../helpers/validations';


import {
  errorMessage, successMessage, status,
} from '../helpers/status';


/**
   * Add A Banknote
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
const addBanknoteDetails = async (req) => {
  req.files.forEach(async (file) => {
    const filename = file.filename;
    const original_name = file.originalname;
    const created_on = moment(new Date());

    if (empty(filename) || empty(original_name)) {
      errorMessage.error = 'All fields are required';
      return res.status(status.bad).send(errorMessage);
    }
    const createBanknoteQuery = `
            INSERT INTO
            banknotes(filename, original_name, created_on)
            VALUES($1, $2, $3)
            returning *`;

    const values = [
      filename,
      original_name,
      created_on
    ];

    try {
      await query.query(createBanknoteQuery, values);
    } catch (error) {
      errorMessage.error = 'Unable to add banknote';
    }
  });
};

const updateBanknoteSerial = async (detection_result) => {
  const serials = detection_result.serials;
  const files = detection_result.files;

  files.forEach(async (file, i) => {
    if (empty(file.filename) || empty(serials[i])) {
      errorMessage.error = 'All fields are required';
      return res.status(status.bad).send(errorMessage);
    }
    const createBanknoteQuery = `
              UPDATE banknotes
              SET serial = $1
              WHERE filename = $2`;

    const values = [
      serials[i],
      file.filename
    ];

    try {
      await query.query(createBanknoteQuery, values);
    } catch (error) {
      errorMessage.error = 'Unable to edit banknote';
    }
  });
};


/**
   * Get All Banknotes
   * @param {object} req
   * @param {object} res
   * @returns {object} banknotes array
   */
const getAllBanknotes = async (req, res) => {
  const getAllBanknoteQuery = 'SELECT * FROM banknotes ORDER BY id DESC';
  try {
    const { rows } = await query.query(getAllBanknoteQuery);
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      errorMessage.error = 'There are no banknotes';
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = 'An error Occured';
    return res.status(status.error).send(errorMessage);
  }
};


export {
  addBanknoteDetails,
  getAllBanknotes,
  updateBanknoteSerial
};
