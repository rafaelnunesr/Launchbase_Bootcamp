CREATE TABLE "customers" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "birth" timestamp NOT NULL,
  "cpf" int NOT NULL,
  "email" text NOT NULL,
  "gender" text NOT NULL,
  "tel" int NOT NULL,
  "cnh" int NOT NULL,
  "cnh_category" text NOT NULL,
  "cep" int NOT NULL,
  "address" text NOT NULL,
  "city" text NOT NULL,
  "country" text NOT NULL,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "agencies" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "tel" int NOT NULL,
  "whatsapp" int,
  "email" text NOT NULL,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "addesses" (
  "id" SERIAL PRIMARY KEY,
  "agency_id" int NOT NULL,
  "cep" int NOT NULL,
  "adress" text NOT NULL,
  "city" text NOT NULL,
  "country" text NOT NULL
);

CREATE TABLE "cars" (
  "id" SERIAL PRIMARY KEY,
  "agency_id" int NOT NULL,
  "color" text NOT NULL,
  "plate" text NOT NULL,
  "year" int NOT NULL
);

CREATE TABLE "models" (
  "id" SERIAL PRIMARY KEY,
  "car_id" int NOT NULL,
  "manufacturer" text NOT NULL,
  "model" text NOT NULL,
  "category" text NOT NULL,
  "doors" int NOT NULL,
  "passengers" int NOT NULL,
  "air_conditioning" int NOT NULL,
  "trunk" int NOT NULL,
  "gas_type" text NOT NULL
);

CREATE TABLE "orders" (
  "id" SERIAL PRIMARY KEY,
  "customer_id" int NOT NULL,
  "agency_id" int NOT NULL,
  "car_id" int NOT NULL,
  "model_id" int NOT NULL,
  "rent_start" timestamp NOT NULL,
  "rent_end" timestamp NOT NULL,
  "total" int NOT NULL
);

ALTER TABLE "addesses" ADD FOREIGN KEY ("agency_id") REFERENCES "agencies" ("id");

ALTER TABLE "cars" ADD FOREIGN KEY ("agency_id") REFERENCES "agencies" ("id");

ALTER TABLE "models" ADD FOREIGN KEY ("car_id") REFERENCES "cars" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("customer_id") REFERENCES "customers" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("agency_id") REFERENCES "agencies" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("car_id") REFERENCES "cars" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("model_id") REFERENCES "models" ("id");
