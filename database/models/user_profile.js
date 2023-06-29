const Sequelize = require('sequelize');
const config = require('../config');
import User from './user';
import Profile from './profile';

const User_Profile = config.define('user_profile', {
    
    id_user_profile: {
        type: Sequelize.STRING(15),
        allowNull: false,
        primaryKey: true
    },
    id_users: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true
    },
    id_profile: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true,
    },
}, {
    modelName: 'user_profile',
    tableName: 'user_profile',
    timestamps: false
});

Profile.belongsToMany(User, { through: User_Profile, foreignKey: 'id_profile' });
User.belongsToMany(Profile, { through: User_Profile, foreignKey: 'id_users' });

module.exports = User_Profile;
