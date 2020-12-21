//General imports
import mongoose, { Schema, Document } from 'mongoose';

export interface Guild extends Document {
    id: string,
    prefix: String
}

const GuildSchema: Schema = new Schema({
    id: { type: String, required: true, unique: true },
    prefix: { type: String, required: true }
})

//Export the model
export default mongoose.model<Guild>('Guild', GuildSchema);