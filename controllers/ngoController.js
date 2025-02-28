const NGORegistration = require('../models/registerNGO');

exports.registerNGO = async (req, res) => {
    try {
        const existingUser = await NGORegistration.findOne({ registrationNo: req.body.registrationNo });
        if (existingUser) {
            return res.status(400).json({ error: "Registration Number already exists." });
        }

        const newNGORegistration = new NGORegistration({
            ngoName: req.body.ngoName,
            Address: {
                addressLine1: req.body.addressLine1,
                addressLine2: req.body.addressLine2
            },
            registrationNo: req.body.registrationNo,
            workingAreas: req.body.workingAreas,
            purpose: req.body.purpose
        });

        await newNGORegistration.save();
        res.status(201).json({ message: "NGO registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Registration failed. Please try again later.");
    }
};
