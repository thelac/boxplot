-- This code can be used to bypass the first two migrations (initial and create_tables)
-- It tricks Sequelize into thinking those two migrations have been applied to the db already
-- To run on boxplot: psql boxplot < migrations/bypass_initial.sql

CREATE TABLE "SequelizeMeta" (
    id integer NOT NULL,
    "from" character varying(255),
    "to" character varying(255)
);

CREATE SEQUENCE "SequelizeMeta_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE "SequelizeMeta_id_seq" OWNED BY "SequelizeMeta".id;

ALTER TABLE ONLY "SequelizeMeta" ALTER COLUMN id SET DEFAULT nextval('"SequelizeMeta_id_seq"'::regclass);

INSERT INTO "SequelizeMeta" (id, "from", "to") VALUES
(1, 20140526155106, 20140526155106),
(2, 20140526155106, 20140526155137);

SELECT setval('"SequelizeMeta_id_seq"', 2, true);

ALTER TABLE ONLY "SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (id);
