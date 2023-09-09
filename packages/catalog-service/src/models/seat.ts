import { DataTypes, Model, Sequelize } from 'sequelize';

class Seat extends Model {
  public id!: number;
  public uuid!: string;
  public room_id!: number;
  public code!: string;

  static associate(models: any) {
    Seat.belongsTo(models.Room, {
      foreignKey: 'room_id',
      as: 'room',
    });
    Seat.hasMany(models.Ticket, {
      foreignKey: 'seat_id',
      as: 'tickets',
    });
  }
}

export default (sequelize: Sequelize) => {
  Seat.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      room_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Seat',
      tableName: 'seat',
    }
  );

  return Seat;
};
