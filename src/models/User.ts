import mongoose, { Schema } from 'mongoose';

const QuickStatsSchema = new Schema({
    rank: Number,
    percentile: Number,
    answers: {
        total: Number,
        correct: Number
    }
});

const SubjectSchema = new Schema({
    name: String,
    completionpercentage: Number
});

const SkillPropertiesSchema = new Schema({
    questions: Number,
    duration: Number,
    submittedon: String,
    quickstats: QuickStatsSchema,
    subjects: [SubjectSchema]
});

const SkillSchema = new Schema({
    name: String,
    icon: String,
    properties: SkillPropertiesSchema
});

const UserSchema = new Schema({
    user: {
        name: String,
        skill: SkillSchema
    }
}, { collection: 'userdata' });

export const User = mongoose.models.User || mongoose.model('User', UserSchema);