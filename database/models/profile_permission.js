const Sequelize = require('sequelize');
const config = require('../config');
import Permission_Definition from './permission_definition';

import Profile from './profile';

const Permission_Definition = config.define('permission_definition', {
    
    id_profile_permission: {
        type: Sequelize.STRING(15),
        allowNull: false,
        primaryKey: true
    },
    id_profile: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true
    },
    id_permission: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true,
    },
    status: {
        type: Sequelize.STRING(15),
        allowNull: false,
    },
}, {
    timestamps: false
});

Profile.belongsToMany(Permission_Definition, { through: Permission_Definition, foreignKey: 'id_profile' });
Permission_Definition.belongsToMany(Profile, { through: Permission_Definition, foreignKey: 'id_profile' });

module.exports = Permission_Definition;
