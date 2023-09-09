import { DataTypes, Model, Sequelize } from 'sequelize';

class Ticket extends Model {
  public id!: number;
  public uuid!: string;
  public session_id!: number;
  public seat_id!: number;

  static associate(models: any) {
    Ticket.belongsTo(models.Session, {
      foreignKey: 'session_id',
      as: 'session',
    });
    Ticket.belongsTo(models.Seat, {
      foreignKey: 'seat_id',
      as: 'seat',
    });
  }
}

export default (sequelize: Sequelize) => {
  Ticket.init(
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
      session_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      seat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Ticket',
      tableName: 'ticket',
    }
  );

  return Ticket;
};
