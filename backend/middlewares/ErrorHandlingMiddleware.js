const errorHandlerMiddleware = (err, req, res, next) => {
    console.error(err); // Log the error
  
    if (err instanceof ValidationError) {
      return res.status(400).json({ message: err.errors[0].message }); // Validation errors
    }
  
    if (err.status) {
      return res.status(err.status).json({ message: err.message }); // Custom errors
    }
  
    return res.status(500).json({ message: 'Internal server error' }); // Unknown errors
  };
  
  module.exports = errorHandlerMiddleware;
  