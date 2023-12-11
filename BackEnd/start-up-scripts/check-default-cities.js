const cityModel = require('../model/city-model');
const listOfAllCities = require('../scripts/readcsv');

module.exports.checkDefaultCities = async () => {
    const defaultCityData = await listOfAllCities();
    const defaultRoles = await cityModel.find().exec();
    if (!defaultRoles.length) {
        await cityModel.insertMany(defaultCityData);
    }
}