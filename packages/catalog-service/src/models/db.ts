import { Sequelize } from 'sequelize';
import Film from './film';
import Session from './session';
import Room from './room';
import Seat from './seat';
import Ticket from './ticket';
import Address from './address';
import RoomAddress from './roomAddress';

const pool = {
  max: 5,
  min: 0,
  acquire: 130000,
  idle: 10000
};

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  database: 'catalog_service_db',
  username: 'catalog_service_user',
  password: 'catalog_service_password',
  pool
});

Film(sequelize);
Session(sequelize);
Room(sequelize);
Seat(sequelize);
Ticket(sequelize);
Address(sequelize);
RoomAddress(sequelize);

export default sequelize;
