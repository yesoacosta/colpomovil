// generate.js

// Usa la sintaxis de exportación por defecto para Vercel Functions
export default async (req, res) => {
    // 1. Solo acepta solicitudes POST
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    try {
        const requestBody = req.body;
        // 2. Lee la clave de las variables de entorno de Vercel
        const apiKey = process.env.GEMINI_API_KEY; 

        if (!apiKey) {
            // Este es un error 500 claro si no se encuentra la variable
            return res.status(500).json({ error: 'GEMINI_API_KEY no configurada en el servidor de Vercel.' });
        }

        const model = "gemini-2.5-flash-preview-05-20"; 
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        // 3. Envía la solicitud a la API de Gemini
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody), 
        });

        // 4. Procesa la respuesta de Google
        const data = await response.json();

        if (!response.ok) {
            console.error("Error de API de Google:", data);
            // Devuelve el código de error de Google
            return res.status(response.status).json(data);
        }

        // 5. Devuelve el resultado al frontend (200 OK)
        res.status(200).json(data);

    } catch (error) {
        console.error("Error en la función sin servidor:", error);
        res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud: ' + error.message });
    }
};
