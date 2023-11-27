#!/bin/sh

set -e

export PGPASSWORD=$POSTGRES_PASSWORD;
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
  CREATE DATABASE $APP_DB_NAME;
  CREATE USER $APP_DB_USER WITH PASSWORD '$APP_DB_PASS';
  \c $APP_DB_NAME;
  BEGIN;
  CREATE TABLE iot_registry (
    id SERIAL PRIMARY KEY,
    name CHAR(8) NOT NULL,
    ts BIGINT NOT NULL,
    value NUMERIC(8, 2) NOT NULL
  );
  COMMIT;
  GRANT ALL PRIVILEGES ON DATABASE $APP_DB_NAME TO $APP_DB_USER;
  GRANT ALL PRIVILEGES ON TABLE iot_registry TO $APP_DB_USER;
  GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO $APP_DB_USER;
EOSQL
