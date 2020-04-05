const jwt = require('jsonwebtoken');
const JWT_EXPIRATION_TIME = '60m';

module.exports.handler = (event, context, callback) => {
    const { username, password } = JSON.parse(event.body);
    try {
        // Authenticate user
        if (username === process.env.USERNAME && password === process.env.PASSWORD) {       
            // Issue JWT
            const token = jwt.sign({ user: {username} }, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRATION_TIME });
            const response = { // Success response
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    token,
                }),
            }
            callback(null, response);
        } else {
            throw new Error('Incorrect user and password');
        }
    } catch (e) {
        const response = { // Error response
            statusCode: 401,
            headers: {
            'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                error: e.message,
            }),
        };
        callback(null, response);
    }
};