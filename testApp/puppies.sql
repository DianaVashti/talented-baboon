DROP DATABASE IF EXISTS puppies2;
CREATE DATABASE puppies2;

\c puppies2;

CREATE TABLE pups (
  ID SERIAL PRIMARY KEY,
  name VARCHAR UNIQUE,
  breed VARCHAR,
  age INTEGER,
  sex VARCHAR
);

CREATE TABLE pupFur (
  name VARCHAR REFERENCES pups(name),
  color VARCHAR,
  length VARCHAR
);

INSERT INTO pups (name, breed, age, sex)
  VALUES ('Tyler', 'Retriever', 3, 'M'), ('Mom', 'Awesome', 50, 'F');

INSERT INTO pupFur (name, color, length)
  VALUES ('Tyler', 'brown', 'long'), ('Mom', 'yellow', 'short');
