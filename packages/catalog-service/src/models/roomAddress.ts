import { DataTypes, Model, Sequelize } from 'sequelize';

class RoomAddress extends Model {
  public id!: number;
  public uuid!: string;
  public room_id!: number;
  public address_id!: number;

  static associate(models: any) {
    RoomAddress.belongsTo(models.Room, {
      foreignKey: 'room_id',
      as: 'room',
    });
    RoomAddress.belongsTo(models.Address, {
      foreignKey: 'address_id',
      as: 'address',
    });
  }
}

export default (sequelize: Sequelize) => {
  RoomAddress.init(
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
      address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'RoomAddress',
      tableName: 'roomAddress',
    }
  );

  return RoomAddress;
};
