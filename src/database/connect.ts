//General imports
import mongoose from 'mongoose';

//General imports
import Config from '../../config.json';
import Logger from '../logger';

const Options: Object = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}

const logger = new Logger();

const Connect: Function = () => {
    try {
        mongoose.connect(Config.bot.mongodb, Options)
        mongoose.connection.on('connected', () => {
            logger.success('Successfully connected to database.')
        })
    } catch (err) {
        logger.error('Failed to connect to the database.')
    }
    mongoose.connection.on('disconnected', () => {
        logger.error('Unexpectedly dissconnected from the database.')
    })
}

//Exports
export default Connect;