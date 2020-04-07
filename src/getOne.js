const connectToDatabase = require('../db');
const HTTPError = require('../utils/httpError');

module.exports.handler = async (event, context, callback) => {
    try {
      const { Note } = await connectToDatabase();
      const note = await Note.findOne({where: {id: event.pathParameters.id}});
      if (!note) throw HTTPError(404, `Note with id: ${event.pathParameters.id} was not found`);
      return {
        statusCode: 200,
        body: JSON.stringify(note)
      };
    } catch (err) {
      return {
        statusCode: err.statusCode || 500,
        headers: { 'Content-Type': 'text/plain' },
        body: err.message || 'Could not fetch the Note.'
      };
    }
};