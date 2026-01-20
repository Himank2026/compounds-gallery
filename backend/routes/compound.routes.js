const express = require('express');
const router = express.Router();
const compoundController = require('../controllers/compound.controller');

// GET /api/compounds - Get all compounds with pagination
router.get('/', compoundController.getAllCompounds);

// GET /api/compounds/:id - Get single compound by ID
router.get('/:id', compoundController.getCompoundById);

// POST /api/compounds - Create new compound
router.post('/', compoundController.createCompound);

// PUT /api/compounds/:id - Update compound by ID
router.put('/:id', compoundController.updateCompound);

// DELETE /api/compounds/:id - Delete compound by ID
router.delete('/:id', compoundController.deleteCompound);

module.exports = router;