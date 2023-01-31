const PostCategorieSchema = (sequelize, DataTypes) => {
  const PostCategoriesTable = sequelize.define('PostCategorie', {
    postId: {type: DataTypes.INTEGER, foreignKey: true},
    categoryId: {type: DataTypes.INTEGER, foreignKey:true}
  }, {
    underscored: true,
    timestamps: false,
    tableName: 'post_categories'
  });

  PostCategoriesTable.associate = ({Categorie, BlogPost}) => {
    Categorie.belongsToMany(BlogPost, {
      as: 'BlogPosts',
      through: PostCategoriesTable,
      foreignKey: 'categoryId',
      otherKey: 'postId'
    });

    BlogPost.belongsToMany(Categorie, {
      as: 'categories',
      through: PostCategoriesTable,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  }

  return PostCategoriesTable;
};

module.exports = PostCategorieSchema;