const fs = require('fs');
const path = require('path');

const itemsDir = path.join(__dirname, 'items');
const outputFile = path.join(__dirname, 'data.js');

// Function to read all files in the items directory
function buildData() {
    try {
        if (!fs.existsSync(itemsDir)) {
            console.error('Items directory not found!');
            process.exit(1);
        }

        const files = fs.readdirSync(itemsDir);
        const allData = [];

        files.forEach(file => {
            if (path.extname(file) === '.txt' || path.extname(file) === '.json') {
                const filePath = path.join(itemsDir, file);
                const fileContent = fs.readFileSync(filePath, 'utf-8');
                try {
                    const jsonData = JSON.parse(fileContent);
                    allData.push(jsonData);
                } catch (e) {
                    console.error(`Error parsing JSON in file ${file}:`, e);
                }
            }
        });

        // Create the file content
        const fileContent = `const stockData = ${JSON.stringify(allData, null, 2)};\n`;

        fs.writeFileSync(outputFile, fileContent);
        console.log(`Successfully combined ${allData.length} items into data.js`);

    } catch (error) {
        console.error('Error building data:', error);
        process.exit(1);
    }
}

buildData();
