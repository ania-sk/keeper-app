CREATE DATABASE keeperapp;



CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  title TEXT,
  content TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);