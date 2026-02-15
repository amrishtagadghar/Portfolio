import postgres from "postgres";

const connectionString = process.env.POSTGRES_URL ?? process.env.DATABASE_URL;

export const hasDatabase = Boolean(connectionString);

export const sql = connectionString
  ? postgres(connectionString, {
      ssl: "require",
      prepare: false
    })
  : null;
