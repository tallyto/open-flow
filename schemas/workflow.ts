import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    current_version: {
        type: Number,
    },
    queue: {
        type: String,
    },
    Xaml: {
        type: String,
    },
    Parameters: {
        type: Array,
        default: []
    },
    Serializable: {
        type: Boolean,
    },
    Filename: {
        type: String,
    },
    projectandname: {
        type: String,
    },
    FilePath: {
        type: String,
    },
    projectid: {
        type: String,
    },
    _type: {
        type: String,
    },
    name: {
        type: String,
    },
    _modifiedby: {
        type: String,
    },
    _modifiedbyid: {
        type: String,
    },
    _createdby: {
        type: String,
    },
    _createdbyid: {
        type: String,
    },
    _encrypt: {
        type: String,
    },
    _version: {
        type: Number,
        default: 0
    },
}, {
    timestamps: {
        createdAt: '_created', // Use `created_at` to store the created date
        updatedAt: '_modified' // and `updated_at` to store the last updated date
    },
})

const workflowModel = mongoose.model('openrpa', userSchema,)

export default workflowModel