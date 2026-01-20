const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Compound = sequelize.define('Compound', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(500),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Compound name cannot be empty'
      }
    }
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Image URL cannot be empty'
      }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: 'No description available'
  },
  imageAttribution: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'image_attribution'
  },
  dateModified: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'date_modified'
  }
}, {
  tableName: 'compounds',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Compound;