var expect = require('chai').expect;
var app = require('../index.js').app;
var chaiHttp = require('chai-http');
var chai = require('chai');

chai.use(chaiHttp);

describe('API Order', () => {
    it('Harus menghitung pesanan dengan benar', (done) => {
        const orderData = {
            customerName: 'Ervina',
            items: [
                {
                    itemId: '654c76d216cbd51d9d0c76e6', 
                    selectedTopping: 'Cheese', 
                    selectedFilling: 'Tomato', 
                    quantity: 2,
                },
            ],
        };

        chai.request(app)
            .post('/api/order')
            .send(orderData)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('total');
                expect(res.body).to.have.property('orderId');
                done();
            });
    });

    it('Harus memberikan respons 404 jika item menu tidak ditemukan', (done) => {
        const orderData = {
            customerName: 'John Doe',
            items: [
                {
                    itemId: 'invalidMenuItemId', // ID item menu yang tidak valid
                    selectedTopping: 'validToppingName',
                    selectedFilling: 'validFillingName',
                    quantity: 2,
                },
            ],
        };

        chai.request(app)
            .post('/api/kasir')
            .send(orderData)
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });

    it('Harus memberikan respons 404 jika pilihan filling tidak valid', (done) => {
        const orderData = {
            customerName: 'John Doe',
            items: [
                {
                    itemId: '654c76d216cbd51d9d0c76e6',
                    selectedTopping: 'validToppingName',
                    selectedFilling: 'validFillingName',
                    quantity: 2,
                },
            ],
        };

        chai.request(app)
            .post('/api/kasir')
            .send(orderData)
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });

    it('Harus memberikan respons 404 jika pilihan topping tidak valid', (done) => {
        const orderData = {
            customerName: 'John Doe',
            items: [
                {
                    itemId: 'validMenuItemId',
                    selectedOption: 'validOptionName',
                    selectedTopping: 'invalidToppingName', // Pilihan topping yang tidak valid
                    quantity: 2,
                },
            ],
        };

        chai.request(app)
            .post('/api/kasir')
            .send(orderData)
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });
});
