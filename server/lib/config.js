import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.env.PWD, './.env') });

export default {
  admin: {
    username: 'admin',
    password: process.env.DEFAULT_ADMIN_PASSWORD,
  },
  github: {
    enable: false,
    clientId: process.env.GITHUB_CLIENT_ID,
    secret: process.env.GITHUB_SECRET,
  },
  facebook: {
    enable: false,
    appId: process.env.FACEBOOK_APP_ID,
    secret: process.env.FACEBOOK_SECRET,
  },
  google: {
    enable: false,
    clientId: process.env.GOOGLE_CLIENT_ID,
    secret: process.env.GOOGLE_SECRET,
  },
  mymlh: {
    enable: true,
    clientId: process.env.MYMLH_CLIENT_ID,
    secret: process.env.MYMLH_SECRET,
  },
  settings: {
    queueEnabled: true,
    expirationDelay: 1800000,
  },
  defaultMentor: false,
};
