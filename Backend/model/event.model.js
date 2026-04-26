import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    eventType: {
        type: String,
        required: true,
    },
    source: {
        type: String,
        default: 'github',
    },
    payload: {
        type: mongoose.Schema.Types.Mixed,
    },
    repository: {
        id: Number,
        name: String,
        owner: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const EventLog = mongoose.model('EventLog', eventSchema);

export { EventLog };