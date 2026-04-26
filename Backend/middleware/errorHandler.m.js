export const notFoundHandler = (req, res) => {
    res.status(404).json({ message: 'Route not found', success: false, status: 404 });
};

export const globalErrorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        message: err.message || 'Internal server error',
        success: false,
        status: err.status || 500,
    });
};