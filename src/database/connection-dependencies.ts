import { Connections, DB_Receiver, Mongo, /*MySQL*/ } from "../database/connection-command";

// DB command
const DB_RECEIVER = new DB_Receiver()
const MONGODB = new Mongo(DB_RECEIVER);
// const MYSQL = new MySQL(DB_RECEIVER);

const CONNECTIONS = new Connections();
CONNECTIONS.register('MONGODB', MONGODB);
// CONNECTIONS.register('MYSQL', MYSQL);

export { CONNECTIONS };