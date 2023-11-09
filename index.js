const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');

mongoose.connect('mongodb://0.0.0.0:27017/restaurant_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Koneksi database error:'));
db.once('open', function () {
    console.log('Berhasil terhubung ke database');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/api', (req, res) => {
    const bodyData = req.body; 
    res.json(bodyData);
});

app.use('/api', menuRoutes);
app.use('/api', orderRoutes);

const server = app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});

module.exports = { app, server, mongoose };