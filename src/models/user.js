const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
				email:{
					type: Sequelize.STRING(40),
                    allowNull: false,
                    unique: true,
				},
                provider: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                    unique: true,
                },
				nick:{
                    type: Sequelize.STRING(1),
                    allowNull: false,
                    unique: false,
				},
				profile:{
                    type: Sequelize.STRING(100),
                    allowNull: true,
                    unique: false,
				},
				studystart:{
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    unique: false,
				},
				nth:{
                    type: Sequelize.INTEGER,
                    allowNull: false,
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
