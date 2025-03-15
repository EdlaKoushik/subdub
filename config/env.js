import {config} from 'dotenv';
config({path:`.env.${process.env.NODE_ENV ||'development'}.local`});
export  const {PORT,
    NODE_ENV,
    DB_URI,
    ARCJET_ENV,
    ARCJET_KEY,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    SERVER_URL,
QSTASH_TOKEN,
QSTASH_URL,
EMAIL_PASSWORD,
ACCOUNT_EMAIL
}=process.env;


