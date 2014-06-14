-- Created with `pg_dump -O -s -x boxplot | egrep -v "(^SET|^/\*\!)" > mypostgres`
-- NOTE: If creating new initial.sql file, NEED TO REMOVE THE COMMENTS with semicolons

--
-- PostgreSQL database dump
--


CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


CREATE TABLE "Data" (
    id integer NOT NULL,
    count integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "UserId" integer
);


CREATE SEQUENCE "Data_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "Data_id_seq" OWNED BY "Data".id;


CREATE TABLE "Groups" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    creator integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


CREATE TABLE "GroupsUsers" (
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "GroupId" integer NOT NULL,
    "UserId" integer NOT NULL
);


CREATE SEQUENCE "Groups_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "Groups_id_seq" OWNED BY "Groups".id;


CREATE TABLE "Users" (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    "profileID" character varying(255),
    token character varying(255),
    "refreshToken" character varying(255),
    name character varying(255),
    activation_code character varying(255),
    password_reset_code character varying(255),
    password_reset_time character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "DatumId" integer
);


CREATE SEQUENCE "Users_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "Users_id_seq" OWNED BY "Users".id;


CREATE TABLE session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


ALTER TABLE ONLY "Data" ALTER COLUMN id SET DEFAULT nextval('"Data_id_seq"'::regclass);


ALTER TABLE ONLY "Groups" ALTER COLUMN id SET DEFAULT nextval('"Groups_id_seq"'::regclass);


ALTER TABLE ONLY "Users" ALTER COLUMN id SET DEFAULT nextval('"Users_id_seq"'::regclass);


ALTER TABLE ONLY "Data"
    ADD CONSTRAINT "Data_pkey" PRIMARY KEY (id);


ALTER TABLE ONLY "GroupsUsers"
    ADD CONSTRAINT "GroupsUsers_pkey" PRIMARY KEY ("GroupId", "UserId");


ALTER TABLE ONLY "Groups"
    ADD CONSTRAINT "Groups_name_key" UNIQUE (name);


ALTER TABLE ONLY "Groups"
    ADD CONSTRAINT "Groups_pkey" PRIMARY KEY (id);


ALTER TABLE ONLY "Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


ALTER TABLE ONLY "Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


ALTER TABLE ONLY session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);
