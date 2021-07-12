const Sequelize = require('sequelize');

module.exports = class Memo extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
				content:{
					type: Sequelize.STRING(400),
                    allowNull: false,
                    unique: false,
				},
			},
			{
				sequelize,
				timestamps:true,
				underscored:false,
				modelName:'Memo',
				tableName:'memos',
				paranoid:false,
				charset:'utf8',
				collate:'utf8_general_ci',
			}
        );
    }

    static associate(db) {
		db.Memo.belongsTo(db.User);
	}
};
