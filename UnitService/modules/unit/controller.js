const unitService = require('./service');

exports.getAllUnits = async (req, res) => {
    try {
        const unit = await unitService.getAllUnits();
        res.status(200).json(unit);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUnitById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const unit = await unitService.getUnitById(id);
        //console.log('Result from DB:', unit);
        if (!unit) {
            return res.status(404).json({ message: 'Unit not found' });
        }
        res.status(200).json(unit);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createUnit = async (req, res) => {
    try {
        const { name, image_name } = req.body;
        if (!name || !image_name) {
            return res.status(400).json({ error: 'Missing name or image_name' });
        }
        const newUnit = await unitService.createUnit({ name, image_name });
        res.status(201).json(newUnit);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateUnit = async (req, res) => {
    try {
        const updated = await unitService.updateUnit(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: 'Unit not found' });
        }
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteUnit = async (req, res) => {
    try {
        await unitService.deleteUnit(req.params.id)
        res.status(200).json({ message: 'Unit deleted successfully' })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};