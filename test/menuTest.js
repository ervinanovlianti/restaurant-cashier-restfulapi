var expect = require('chai').expect;
var app = require('../index.js').app;
var chaiHttp = require('chai-http');
var chai = require('chai');

chai.use(chaiHttp);

describe('API Menu', () => {
    describe('GET /api/menus', () => {
        it('Harus menampilkan semua menu', (done) => {
            chai.request(app)
                .get('/api/menus')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
    describe('POST /api/menus', () => {
        it('Harus menambahkan menu baru', (done) => {
            const newMenu = {
                name: 'Menu Baru',
                description: 'Deskripsi Menu Baru',
                basePrice: 10000,
                options: [
                    { name: 'Option1', price: 5000 },
                    { name: 'Option2', price: 7000 },
                ],
            };

            chai.request(app)
                .post('/api/menus')
                .send(newMenu)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('message', 'Menu baru berhasil ditambahkan');
                    done();
                });
        });
    });
});