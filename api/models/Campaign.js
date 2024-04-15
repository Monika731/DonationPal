const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const CampaignSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        ref: 'campaigns',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    goal: {
        type: Number,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    }
});

mongoose.model('campaigns', CampaignSchema);