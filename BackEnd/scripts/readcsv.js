const promises = require("fs").promises
const csv = require("csv-parser")
const Readable = require('stream').Readable
/**
 * Once can download the csv from here anc change the path as per saved file location
    https://simplemaps.com/data/world-cities
 */
const csvFileBasePath = "/home/ad.rapidops.com/saumya.dixit/Downloads/All Cities/worldcities.csv";

async function parseCSV(csvData) {
    return new Promise((resolve, reject) => {
        const rows = [];

        Readable.from(csvData)
            .pipe(csv())
            .on('data', (row) => {
                rows.push(row);
            })
            .on('end', () => {
                resolve(rows);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

async function listOfAllCities() {
    const fileData = await promises.readFile(csvFileBasePath, 'utf-8');
    const rows = await parseCSV(fileData);
    const IndianCities = rows.filter((data) => data.country === 'India')
    return IndianCities.map((cityDetails) => {
        return {
            cityName: cityDetails.city,
            stateName: cityDetails.admin_name,
            latitude:cityDetails.lat,
            longitude: cityDetails.lng,
        }
    });
}

module.exports = listOfAllCities;