// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    // Log the error for debugging purposes
    console.error(err.stack);
  
    // If headers are already sent, delegate to default Express error handler
    if (res.headersSent) {
      return next(err);
    }
  
    // Use error status code if set, otherwise default to 500
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      message: err.message || 'Internal Server Error',
      // In production, you might not want to expose the error stack
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    });
  };
  
  module.exports = errorHandler;
  