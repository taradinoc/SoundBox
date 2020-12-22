//General imports
import { Document } from 'mongoose';

/**
 *
 * @interface {guild} The guilds database.
 */
export interface GuildType extends Document {
    id: string,
    prefix: String
}

//Exports
export default GuildType;