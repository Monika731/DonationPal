const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const DonationSchema = new Schema({
    campaign_id: {
        type: Schema.Types.ObjectId,
        ref: 'campaigns',
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

mongoose.model('donations', DonationSchema);