'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    majors_concerned: {
        type: Array,
        required: true
    },
    study_year: {
        type: Array,
        required: true
    }, //(Number)
    keywords: {
        type: Array,
        required: true
    },  //(String)
    media_files: Array, //(String)
    status: {
        type: String,
        required: true
    },
    sub_date: {
        type: Date,
        default: Date.now
    },
    edit_date: {
        type: Date,
        default: Date.now
    },
    edit_key: {
        type: String,
        required: true
    },
    likes: Array, //(StudentSchema)
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ], //(CommentSchema)
    partner: {
        type: Schema.Types.ObjectId,
        ref: 'Partner',
        required: true
    }
})
const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;