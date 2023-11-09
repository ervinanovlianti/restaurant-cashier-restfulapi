const MenuItem = require('../models/menuItem');

exports.getMenu = async (req, res) => {
    try
    {
        const menuItems = await MenuItem.find();
        res.json(menuItems);
    } catch (err)
    {
        res.status(500).json({ error: err.message });
    }
};

exports.addMenuItem = async (req, res) => {
    try
    {
        const { name, basePrice, toppings, fillings } = req.body;

        const newMenuItem = new MenuItem({
            name,
            basePrice,
            toppings,
            fillings
        });

        await newMenuItem.save();

        res.status(201).json({ message: 'Menu baru berhasil ditambahkan' });
    } catch (error)
    {
        res.status(500).json({ error: error.message });
    }
};