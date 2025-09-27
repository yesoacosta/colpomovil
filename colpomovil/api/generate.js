// generate.js - CÓDIGO DE PRUEBA DE CONEXIÓN

export default async (req, res) => {
    // Si la función se ejecuta, devolverá este mensaje.
    // Si ves este mensaje en el navegador, ¡la conexión está bien!
    return res.status(200).json({ 
        message: "Conexión con Vercel Serverless Function Exitosa.",
        patient: req.body // Devuelve el cuerpo de la petición para verificación
    });
};
