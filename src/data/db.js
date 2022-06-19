import faunadb from 'faunadb'

var q = faunadb.query;
const client = new faunadb.Client({
  secret: `${import.meta.env.VITE_APP_FAUNADB_KEY}`,
  domain: 'db.fauna.com',
  port: 443,
  scheme: 'https',
});

export {client, q}