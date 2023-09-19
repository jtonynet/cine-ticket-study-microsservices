import { Model, DataTypes, Sequelize } from 'sequelize';

class Film extends Model {
  public id!: number;
  public uuid!: string;
  public name!: string;
  public description!: string;
  public age_rating!: number;
  public subtitled!: boolean;
  public poster!: string;

  static associate() {
  //static associate(models: any) {
    // Define as associações aqui...
  }
}

export default (sequelize: Sequelize) => {
  Film.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    age_rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subtitled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    poster: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Film',
    tableName: 'film',
  });

  return Film;
};
