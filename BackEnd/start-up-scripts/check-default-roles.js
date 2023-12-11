const roleModel = require('../model/role-model');

module.exports.checkDefaultRole = async () => {
    const defaultRoles = await roleModel.find().exec();
    if (!defaultRoles.length) {
        await roleModel.insertMany([{
            roleName: 'captain'
        },{
            roleName: 'patron'
        }]);
    }
}