const unitModel = require('./db');

const validateUnit = (data) => {
    if (!data.name || data.name.length <= 4) {
        throw new Error('Name must be longer than 4 characters');
    }
    if (!data.image_name || data.image_name.length <= 4) {
        throw new Error('Image name is required');
    }
};

exports.getAllUnits = async () => unitModel.getAllUnits();

exports.getUnitById = async () => unitModel.getUnitById();

exports.createUnit = async (data) => {
    validateUnit(data);
    return unitModel.createUnit(data);
};

exports.updateUnit = async (id, data) => {
    validateUnit(data);
    return unitModel.updateUnit(id, data);
};

exports.deleteUnit = async (id) => unitModel.deleteUnit(id);