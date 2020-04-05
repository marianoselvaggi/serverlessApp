const connectToDatabase = require('../db');
const HTTPError = require('../utils/httpError');

module.exports.handler = async (event) => {
  try {
    const input = JSON.parse(event.body);
    const { Note } = await connectToDatabase();
    const note = await Note.findOne({where: {id:event.pathParameters.id}});
    if (!note) throw HTTPError(404, `Note with id: ${event.pathParameters.id} was not found`);
    if (input.title) note.title = input.title;
    if (input.description) note.description = input.description;
    await note.save();
    return {
      statusCode: 200,
      body: JSON.stringify(note)
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: err.message || 'Could not update the Note.'
    };
  }
};