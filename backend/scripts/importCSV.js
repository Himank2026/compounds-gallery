const fs = require('fs');
const path = require('path');
const sequelize = require('../config/database');
const Compound = require('../models/compound.model');

// Advanced CSV parser that handles quoted fields with commas
function parseCSV(csvContent) {
  const lines = csvContent.split('\n');
  const headers = parseCSVLine(lines[0]);
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    const values = parseCSVLine(lines[i]);
    const obj = {};
    
    headers.forEach((header, index) => {
      obj[header] = values[index] || '';
    });
    
    data.push(obj);
  }

  return data;
}

// Parse a single CSV line, handling quoted fields
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}

async function importData() {
  try {
    console.log('🔄 Connecting to database...');
    await sequelize.authenticate();
    console.log('✅ Database connected');

    console.log('🔄 Syncing database models...');
    await sequelize.sync({ force: true }); // This will drop and recreate tables
    console.log('✅ Database synced');

    const csvPath = path.join(__dirname, '../data/compound.csv');
    
    if (!fs.existsSync(csvPath)) {
      console.error('❌ CSV file not found at:', csvPath);
      console.log('Please make sure compound.csv exists in the data/ folder');
      process.exit(1);
    }

    console.log('🔄 Reading CSV file...');
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const compounds = parseCSV(csvContent);

    console.log(`🔄 Importing ${compounds.length} compounds...`);
    
    let successCount = 0;
    for (const compound of compounds) {
      try {
        // Parse the date if it exists
        let dateModified = null;
        if (compound.dateModified) {
          dateModified = new Date(compound.dateModified);
        }

        await Compound.create({
          name: compound.CompoundName || compound.name,
          image: compound.strImageSource || compound.image,
          description: compound.CompoundDescription || compound.description || 'No description available',
          imageAttribution: compound.strImageAttribution || null,
          dateModified: dateModified
        });
        successCount++;
        console.log(`✓ Imported: ${compound.CompoundName || compound.name}`);
      } catch (error) {
        console.error(`✗ Failed to import: ${compound.CompoundName}`, error.message);
      }
    }

    console.log(`\n✅ Successfully imported ${successCount} out of ${compounds.length} compounds`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error importing data:', error);
    process.exit(1);
  }
}

importData();