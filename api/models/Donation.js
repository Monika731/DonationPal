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
        ref: 'users'
    },
    message: {
        type: String,
        trim: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date
    },
    payment_id: {
        type: String
    }
});

mongoose.model('donations', DonationSchema);