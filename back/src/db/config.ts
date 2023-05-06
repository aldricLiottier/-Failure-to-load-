import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import path from 'path';
//import Company from './models/CompanyModel';
//import Translation from './models/TranslationModel';

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
dotenv.config({
  path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`),
});
const DB_HOST = process.env.DB_HOST;
const DB_PORT = +process.env.DB_PORT;
const PG_USERNAME = process.env.PG_USERNAME;
const PG_PWD = process.env.PG_PWD;

export const db = new Sequelize({
  host: DB_HOST,
  username: PG_USERNAME,
  password: PG_PWD,
  dialect: 'postgres',
  database: 'failure',
  port: DB_PORT || 5432,
  models: [`${__dirname}/models`, `${__dirname}/models/jointTables`],
  logging: false,
});

async function startingQueries() {
  //const qi = db.getQueryInterface();
  //qi.removeConstraint('Contacts', 'unique');
  //db.query('alter table 'Contacts' alter column 'email' drop Constraint unique;');
  // STEP 1
  //qi.renameColumn('Companies', 'descriptionId', 'shortDescriptionId');
  // STEP 2
  //qi.removeColumn('Companies', 'descriptionId');
  //const companies = await Company.findAll();
  //for (const company of companies) {
  //  const keys = {};
  //  if (!company.subtitle) {
  //    const translation = await Translation.create({fr: '', en: ''});
  //    keys['subtitleId'] = translation.id;
  //  }
  //  if (!company.shortDescription) {
  //    const translation = await Translation.create({fr: '', en: ''});
  //    keys['shortDescriptionId'] = translation.id;
  //  }
  //  if (!company.longDescription) {
  //    const translation = await Translation.create({fr: '', en: ''});
  //    keys['longDescriptionId'] = translation.id;
  //  }
  //  company.update(keys);
  //}
}

export async function onStartup() {
  console.log(`Connecting to ${DB_HOST} on port ${DB_PORT} || 5432`);
  console.log('Waiting for db connection');
  await db
    .authenticate()
    .then(async () => {
      console.log('Connection to database has been established successfully.');
      await startingQueries();
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
  //await db.sync({force: true, }) // - If you need to apply non-retrocompatible changes (will clear the db)
  await db.sync({ alter: true });
}
