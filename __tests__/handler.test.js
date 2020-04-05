const { healthCheck } = require('../handler');

describe('Test healtcheck', () => {
    test('should get 200', async (done) => {
        const text = await healthCheck();
        expect(text.statusCode).toBe(200);
        done();
    });
});