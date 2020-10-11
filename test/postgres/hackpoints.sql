
CREATE SCHEMA IF NOT EXISTS hackpoints;

--
-- Name: bounties; Type: TABLE; Schema: hackpoints;
--

CREATE TABLE IF NOT EXISTS hackpoints.bounties (
    title text NOT NULL,
    message text NOT NULL,
    date_created date NOT NULL,
    deadline date,
    current_status_id smallint NOT NULL,
    date_completed date,
    bounty_id serial NOT NULL
);


--
-- Name: COLUMN bounties.deadline; Type: COMMENT; Schema: hackpoints;
--

COMMENT ON COLUMN hackpoints.bounties.deadline IS 'date that this bounty should be completed';


--
-- Name: COLUMN bounties.current_status_id; Type: COMMENT; Schema: hackpoints;
--

COMMENT ON COLUMN hackpoints.bounties.current_status_id IS 'maps to a status in the status table';


--
-- Name: bounty_endorsements; Type: TABLE; Schema: hackpoints; Owner: test
--

CREATE TABLE hackpoints.bounty_endorsements (
    bounty_id integer NOT NULL,
    user_id integer NOT NULL
);

--
-- Name: statuses; Type: TABLE; Schema: hackpoints;
--

CREATE TABLE IF NOT EXISTS hackpoints.statuses (
    status text,
    id smallint NOT NULL
);

--
-- Name: statuses_id_seq; Type: SEQUENCE; Schema: hackpoints;
--

ALTER TABLE hackpoints.statuses ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME hackpoints.statuses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: hackpoints;
--

CREATE TABLE IF NOT EXISTS hackpoints.users (
    user_id integer NOT NULL,
    username text NOT NULL,
    passhash character varying NOT NULL,
    points integer NOT NULL,
    avatar text,
    email text NOT NULL
);

--
-- Data for Name: bounties; Type: TABLE DATA; Schema: hackpoints;
--

COPY hackpoints.bounties (title, message, date_created, deadline, current_status_id, date_completed, bounty_id) FROM stdin;
\.


CREATE VIEW hackpoints.bounty_v AS
 SELECT bounties.title,
    bounties.message,
    bounties.date_created,
    bounties.deadline,
    bounties.current_status_id,
    bounties.date_completed,
    bounties.bounty_id,
    ( SELECT count(*) AS count
           FROM hackpoints.bounty_endorsements
          WHERE (bounty_endorsements.bounty_id = bounties.bounty_id)) AS endorsements_count,
	(ARRAY(SELECT user_id from hackpoints.bounty_endorsements where bounty_id = bounties.bounty_id)) AS endorsements
   FROM hackpoints.bounties;


--
-- Data for Name: statuses; Type: TABLE DATA; Schema: hackpoints;
--

COPY hackpoints.statuses (status) FROM stdin;
PENDING
BLOCKED
INPROGRESS
COMPLETED
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: hackpoints;
--

COPY hackpoints.users (user_id, username, passhash, points, avatar, email) FROM stdin;
\.


--
-- Name: statuses_id_seq; Type: SEQUENCE SET; Schema: hackpoints;
--

SELECT pg_catalog.setval('hackpoints.statuses_id_seq', 5, true);

--
-- Data for Name: bounty_endorsements; Type: TABLE DATA; Schema: hackpoints; Owner: test
--

COPY hackpoints.bounty_endorsements (bounty_id, user_id) FROM stdin;
\.

--
-- Name: bounties bounties_pkey; Type: CONSTRAINT; Schema: hackpoints;
--

ALTER TABLE ONLY hackpoints.bounties
    ADD CONSTRAINT bounties_pkey PRIMARY KEY (bounty_id);


--
-- Name: users email; Type: CONSTRAINT; Schema: hackpoints;
--

ALTER TABLE ONLY hackpoints.users
    ADD CONSTRAINT email UNIQUE (email);


--
-- Name: statuses statuses_pkey; Type: CONSTRAINT; Schema: hackpoints;
--

ALTER TABLE ONLY hackpoints.statuses
    ADD CONSTRAINT statuses_pkey PRIMARY KEY (id);


--
-- Name: users username; Type: CONSTRAINT; Schema: hackpoints;
--

ALTER TABLE ONLY hackpoints.users
    ADD CONSTRAINT username UNIQUE (username);


--
-- Name: bounty_endorsements only_one_per_bounty; Type: CONSTRAINT; Schema: hackpoints; Owner: test
--

ALTER TABLE ONLY hackpoints.bounty_endorsements
    ADD CONSTRAINT only_one_per_bounty UNIQUE (bounty_id, user_id);

--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: hackpoints;
--

ALTER TABLE ONLY hackpoints.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);

--
-- Name: bounties current_status_id; Type: FK CONSTRAINT; Schema: hackpoints;
--

ALTER TABLE ONLY hackpoints.bounties
    ADD CONSTRAINT current_status_id FOREIGN KEY (current_status_id) REFERENCES hackpoints.statuses(id) NOT VALID;

