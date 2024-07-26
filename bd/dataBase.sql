CREATE database marylinMarmot;
USE marylinMarmot;

CREATE TABLE collections (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(45) NOT NULL,
    description VARCHAR(255),
    creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE jewels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_collection INT,
    title  VARCHAR(45) NOT NULL,
    description VARCHAR(255),
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_collection) REFERENCES collections(id)
);
CREATE TABLE jewels_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_jewel INT,
    image VARCHAR(255) NOT NULL,
    description TEXT,
    creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_jewel) REFERENCES jewels(id)
);

INSERT INTO collections (title) 
VALUES ('Dark Night'), ('Emerald'), ('Galaxy'), ('Moony'), ('Retro');

SELECT * FROM collections;
 
ALTER TABLE jewels DROP COLUMN stock;
ALTER TABLE jewels
ADD COLUMN category VARCHAR(45);

INSERT INTO jewels (id_collection, title, price)
VALUES (4, 'Lunas de acero', 14.00), (4, 'Lunas maxi', 16.00), (4, 'Aros media luna', 14.00);

INSERT INTO jewels (id_collection, title, price)
VALUES (3, 'Planeta galaxy', 16.00), (3, 'Triágulo galaxy', 14.00), (3, 'Galaxy universe', 16.00), (3, 'Hexágono galaxy', 14.00);

INSERT INTO jewels (id_collection, title, price)
VALUES (2, 'Lágrima cerceta', 13.00), (2, 'Lidia cerceta', 15.00), (2, 'Media luna cerceta', 13.00), (2, 'Lidia verde', 15.00), (2, 'Ares', 16.00), (2, 'Nube verde botella', 15.00), (2, 'Retro verde', 15.00), (2, 'Nube cerceta', 15.00);

INSERT INTO jewels_images (id_jewel, image)
VALUES (1, 'https://drive.google.com/drive/u/0/folders/1fjeOLofBDauRtQaYI_qw355IkjTRI_3S'), (2, 'https://drive.google.com/drive/u/0/folders/1fjeOLofBDauRtQaYI_qw355IkjTRI_3S'), (3, 'https://drive.google.com/drive/u/0/folders/1fjeOLofBDauRtQaYI_qw355IkjTRI_3S');

INSERT INTO jewels_images (id_jewel, image)
VALUES (4, 'https://drive.google.com/drive/u/0/folders/1An4STV6nTmYoSU1wtTLLcWGHOXzCIOMk'), (5, 'https://drive.google.com/drive/u/0/folders/1An4STV6nTmYoSU1wtTLLcWGHOXzCIOMk'), (6, 'https://drive.google.com/drive/u/0/folders/1An4STV6nTmYoSU1wtTLLcWGHOXzCIOMk'), (7, 'https://drive.google.com/drive/u/0/folders/1An4STV6nTmYoSU1wtTLLcWGHOXzCIOMk');

INSERT INTO jewels_images (id_jewel, image)
VALUES (8, 'https://drive.google.com/drive/u/0/folders/1bB_-XzWvzIv_nFXHWoNaYGdBzlBY0Fo_'), (9, 'https://drive.google.com/drive/u/0/folders/1bB_-XzWvzIv_nFXHWoNaYGdBzlBY0Fo_'), (10, 'https://drive.google.com/drive/u/0/folders/1bB_-XzWvzIv_nFXHWoNaYGdBzlBY0Fo_'), (11, 'https://drive.google.com/drive/u/0/folders/1bB_-XzWvzIv_nFXHWoNaYGdBzlBY0Fo_'), (12, 'https://drive.google.com/drive/u/0/folders/1bB_-XzWvzIv_nFXHWoNaYGdBzlBY0Fo_'), (13, 'https://drive.google.com/drive/u/0/folders/1bB_-XzWvzIv_nFXHWoNaYGdBzlBY0Fo_'), (14, 'https://drive.google.com/drive/u/0/folders/1bB_-XzWvzIv_nFXHWoNaYGdBzlBY0Fo_'), (15, 'https://drive.google.com/drive/u/0/folders/1bB_-XzWvzIv_nFXHWoNaYGdBzlBY0Fo_');

INSERT INTO jewels_images (id_jewel, image)
VALUES 
(1, 'https://drive.google.com/uc?export=view&id=1fjeOLofBDauRtQaYI_qw355IkjTRI_3S'), 
(2, 'https://drive.google.com/uc?export=view&id=1fjeOLofBDauRtQaYI_qw355IkjTRI_3S'), 
(3, 'https://drive.google.com/uc?export=view&id=1fjeOLofBDauRtQaYI_qw355IkjTRI_3S');
UPDATE jewels_images
SET image = 'https://www.dropbox.com/scl/fi/wa62unk0nq03qkz9lu3uj/luna_acero.jpeg?rlkey=4ihi3tfs1647o8azc8sodbg1g&st=gq7hck50&raw=1'
WHERE id= 1;
UPDATE jewels_images
SET image = 'https://www.dropbox.com/scl/fi/bjbc0evh7g2uyhxqm4ugw/nube_cerceta.jpeg?rlkey=q2ipqjobp382x5obqacq0kwki&st=k5lmz43p&dl=1'
WHERE id= 15;


INSERT INTO jewels_images (id_jewel, image)
VALUES 
(4, 'https://drive.google.com/uc?export=view&id=1An4STV6nTmYoSU1wtTLLcWGHOXzCIOMk'), 
(5, 'https://drive.google.com/uc?export=view&id=1An4STV6nTmYoSU1wtTLLcWGHOXzCIOMk'), 
(6, 'https://drive.google.com/uc?export=view&id=1An4STV6nTmYoSU1wtTLLcWGHOXzCIOMk'), 
(7, 'https://drive.google.com/uc?export=view&id=1An4STV6nTmYoSU1wtTLLcWGHOXzCIOMk');

SELECT 
    c.id as collection_id,
    c.title as collection_title,
    j.id as jewel_id,
    j.title as jewel_title,
    j.description as jewel_description,
    j.price as jewel_price,
    j.creationDate as jewel_creationDate,
    j.category as jewel_category,  -- Asegúrate de seleccionar este campo
    ji.image as jewel_image,
    ji.description as jewel_image_description
FROM 
    collections c
JOIN 
    jewels j ON c.id = j.id_collection
LEFT JOIN 
    jewels_images ji ON j.id = ji.id_jewel;

    
UPDATE jewels
SET category = 'earrings'
WHERE id IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,15);

SELECT * FROM jewels;
    
/* para actualizar categorias */
/* UPDATE jewels
SET category = 'earrings'
WHERE id IN (/* IDs de joyas que deberían ser pendientes */);