DROP TABLE IF EXISTS resources;

CREATE TABLE resources (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    about TEXT NOT NULL,
    link TEXT,
    logo TEXT
);
