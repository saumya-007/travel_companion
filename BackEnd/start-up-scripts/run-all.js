const checkDefaultRole = require('./check-default-roles').checkDefaultRole;
const checkDefaultVehicleCategories = require('./check-vehical-categories').checkDefaultVehicleCategories;
const checkDefaultCities = require('./check-default-cities').checkDefaultCities;

const runStartUp = async () => {
    console.log('-> Starting project setup');
    await checkDefaultRole();
    await checkDefaultVehicleCategories();
    await checkDefaultCities();
    console.log('-> Project setup completed');
} 

module.exports = runStartUp;