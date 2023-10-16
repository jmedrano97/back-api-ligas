// errorHandler.js
export const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Registra el error para fines de depuración
    res.status(500).json({ error: 'Hubo un error en el servidor' });
  };
  