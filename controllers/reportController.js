const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const Reports = require("../models/details");
require("dotenv").config();

const AWS_REGION = process.env.AWS_REGION;
const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

// 🔹 Initialize S3 Client with IAM User Credentials
const s3 = new S3Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY,
    },
});

exports.submitReport = async (req, res) => {
    try {
        const {
            name,
            date,
            address,
            contact,
            email,
            locationPollution,
            typeOfPollution,
            areaOfPollution,
            polybagsPresent,
            latitude,
            longitude,
        } = req.body;

        let imageUrl = "";
        if (req.file) {
            const fileKey = `${Date.now()}_${req.file.originalname}`;
            const params = {
                Bucket: BUCKET_NAME,
                Key: fileKey,
                Body: req.file.buffer,
                ContentType: req.file.mimetype,
            };

            const uploadCommand = new PutObjectCommand(params);
            await s3.send(uploadCommand);
            imageUrl = `https://${BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${fileKey}`;
        }

        // 🔹 Save report to MongoDB
        const report = new Reports({
            name,
            date,
            address,
            contact,
            email,
            locationPollution,
            typeOfPollution,
            areaOfPollution,
            polybagsPresent,
            image: imageUrl,
            latitude,
            longitude,
        });

        await report.save();
        res.status(201).json({ message: "Report submitted successfully", imageUrl });

    } catch (err) {
        console.error("Error submitting report:", err);
        res.status(500).json({ message: "Failed to save the report.", error: err.message });
    }
};
