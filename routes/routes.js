const express = require('express');
const Item = require('../models/item');
const mongoose = require('mongoose');

const router = express.Router();

// Create an item
router.post('/items', async (req, res) => {
    const { name, description } = req.body;
    try {
        const newItem = new Item({ name, description });
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all items
router.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get an item by id
router.get('/items/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (item) {
            res.json(item);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update an item by id
router.put('/items/:id', async (req, res) => {
    const { name, description } = req.body;
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, { name, description }, { new: true });
        if (updatedItem) {
            res.json(updatedItem);
        } else {
            res.status(404).json({ message: 'Item not found and not updated' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete an item by id
router.delete('/items/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (deletedItem) {
            res.json({ message: 'Item deleted' });
        } else {
            res.status(404).json({ message: 'Item not found to delete' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
