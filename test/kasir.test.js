const request = require('supertest');
const { app, server, mongoose } = require('../index.js'); 

describe('Kasir API', () => {

    it('Menghitung harga pesanan dengan pilihan yang valid', async () => {
        const response = await request(app)
            .post('/api/kasir')
            .send({
                itemId: '654c76d216cbd51d9d0c76e6',
                selectedTopping: ['Cheese'],
                selectedFilling: ['Tomato'],
                quantity: 2,
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.total).toBe(220000);
    });

    it('Mengembalikan kesalahan untuk pilihan yang tidak valid', async () => {
        const response = await request(app)
            .post('/api/kasir')
            .send({
                itemId: '654c76d216cbd51d9d0c76e6',
                selectedTopping: ['Cheese'],
                selectedFilling: ['InvalidOption'],
                quantity: 2,
            });

        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe('Aturan pesanan tidak sesuai');
    });
});
