const CategorieSchema = (sequelize, DataTypes) => {
  const CategorieTable = sequelize.define('Categorie' , {
    name: DataTypes.STRING,
  } , {
    tableName: 'categories',
    underscored: true,
    timestamps: false,
  });
  
  return CategorieTable;
};

module.exports = CategorieSchema;
