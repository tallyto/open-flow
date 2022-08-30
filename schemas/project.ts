import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    dependencies: {
        type: String,
    },
    disable_local_caching: {
        type: Boolean,
    },
    Filename: {
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
    _acl: {
        type: String,
    },
    _encrypt: {
        type: String,
    },
    _version: {
        type: Number,
    },

}, {
    timestamps: {
        createdAt: '_created', // Use `created_at` to store the created date
        updatedAt: '_modified' // and `updated_at` to store the last updated date
    },
})

const projectModel = mongoose.model('project', userSchema,)

export default projectModel