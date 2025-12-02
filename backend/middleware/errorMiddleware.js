// Middleware for handling 404 (Not Found) errors
export const notFound = (req, res, next) => {
    // Create an Error object with the path that was requested
    const error = new Error(`Not Found - ${req.originalUrl}`);
    // Set the response status to 404
    res.status(404);
    // Pass the error to the next error handling middleware
    next(error);
};

// Middleware for handling all other errors
export const errorHandler = (err, req, res, next) => {
    // Sometimes the status code is 200 even on an error, so we force it to a 500 range
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    // Special case for Mongoose Bad ObjectId (CastError)
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404; // Treat bad IDs as a resource not found
        message = 'Resource not found';
    }

    res.status(statusCode).json({
        message: message,
        // Only show the stack trace if we are in development mode
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};