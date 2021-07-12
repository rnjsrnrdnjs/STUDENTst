const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
				snsId:{
					type: Sequelize.STRING(80),
                    allowNull: false,
                    unique: false,
				},
                provider: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                    unique: false,
                },
				nick:{
                    type: Sequelize.STRING(1),
                    allowNull: true,
                    unique: false,
				},
				profile:{
                    type: Sequelize.STRING(100),
                    allowNull: true,
                    unique: false,
				},
				studystart:{
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    unique: false,
				},
				nth:{
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    unique: false,
				},
			},
			{
				sequelize,
				timestamps:false,
				underscored:false,
				modelName:'User',
				tableName:'users',
				paranoid:false,
				charset:'utf8',
				collate:'utf8_general_ci',
			}
        );
    }

    static associate(db) {
		db.User.hasMany(db.Post);
		db.User.hasMany(db.Comment);
		db.User.hasMany(db.Like);
		db.User.hasMany(db.Memo);
		db.User.hasMany(db.Note);
		db.User.hasMany(db.Study);
	}
};
