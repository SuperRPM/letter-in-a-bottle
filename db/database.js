import pkg from 'sequelize';
import { config } from '../config.js'

const { Sequelize, DataTypes } = pkg;
const { host, user, database, password } = config.db;
export const sequelize = new Sequelize(database, user, password, {
    host,
    dialect: 'mysql',
    logging: true,
});

export const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    account: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.TEXT,
    }
}, {timestamps: false })

export const Letter = sequelize.define('letter', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    replied: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    }
}, { updatedAt: false });

export const Reply = sequelize.define('reply', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, { updatedAt: false });

Reply.belongsTo(User);
Letter.belongsTo(User);