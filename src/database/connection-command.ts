import { Sequelize } from 'sequelize';
import mongoose from 'mongoose';

import logger from '../utils/logger';

interface ICommand {
    execute(): void
}

export class Connections {

    #commands: { [id: string]: ICommand }

    constructor() {
        this.#commands = {}
    }

    register(databaseName: string, command: ICommand) {
        // Register commands in the Invoker
        this.#commands[databaseName] = command
    }

    connectTo(databaseName: string) {
        // Execute any registered commands
        if (databaseName in this.#commands) {
            this.#commands[databaseName].execute()
        } else {
            logger.warn(`Database [${databaseName}] not recognised`)
        }
    }
};

export class DB_Receiver {
    // Logica de conexión a cada BDD

    mongoDB() {
        // A set of instructions to run
        logger.info('Connecting to MongoDB');

        return new Promise((resolve, reject) => {
            mongoose.connect(process.env.DATABASE_URI!);
            const db = mongoose.connection;
            db.on('error', reject);
            db.once('open', () => {
                logger.info('Database connected')
                resolve
            });
        });
    }

    mySQL() {
        logger.info('Connecting to MySQL');

        const sequelize = new Sequelize(process.env.DATABASE_URI!, {});

        sequelize
            .authenticate()
            .then(() => {
                logger.info('Database connected')
            })
            .catch(err => {
                logger.error('Error trying to connect to database')
                console.log('> ', err)
            });
    }
}

export class Mongo implements ICommand {

    #receiver: DB_Receiver

    constructor(receiver: DB_Receiver) {
        this.#receiver = receiver
    }

    execute() {
        this.#receiver.mongoDB()
    }
}

export class MySQL implements ICommand {

    #receiver: DB_Receiver

    constructor(receiver: DB_Receiver) {
        this.#receiver = receiver
    }

    execute() {
        this.#receiver.mySQL()
    }
}