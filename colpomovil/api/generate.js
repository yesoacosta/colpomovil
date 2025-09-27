// generate.js

// 1. Manejador de la Solicitud
export default async (req, res) => {
    // 2. Solo acepta solicitudes POST
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    try {
        // 3. Extrae el contenido del cuerpo de la solicitud (payload)
        const requestBody = req.body;

        // 4. Utiliza la variable de entorno para la clave API
        const apiKey = process.env.GEMINI_API_KEY; 

        if (!apiKey) {
            return res.status(500).json({ error: 'GEMINI_API_KEY no configurada en el servidor.' });
        }

        const model = "gemini-2.5-flash-preview-05-20"; // El modelo que estás usando
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        // 5. Envía la solicitud a la API de Gemini
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody), // Envía el payload que recibiste
        });

        const data = await response.json();

        // 6. Si la respuesta de Google no es OK, devuelve el error
        if (!response.ok) {
            console.error("Error de API de Google:", data);
            return res.status(response.status).json(data);
        }

        // 7. Devuelve el resultado al frontend de tu aplicación
        res.status(200).json(data);

    } catch (error) {
        console.error("Error en la función sin servidor:", error);
        res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud.' });
    }
};