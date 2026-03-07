import mongoose, { Schema } from "mongoose";

// users collection
const userrepoSchema = new Schema({
    id: Number,
    name: String,
    owner: String,
    html_url: String,
    description: String,
    private: Boolean,
    remove: Boolean
}, { timestamps: true });


const usercreatedrepo = mongoose.model('usercreatedrepo', userrepoSchema);

export { usercreatedrepo };