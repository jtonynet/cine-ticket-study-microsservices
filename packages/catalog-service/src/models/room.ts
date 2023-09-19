// Importe os módulos necessários do Sequelize
import { Model, DataTypes, Sequelize } from 'sequelize';

// Defina a entidade "Room"
class Room extends Model {
  public id!: number;
  public uuid!: string;
  public name!: string;
  public capacity!: number;

  // Defina as associações
  static associate(models: any) {
    // Uma sala pode ter várias sessões
    Room.hasMany(models.Session, { foreignKey: 'room_id' });

    // Uma sala pode ter apenas um endereço
    Room.belongsTo(models.Address, {
      foreignKey: 'address_id',
    });
  }
}

// Exporte a função que define a entidade e suas configurações
export default (sequelize: Sequelize) => {
  Room.init({
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Room',
    tableName: 'room',
  });

  return Room;
};
