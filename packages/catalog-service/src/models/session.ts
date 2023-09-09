// Importe os módulos necessários do Sequelize
import { Model, DataTypes, Sequelize } from 'sequelize';

// Defina a entidade "session"
class Session extends Model {
  public id!: number;
  public uuid!: string;
  public film_id!: number;
  public room_id!: number;
  public description!: string;
  public date!: Date;
  public start_time!: Date;
  public end_time!: Date;
  public time!: string;

  // Defina as associações
  static associate(models: any) {
    // Uma sessão pertence a um filme
    Session.belongsTo(models.Film, { foreignKey: 'film_id' });

    // Uma sessão ocorre em uma sala
    Session.belongsTo(models.Room, { foreignKey: 'room_id' });

    // Uma sessão pode ter vários tickets
    Session.hasMany(models.Ticket, { foreignKey: 'session_id' });
  }
}

// Exporte a função que define a entidade e suas configurações
export default (sequelize: Sequelize) => {
  Session.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    film_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Session',
    tableName: 'session',
  });

  return Session;
};
