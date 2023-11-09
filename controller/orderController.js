const Order = require('../models/orderItem');
const MenuItem = require('../models/menuItem');

exports.calculateAndSaveOrder = async (req, res) => {
    try
    {
        const { customerName, items } = req.body;
        let total = 0;
        const orderItems = [];

        for (const itemData of items)
        {
            const { itemId, selectedTopping, selectedFilling, quantity } = itemData;
            const menuItem = await MenuItem.findById(itemId);

            if (!menuItem)
            {
                return res.status(404).json({ error: 'Item menu tidak ditemukan' });
            }

            let itemPrice = menuItem.basePrice;

            if (selectedTopping)
            {
                const selectedToppingData = menuItem.toppings.find((t) => t.name === selectedTopping);
                if (selectedToppingData)
                {
                    itemPrice += selectedToppingData.price;
                }else{
                    return res.status(404).json({ error: 'Pilihan topping tidak ditemukan' });
                }
            }
            if (selectedFilling)
            {
                const selectedFillingData = menuItem.fillings.find((o) => o.name === selectedFilling);
                if (selectedFillingData)
                {
                    itemPrice += selectedFillingData.price;
                }else{
                    return res.status(404).json({ error: 'Pilihan filling tidak ditemukan' });
                }
            }

            const orderItem = {
                menuItem: menuItem._id,
                selectedTopping,
                selectedFilling,
                quantity,
                itemPrice
            };

            orderItems.push(orderItem);

            total += itemPrice * quantity;
        }

        const newOrder = new Order({
            customerName,
            items: orderItems,
            total
        });

        await newOrder.save();
        res.status(201).json({ total, orderId: newOrder._id });
    } catch (error)
    {
        res.status(500).json({ error: error.message });
    }
};