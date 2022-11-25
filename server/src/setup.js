import 'dotenv/config';
import { sequelize } from './utils/db.js';
import './models/User.js';
import './models/Post.js';
import './models/Role.js';

sequelize.sync({ force: true });

