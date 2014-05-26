-- Created with `pg_dump -O -s -x boxplot | egrep -v "(^SET|^/\*\!)" > mypostgres`

--
-- PostgreSQL database dump
--


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';





--
-- Name: Data; Type: TABLE; Schema: public; Owner: -; Tablespace:
--

CREATE TABLE "Data" (
    id integer NOT NULL,
    count integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "UserId" integer
);


--
-- Name: Data_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "Data_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "Data_id_seq" OWNED BY "Data".id;


--
-- Name: Groups; Type: TABLE; Schema: public; Owner: -; Tablespace:
--

CREATE TABLE "Groups" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    creator integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- Name: GroupsUsers; Type: TABLE; Schema: public; Owner: -; Tablespace:
--

CREATE TABLE "GroupsUsers" (
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "GroupId" integer NOT NULL,
    "UserId" integer NOT NULL
);


--
-- Name: Groups_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "Groups_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "Groups_id_seq" OWNED BY "Groups".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: -; Tablespace:
--

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


--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "Users_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "Users_id_seq" OWNED BY "Users".id;


--
-- Name: session; Type: TABLE; Schema: public; Owner: -; Tablespace:
--

CREATE TABLE session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Data" ALTER COLUMN id SET DEFAULT nextval('"Data_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Groups" ALTER COLUMN id SET DEFAULT nextval('"Groups_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Users" ALTER COLUMN id SET DEFAULT nextval('"Users_id_seq"'::regclass);


--
-- Name: Data_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace:
--

ALTER TABLE ONLY "Data"
    ADD CONSTRAINT "Data_pkey" PRIMARY KEY (id);


--
-- Name: GroupsUsers_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace:
--

ALTER TABLE ONLY "GroupsUsers"
    ADD CONSTRAINT "GroupsUsers_pkey" PRIMARY KEY ("GroupId", "UserId");


--
-- Name: Groups_name_key; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace:
--

ALTER TABLE ONLY "Groups"
    ADD CONSTRAINT "Groups_name_key" UNIQUE (name);


--
-- Name: Groups_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace:
--

ALTER TABLE ONLY "Groups"
    ADD CONSTRAINT "Groups_pkey" PRIMARY KEY (id);


--
-- Name: Users_email_key; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace:
--

ALTER TABLE ONLY "Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- Name: Users_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace:
--

ALTER TABLE ONLY "Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: session_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace:
--

ALTER TABLE ONLY session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- PostgreSQL database dump complete
--

