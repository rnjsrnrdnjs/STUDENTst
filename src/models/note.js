const Sequelize = require('sequelize');

module.exports = class Note extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
				content:{
					type: Sequelize.STRING(600),
                    allowNull: false,
                    unique: false,
				},
				img:{
					type: Sequelize.STRING(200),
                    allowNull: true,
                    unique: false,
				}
			},
			{
				sequelize,
				timestamps:true,
				underscored:false,
				modelName:'Note',
				tableName:'notes',
				paranoid:false,
				charset:'utf8',
				collate:'utf8_general_ci',
			}
        );
    }

    static associate(db) {
		db.Note.belongsTo(db.User);
	}
};
