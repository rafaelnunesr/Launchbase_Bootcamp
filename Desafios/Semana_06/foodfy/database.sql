DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

DROP TABLE IF EXISTS foodfy;
CREATE DATABASE foodfy;

-- chefs
CREATE TABLE public.chefs (
    id integer NOT NULL,
    name text,
    photo text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);

CREATE SEQUENCE public.chefs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.chefs_id_seq OWNED BY public.chefs.id;

ALTER TABLE ONLY public.chefs ALTER COLUMN id SET DEFAULT nextval('public.chefs_id_seq'::regclass);

ALTER TABLE ONLY public.chefs
ADD CONSTRAINT chefs_pkey PRIMARY KEY (id);

-- users
CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    reset_token text,
    reset_token_expires text,
    is_admin boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);

ALTER TABLE ONLY public.users
ADD CONSTRAINT users_email_key UNIQUE (email);

ALTER TABLE ONLY public.users
ADD CONSTRAINT users_pkey PRIMARY KEY (id);

-- recipes
CREATE TABLE public.recipes (
    id integer NOT NULL,
    chef_id integer,
    name text,
    ingredients text,
    preparation text,
    information text,
    user_id integer,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);

CREATE SEQUENCE public.recipes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.recipes_id_seq OWNED BY public.recipes.id;

ALTER TABLE ONLY public.recipes ALTER COLUMN id SET DEFAULT nextval('public.recipes_id_seq'::regclass);

ALTER TABLE ONLY public.recipes
ADD CONSTRAINT recipes_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.recipes
ADD CONSTRAINT recipes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);

-- files
CREATE TABLE public.files (
    id integer NOT NULL,
    name text NOT NULL,
    path text NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);

CREATE SEQUENCE public.files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.files_id_seq OWNED BY public.files.id;

ALTER TABLE ONLY public.files ALTER COLUMN id SET DEFAULT nextval('public.files_id_seq'::regclass);

ALTER TABLE ONLY public.files
ADD CONSTRAINT files_pkey PRIMARY KEY (id);

-- recipe_files
CREATE TABLE public.recipe_files (
    id integer NOT NULL,
    recipe_id integer,
    file_id integer
);

CREATE SEQUENCE public.recipe_files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.recipe_files_id_seq OWNED BY public.recipe_files.id;

ALTER TABLE ONLY public.recipe_files ALTER COLUMN id SET DEFAULT nextval('public.recipe_files_id_seq'::regclass);

ALTER TABLE ONLY public.recipe_files
ADD CONSTRAINT recipe_files_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.recipe_files
ADD CONSTRAINT recipe_files_file_id_fkey FOREIGN KEY (file_id) REFERENCES public.files(id);

ALTER TABLE ONLY public.recipe_files
ADD CONSTRAINT recipe_files_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id);
  
-- session
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
  )
  WITH(OIDS=FALSE);
  ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

  -- to run seeds
DELETE FROM recipe_files;
DELETE FROM recipes;
DELETE FROM users;
DELETE FROM chefs;
DELETE FROM files;

-- restart sequence auto-increment from tables ids
ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE chefs_id_seq RESTART WITH 1;
ALTER SEQUENCE recipes_id_seq RESTART WITH 1;
ALTER SEQUENCE recipe_files_id_seq RESTART WITH 1;
ALTER SEQUENCE files_id_seq RESTART WITH 1;