import { DataTypes, Model, Sequelize } from 'sequelize';

class Address extends Model {
  public id!: number;
  public uuid!: string;
  public country!: string;
  public state!: string;
  public zip_code!: string;
  public telephone!: string;
  public description!: string;
  public postal_code!: string;
  public name!: string;

  static associate(models: any) {
    Address.belongsToMany(models.Room, {
      through: models.RoomAddress,
      foreignKey: 'address_id',
      as: 'rooms',
    });
    models.Room.belongsToMany(Address, {
      through: models.RoomAddress,
      foreignKey: 'room_id',
      as: 'addresses',
    });
  }
}

export default (sequelize: Sequelize) => {
  Address.init(
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
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zip_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telephone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      postal_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Address',
      tableName: 'address',
    }
  );

  return Address;
};
