const PostCategorieSchema = (sequelize, DataTypes) => {
  const PostCategoriesTable = sequelize.define('PostCategory', {
    postId: {type: DataTypes.INTEGER, foreignKey: true},
    categoryId: {type: DataTypes.INTEGER, foreignKey:true}
  }, {
    underscored: true,
    timestamps: false,
    tableName: 'posts_categories'
  });

  PostCategoriesTable.associate = ({Category, BlogPost}) => {
    Category.belongsToMany(BlogPost, {
      as: 'BlogPosts',
      through: PostCategoriesTable,
      foreignKey: 'categoryId',
      otherKey: 'postId'
    });

    BlogPost.belongsToMany(Category, {
      as: 'categories',
      through: PostCategoriesTable,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  }

  return PostCategoriesTable;
};

module.exports = PostCategorieSchema;