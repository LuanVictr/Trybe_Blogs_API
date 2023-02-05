const CategorieSchema = (sequelize, DataTypes) => {
  const CategorieTable = sequelize.define('Category' , {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
  } , {
    tableName: 'categories',
    underscored: true,
    timestamps: false,
  });
  
  return CategorieTable;
};

module.exports = CategorieSchema;
