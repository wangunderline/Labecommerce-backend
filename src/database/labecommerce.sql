-- Active: 1687531834306@@127.0.0.1@3306

------ Creates ------
CREATE TABLE if NOT EXISTS users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
      created_at TEXT DEFAULT (DATETIME('now', 'localtime')) NOT NULL
);

CREATE TABLE if NOT EXISTS products(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

CREATE TABLE if NOT EXISTS purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT DEFAULT (DATETIME('now', 'localtime')) NOT NULL,
    FOREIGN KEY(buyer) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE if NOT EXISTS purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products (id) ON UPDATE CASCADE ON DELETE CASCADE
);

------ INSERTS ------
INSERT INTO users(id, name, email, password)
VALUES
('u001', 'Bob Dylan', 'mrtambourineman@gmail.com', 'zimmerman'),
('u002', 'John Lennon', 'thewalrus@applerecords.com', 'strawberry'),
('u003', 'Alfred Hitchcock', 'masterofsuspense@uol.com.br', 'blondes');

INSERT INTO products(id, name, price, description, image_url)
VALUES
    ('p001', 'Camiseta Gamer', 29.99, 'Camiseta de algodão de alta qualidade', 'https://example.com/camiseta.jpg'),
    ('p002', 'Calça de Mármore', 79.99, 'Calça jeans moderna e confortável', 'https://example.com/calca-jeans.jpg'),
    ('p003', 'Tênis Casual', 99.99, 'Tênis confortável para usar durante o sono', 'https://example.com/tenis-casualjpg'),
    ('p004', 'Terno Esportivo', 10.99, 'Terno para atividades físicas', 'https://example.com/terno.jpg'),
    ('p005', 'Patinete Caseiro', 49.99, 'Patinete para transitar entre os cômodos da casa', 'https://example.com/patinete.jpg');

INSERT INTO users (id, name, email, password)
VALUES
('u004', 'Tom Cruise', 'mapothercruise@hotmail.com', 'scientology123');

INSERT INTO products (id, name, price, description, image_url)
VALUES
('6', 'Mouse de Madeira', 50.47, 'bom mouse', 'mouse.com');

INSERT INTO purchases (id, buyer, total_price)
VALUES
('o001', 'u001', 50),
('o002', 'u002', 100),
('o003', 'u001', 20);

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
('o001', 'p001', 3),
('o002', 'p002', 6),
('o003', 'p003', 12);

----- SELECTS -----
SELECT * FROM users AS getAllUsers;

SELECT * FROM products AS getAllProducts;

SELECT * FROM products
WHERE name LIKE '%calça%';

SELECT * FROM purchases;

SELECT
    purchases.id AS orderId,
    users.id AS buyerId,
    users.name AS buyerName,
    users.email,
    purchases.total_price,
    purchases.created_at
FROM users
INNER JOIN purchases
ON purchases.buyer = users.id
WHERE users.id = 'u001';

SELECT
    purchases.id AS 'id da compra',
    users.id AS 'id do comprador',
    users.name AS 'nome do comprador',
    users.email AS 'email',
    purchases.total_price,
    purchases.created_at,
    purchases_products.product_id,
    purchases_products.quantity
FROM purchases
INNER JOIN users 
    ON purchases.buyer = users.id
INNER JOIN purchases_products
    ON purchases_products.purchase_id = purchases.id;

----- UPDATES -----
UPDATE products
SET
    id = 'p005',
    name = 'Ferro de passar automático',
    price = '9000',
    description = 'ferro de passar por i.a',
    image_url = "ferro.com"
WHERE id = '5';

UPDATE purchases
SET
    total_price = 75
WHERE id = 'o001';

UPDATE purchases_products
SET
    product_id = 'p004'
WHERE purchase_id = 'o003';

----- DELETES -----
DELETE FROM users
WHERE id = 'u003';

DELETE FROM products
WHERE id = '6';

DROP TABLE users;

