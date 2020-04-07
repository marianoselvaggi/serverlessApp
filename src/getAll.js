const connectToDatabase = require('../db');

module.exports.handler = async () => {
    try {
      const { Note } = await connectToDatabase();
      const notes = await Note.findAll();
      return {
        statusCode: 200,
        body: JSON.stringify(notes)
      };
    } catch (err) {
      return {
        statusCode: err.statusCode || 500,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Could not fetch the notes.'
      };
    }
};