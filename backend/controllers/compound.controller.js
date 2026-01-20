const Compound = require('../models/compound.model');

// Get all compounds with pagination
exports.getAllCompounds = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Compound.findAndCountAll({
      limit,
      offset,
      order: [['id', 'ASC']]
    });

    res.json({
      success: true,
      data: rows,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error('Error fetching compounds:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching compounds',
      error: error.message
    });
  }
};

// Get single compound by ID
exports.getCompoundById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const compound = await Compound.findByPk(id);
    
    if (!compound) {
      return res.status(404).json({
        success: false,
        message: `Compound with id ${id} not found`
      });
    }

    res.json({
      success: true,
      data: compound
    });
  } catch (error) {
    console.error('Error fetching compound:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching compound',
      error: error.message
    });
  }
};

// Update compound by ID
exports.updateCompound = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, description } = req.body;

    // Validate input
    if (!name || !image) {
      return res.status(400).json({
        success: false,
        message: 'Name and image are required fields'
      });
    }

    const compound = await Compound.findByPk(id);
    
    if (!compound) {
      return res.status(404).json({
        success: false,
        message: `Compound with id ${id} not found`
      });
    }

    // Update compound
    await compound.update({
      name,
      image,
      description: description || compound.description
    });

    res.json({
      success: true,
      message: 'Compound updated successfully',
      data: compound
    });
  } catch (error) {
    console.error('Error updating compound:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating compound',
      error: error.message
    });
  }
};

// Create new compound
exports.createCompound = async (req, res) => {
  try {
    const { name, image, description } = req.body;

    // Validate input
    if (!name || !image) {
      return res.status(400).json({
        success: false,
        message: 'Name and image are required fields'
      });
    }

    const compound = await Compound.create({
      name,
      image,
      description: description || 'No description available'
    });

    res.status(201).json({
      success: true,
      message: 'Compound created successfully',
      data: compound
    });
  } catch (error) {
    console.error('Error creating compound:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating compound',
      error: error.message
    });
  }
};

// Delete compound by ID
exports.deleteCompound = async (req, res) => {
  try {
    const { id } = req.params;
    
    const compound = await Compound.findByPk(id);
    
    if (!compound) {
      return res.status(404).json({
        success: false,
        message: `Compound with id ${id} not found`
      });
    }

    await compound.destroy();

    res.json({
      success: true,
      message: 'Compound deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting compound:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting compound',
      error: error.message
    });
  }
};