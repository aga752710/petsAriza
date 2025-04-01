const errorMessages = {
    USER_NOT_FOUND: "El usuario no fue encontrado.",
    USER_ALREADY_EXISTS: "El usuario ya existe.",
    PET_NOT_FOUND: "La mascota no fue encontrada.",
    INVALID_DATA: "Los datos proporcionados son inválidos.",
    SERVER_ERROR: "Ocurrió un error en el servidor."
};

const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = errorMessages[err.code] || "Error inesperado.";
    res.status(statusCode).json({ message });
};

export { errorHandler, errorMessages };
