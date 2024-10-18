import pg from "pg";

function connect() {
  const dbConnectionString = process.env.NEXT_PUBLIC_DATABASE_URL;
  const database = new pg.Pool({
    connectionString: dbConnectionString,
  });
  return database;
}

export const database = connect();
