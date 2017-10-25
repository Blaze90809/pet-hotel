--create tables

CREATE TABLE "pethotel_owners" (
id SERIAL PRIMARY KEY,
firstname VARCHAR (25),
lastname VARCHAR (30)
);

CREATE TABLE "pethotel_pets"(
id SERIAL PRIMARY KEY,
petname VARCHAR (30),
breed VARCHAR (30),
color VARCHAR (15),
customer_id INT REFERENCES pethotel_owners
);

CREATE TABLE "pethotel_visits"(
id SERIAL PRIMARY KEY,
checkin DATE,
checkout DATE,
petcheck INT REFERENCES pethotel_pets
);


--intiial table values
INSERT INTO "pethotel_owners" ("firstname", "lastname")
VALUES ('Misses', 'Owner');


INSERT INTO "pethotel_pets" ("petname","breed", "color","customer_id")
VALUES ('Scruffy','terrier','brown',1);

INSERT INTO "pethotel_visits" ("checkin", "checkout", "petcheck")
VALUES ('10/15/2017', '10/17/2017', 1);