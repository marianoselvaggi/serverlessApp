const connectToDatabase = require('../db');
const HTTPError = require('../utils/httpError');

module.exports.handler = async (event) => {
    try {
      const { Note } = await connectToDatabase()
      const note = await Note.create(JSON.parse(event.body))
      return {
        statusCode: 200,
        body: JSON.stringify(note)
      }
    } catch (err) {
      return {
        statusCode: err.statusCode || 500,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Could not create the note.'
      }
    }
  }