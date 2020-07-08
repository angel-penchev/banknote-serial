const successMessage = { status: 'success' };
const errorMessage = { status: 'error' };
const status = {
  success: 200,
  created: 201,
  nocontent: 204,
  bad: 400,
  unauthorized: 401,
  notfound: 404,
  conflict: 409,
  error: 500,
};

const trip_statuses = {
  active: 1.00,
  cancelled: 2.00,
}

export {
  successMessage,
  errorMessage,
  status,
  trip_statuses,
};
