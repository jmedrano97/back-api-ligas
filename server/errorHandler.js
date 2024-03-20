// errorHandler.js
export const errorHandler = (err, req, res, next) => {
    console.error('LL',err.stack); // Registra el error para fines de depuración
    const respuesta = {
      status: err.status || 500,
      data: err.data || null,
      message: err.message || 'Hubo un error en el servidor',
      
    };
    res.status(respuesta.status).json(respuesta);
  };
  