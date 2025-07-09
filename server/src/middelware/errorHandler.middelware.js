const { ApiError } = require("../utils/ApiError.utils.js");

const errorHandler = (err, req, res, next) => {
  // If the error is an instance of ApiError, use its properties
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
      success: err.success,
      errors: err.errors,
      data: err.data,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    });
  }

  // Handle MongoDB/Mongoose specific errors
  let error = { ...err };
  let message = err.message;
  let statusCode = 500;
  let errors = [];

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
    errors = Object.values(err.errors).map(val => ({
      field: val.path,
      message: val.message,
      value: val.value
    }));
  }

  // Mongoose Duplicate Key Error (E11000)
  else if (err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate Entry Error';
    
    // Extract field name from error message
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    
    // Customize message based on field
    let fieldMessage = '';
    if (field === 'phone') {
      fieldMessage = `Phone number '${value}' is already registered`;
    } else if (field === 'email') {
      fieldMessage = `Email address '${value}' is already registered`;
    } else {
      fieldMessage = `${field} '${value}' already exists`;
    }
    
    errors = [{
      field: field,
      message: fieldMessage,
      value: value
    }];
  }

  // Mongoose Cast Error (Invalid ObjectId, etc.)
  else if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid Data Format';
    errors = [{
      field: err.path,
      message: `Invalid ${err.kind} for field ${err.path}`,
      value: err.value
    }];
  }
    

  // MongoDB Connection Errors
  else if (err.name === 'MongoNetworkError' || err.name === 'MongoTimeoutError') {
    statusCode = 503;
    message = 'Database Connection Error';
    errors = [{
      message: 'Unable to connect to database. Please try again later.'
    }];
  }

  // Handle other MongoDB errors
  else if (err.name && err.name.startsWith('Mongo')) {
    statusCode = 500;
    message = 'Database Error';
    errors = [{
      message: err.message || 'An unexpected database error occurred'
    }];
  }

  // Handle non-MongoDB exceptions (unexpected errors)
  else {
    console.log(err)

    statusCode = 500;
    message = "Internal Server Error";
    errors = [];
  }

  return res.status(statusCode).json({
    statusCode,
    message,
    success: false,
    errors,
    data: null,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
};

module.exports = { errorHandler };