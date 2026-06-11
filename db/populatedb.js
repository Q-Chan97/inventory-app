import { Client } from "pg";

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category VARCHAR ( 255 ) UNIQUE
);

INSERT INTO categories (category)
VALUES
    ('bourbon'),
    ('scotch'),
    ('whisky'),
    ('agave'),
    ('rum'),
    ('cognac')
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS inventory (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category_id INTEGER REFERENCES categories(id),
    name VARCHAR ( 255 ),
    quantity INTEGER,
    rating NUMERIC(3, 1),
    notes TEXT
);

INSERT INTO inventory (category_id, name, quantity, rating, notes)
VALUES (1, 'Four Roses', 2, 4.5, 'Rich flavor with carmel color');
`

async function main() {
    console.log("Seeding...");
    const client = new Client({
        connectionString: process.env.DB_CONNECTION_URL
    });
    await client.connect();
    console.log("Connected to: ", process.env.DB_CONNECTION_URL);
    try {
        await client.query(SQL);
    } catch (err) {
        console.error("Error running SQL: ", err);
    } finally {
        await client.end();
        console.log("Done.")
    }
}

main();