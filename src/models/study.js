const Sequelize = require('sequelize');

module.exports = class Study extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
				time:{
					type: Sequelize.INTEGER,
                    allowNull: false,
                    unique: false,
				},
				duration:{
					type: Sequelize.STRING(13),
                    allowNull: false,
                    unique: false,
				}
			},
			{
				sequelize,
				timestamps:true,
				underscored:false,
				modelName:'Study',
				tableName:'studys',
				paranoid:false,
				charset:'utf8',
				collate:'utf8_general_ci',
			}
        );
    }

    static associate(db) {
		db.Study.belongsTo(db.User);
	}
};
