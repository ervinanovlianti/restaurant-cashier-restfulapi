const request = require('supertest');
const { app, server, mongoose } = require('../index'); 
// const port = 5000; 

describe('Menu API', () => {

    it('Mengambil daftar menu', async () => {
        const response = await request(app)
            .get('/api/menu');

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array); 
    });

});
