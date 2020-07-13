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

const updateBanknoteSerials = async (detection_result) => {
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
   * Get Banknotes
   * @param {object} req
   * @param {object} res
   * @returns {object} banknotes array
   */
const getBanknotes = async (req, res) => {
  const page = parseInt(req.query.page) || 0
  const size = parseInt(req.query.size) || null

  const getBanknotesQuery = `
              SELECT *
              FROM banknotes
              ORDER BY id DESC
              LIMIT $1
              OFFSET $2`;

  const values = [
    size,
    size * page
  ];

  try {
    const { rows } = await query.query(getBanknotesQuery, values);
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

/**
   * Patch Banknotes
   * @param {object} req
   * @param {object} res
   * @returns {object} banknotes array
   */
const patchBanknote = async (req, res) => {
  const id = parseInt(req.query.id)
  const name = req.query.name
  const serial = req.query.serial

  const patchBanknoteQuery = `
              UPDATE banknotes
              SET original_name = $1,
                  serial = $2
              WHERE id = $3`;

  const values = [
    name,
    serial,
    id
  ];

  try {
    await query.query(patchBanknoteQuery, values);
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = 'Unable to edit banknote';
    return res.status(status.error).send(errorMessage);
  }
};


export {
  addBanknoteDetails,
  getBanknotes,
  updateBanknoteSerials,
  patchBanknote
};
