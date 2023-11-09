const mongoose = require('mongoose');
const MenuItem = require('./models/menuItem');

mongoose.connect('mongodb://0.0.0.0:27017/restaurant_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Koneksi database error:'));
db.once('open', async function () {
    console.log('Berhasil terhubung ke database');

    const pizza = new MenuItem({
        name: 'Pizza',
        basePrice: 50000,
        toppings: [
            { name: Cheese, price: 12000 },
            { name: Chicken, price: 18000 },
            { name: Pepper, price: 8000, }
        ],
        fillings: [
            { name: Cheese, price: 12000 },
            { name: Tomato, price: 9000, },
            { name: Tuna, price: 20000, }
        ]
    });

    try
    {
        await pizza.save();
        console.log('Item menu berhasil disimpan');
    } catch (err)
    {
        console.error('Gagal menyimpan item menu:', err);
    }

    mongoose.connection.close();
});
