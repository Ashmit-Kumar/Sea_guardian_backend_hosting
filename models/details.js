const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReportsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    locationPollution: String,
    typeOfPollution: {
        type: String,
        required: true
    },
    areaOfPollution: {
        type: String,
        required: true
    },
    image: {
        type: String,
        validate: {
            validator: function(v) {
                return !v || /^(ftp|http|https):\/\/[^ "]+$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    latitude: Number,
    longitude: Number
});

module.exports = mongoose.model("Reports", ReportsSchema);
