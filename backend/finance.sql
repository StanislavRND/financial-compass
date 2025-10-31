--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.4

-- Started on 2025-10-31 23:22:40

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 32861)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 4875 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 226 (class 1259 OID 32931)
-- Name: CategoryExpense; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CategoryExpense" (
    id integer NOT NULL,
    name text NOT NULL,
    color text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."CategoryExpense" OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 32930)
-- Name: CategoryExpense_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CategoryExpense_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CategoryExpense_id_seq" OWNER TO postgres;

--
-- TOC entry 4877 (class 0 OID 0)
-- Dependencies: 225
-- Name: CategoryExpense_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CategoryExpense_id_seq" OWNED BY public."CategoryExpense".id;


--
-- TOC entry 228 (class 1259 OID 32941)
-- Name: CategoryIncome; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CategoryIncome" (
    id integer NOT NULL,
    name text NOT NULL,
    color text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."CategoryIncome" OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 32940)
-- Name: CategoryIncome_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CategoryIncome_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CategoryIncome_id_seq" OWNER TO postgres;

--
-- TOC entry 4878 (class 0 OID 0)
-- Dependencies: 227
-- Name: CategoryIncome_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CategoryIncome_id_seq" OWNED BY public."CategoryIncome".id;


--
-- TOC entry 222 (class 1259 OID 32900)
-- Name: Expense; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Expense" (
    id integer NOT NULL,
    sum integer NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    "categoryId" integer NOT NULL,
    "userId" integer NOT NULL,
    "familyId" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Expense" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 32899)
-- Name: Expense_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Expense_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Expense_id_seq" OWNER TO postgres;

--
-- TOC entry 4879 (class 0 OID 0)
-- Dependencies: 221
-- Name: Expense_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Expense_id_seq" OWNED BY public."Expense".id;


--
-- TOC entry 220 (class 1259 OID 32873)
-- Name: Family; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Family" (
    id integer NOT NULL,
    invite text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Family" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 32872)
-- Name: Family_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Family_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Family_id_seq" OWNER TO postgres;

--
-- TOC entry 4880 (class 0 OID 0)
-- Dependencies: 219
-- Name: Family_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Family_id_seq" OWNED BY public."Family".id;


--
-- TOC entry 224 (class 1259 OID 32923)
-- Name: Income; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Income" (
    id integer NOT NULL,
    sum integer NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    "categoryId" integer NOT NULL,
    "userId" integer NOT NULL,
    "familyId" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Income" OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 32922)
-- Name: Income_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Income_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Income_id_seq" OWNER TO postgres;

--
-- TOC entry 4881 (class 0 OID 0)
-- Dependencies: 223
-- Name: Income_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Income_id_seq" OWNED BY public."Income".id;


--
-- TOC entry 230 (class 1259 OID 33063)
-- Name: Message; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Message" (
    id integer NOT NULL,
    content text NOT NULL,
    "userId" integer NOT NULL,
    "familyId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Message" OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 33062)
-- Name: Message_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Message_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Message_id_seq" OWNER TO postgres;

--
-- TOC entry 4882 (class 0 OID 0)
-- Dependencies: 229
-- Name: Message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Message_id_seq" OWNED BY public."Message".id;


--
-- TOC entry 218 (class 1259 OID 32863)
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    name text NOT NULL,
    login text NOT NULL,
    password text NOT NULL,
    "familyId" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 32862)
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO postgres;

--
-- TOC entry 4883 (class 0 OID 0)
-- Dependencies: 217
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- TOC entry 4679 (class 2604 OID 32934)
-- Name: CategoryExpense id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CategoryExpense" ALTER COLUMN id SET DEFAULT nextval('public."CategoryExpense_id_seq"'::regclass);


--
-- TOC entry 4681 (class 2604 OID 32944)
-- Name: CategoryIncome id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CategoryIncome" ALTER COLUMN id SET DEFAULT nextval('public."CategoryIncome_id_seq"'::regclass);


--
-- TOC entry 4675 (class 2604 OID 32903)
-- Name: Expense id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Expense" ALTER COLUMN id SET DEFAULT nextval('public."Expense_id_seq"'::regclass);


--
-- TOC entry 4673 (class 2604 OID 32876)
-- Name: Family id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Family" ALTER COLUMN id SET DEFAULT nextval('public."Family_id_seq"'::regclass);


--
-- TOC entry 4677 (class 2604 OID 32926)
-- Name: Income id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Income" ALTER COLUMN id SET DEFAULT nextval('public."Income_id_seq"'::regclass);


--
-- TOC entry 4683 (class 2604 OID 33066)
-- Name: Message id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Message" ALTER COLUMN id SET DEFAULT nextval('public."Message_id_seq"'::regclass);


--
-- TOC entry 4671 (class 2604 OID 32866)
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- TOC entry 4865 (class 0 OID 32931)
-- Dependencies: 226
-- Data for Name: CategoryExpense; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CategoryExpense" (id, name, color, "createdAt") FROM stdin;
1	Здоровье	#E20000	2025-07-24 13:50:24.583
2	Досуг	#00EDBE	2025-07-24 13:50:24.583
3	Дом	#FFB700	2025-07-24 13:50:24.583
4	Кафе	#E195FD	2025-07-24 13:50:24.583
5	Образование	#59ABFE	2025-07-24 13:50:24.583
7	Продукты	#00E52A	2025-07-24 13:50:24.583
8	Семья	#E5DE00	2025-07-24 13:50:24.583
9	Спорт	#E88400	2025-07-24 13:50:24.583
10	Транспорт	#02029F	2025-07-24 13:50:24.583
11	Другое	#727272	2025-07-24 13:50:24.583
12	Переводы	#C000A0	2025-07-24 13:50:24.583
13	Казик	#58191a	2025-07-24 13:50:24.583
6	Подарки	#FD6DFF	2025-07-24 13:50:24.583
\.


--
-- TOC entry 4867 (class 0 OID 32941)
-- Dependencies: 228
-- Data for Name: CategoryIncome; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CategoryIncome" (id, name, color, "createdAt") FROM stdin;
1	Зарплата	#59ABFE	2025-07-24 13:52:35.255
2	Подарок	#FD6DFF	2025-07-24 13:52:35.255
3	Проценты банка	#00E52A	2025-07-24 13:52:35.255
4	Другое	#727272	2025-07-24 13:52:35.255
5	Казик	#58191a	2025-07-24 13:52:35.255
\.


--
-- TOC entry 4861 (class 0 OID 32900)
-- Dependencies: 222
-- Data for Name: Expense; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Expense" (id, sum, date, "categoryId", "userId", "familyId", "createdAt", "updatedAt") FROM stdin;
43	1000	2025-07-24 13:53:05.828	2	1	1	2025-07-24 13:53:05.83	2025-07-24 13:53:05.83
44	36	2025-07-24 13:53:12.226	10	1	1	2025-07-24 13:53:12.228	2025-07-24 13:53:12.228
45	10000	2025-07-24 13:53:23.328	6	1	1	2025-07-24 13:53:23.33	2025-07-24 13:53:23.33
46	5100	2025-07-22 13:54:32.873	13	1	1	2025-07-24 13:54:32.874	2025-07-24 13:54:32.874
47	200	2025-07-17 13:54:55.027	13	1	1	2025-07-24 13:54:55.028	2025-07-24 13:54:55.028
48	10000	2025-07-24 15:04:24.682	13	3	\N	2025-07-24 15:04:24.689	2025-07-24 15:04:24.689
49	200000	2025-07-24 15:04:50.271	13	3	\N	2025-07-24 15:04:50.278	2025-07-24 15:04:50.278
50	1000	2025-08-27 13:14:51.776	13	5	\N	2025-08-27 13:14:51.778	2025-08-27 13:14:51.778
51	1000	2025-08-27 13:17:20.866	13	7	\N	2025-08-27 13:17:20.868	2025-08-27 13:17:20.868
52	1000	2025-08-27 13:18:57.673	13	7	3	2025-08-27 13:18:57.675	2025-08-27 13:18:57.675
58	457	2025-09-20 16:40:44.366	2	14	4	2025-09-21 16:40:44.374	2025-09-21 16:40:44.374
67	3255	2025-09-27 17:09:57.816	13	9	4	2025-09-28 17:09:57.818	2025-09-28 17:09:57.818
71	54	2025-09-28 17:29:14.506	10	9	4	2025-09-28 17:29:14.508	2025-09-28 17:29:14.508
73	3553	2025-09-28 18:19:29.309	2	9	4	2025-09-28 18:19:29.31	2025-09-28 18:19:29.31
77	1000	2025-10-05 09:37:57.776	6	9	4	2025-10-05 09:37:57.778	2025-10-05 09:37:57.778
78	100	2025-10-31 19:04:32.568	9	9	4	2025-10-31 19:04:32.583	2025-10-31 19:04:32.583
\.


--
-- TOC entry 4859 (class 0 OID 32873)
-- Dependencies: 220
-- Data for Name: Family; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Family" (id, invite, "createdAt") FROM stdin;
1	KCF65T	2025-07-20 20:36:53.337
2	L3PHEL	2025-08-27 13:15:18.449
3	VM91LN	2025-08-27 13:17:55.093
4	GWHR91	2025-09-21 16:30:19.614
5	MHCD3L	2025-10-06 18:15:18.976
6	XWXL9N	2025-10-06 18:16:37.369
\.


--
-- TOC entry 4863 (class 0 OID 32923)
-- Dependencies: 224
-- Data for Name: Income; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Income" (id, sum, date, "categoryId", "userId", "familyId", "createdAt", "updatedAt") FROM stdin;
1	100000	2025-07-24 14:45:29.687	1	1	1	2025-07-24 14:45:29.687	2025-07-24 14:46:25.452
2	345	2025-09-28 15:57:05.164	3	9	4	2025-09-28 15:57:05.165	2025-09-28 15:57:05.165
3	35	2025-09-28 16:15:00.595	2	9	4	2025-09-28 16:15:00.597	2025-09-28 16:15:00.597
5	50000	2025-09-28 17:18:18.603	1	9	4	2025-09-28 17:18:18.604	2025-09-28 17:18:18.604
6	400000	2024-10-09 18:05:59.564	1	9	4	2025-09-28 18:05:59.565	2025-09-28 18:05:59.565
7	2352	2025-09-28 18:24:02.337	2	9	4	2025-09-28 18:24:02.339	2025-09-28 18:24:02.339
8	235	2025-09-28 18:24:12.858	2	9	4	2025-09-28 18:24:12.859	2025-09-28 18:24:12.859
9	5000	2025-09-16 18:25:18.907	5	9	4	2025-09-28 18:25:18.908	2025-09-28 18:25:18.908
10	90000	2025-10-10 09:38:14.4	1	9	4	2025-10-05 09:38:14.402	2025-10-05 09:38:14.402
\.


--
-- TOC entry 4869 (class 0 OID 33063)
-- Dependencies: 230
-- Data for Name: Message; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Message" (id, content, "userId", "familyId", "createdAt", "updatedAt") FROM stdin;
24	Привет	9	4	2025-10-22 20:06:41.248	2025-10-22 20:06:41.248
25	Привет	14	4	2025-10-22 20:06:44.651	2025-10-22 20:06:44.651
26	Как дела?	14	4	2025-10-22 20:06:50.046	2025-10-22 20:06:50.046
27	Все хорошо	9	4	2025-10-22 20:06:54.05	2025-10-22 20:06:54.05
28	У тебя как?	9	4	2025-10-22 20:06:57.618	2025-10-22 20:06:57.618
29	Нормик	14	4	2025-10-22 20:07:01.051	2025-10-22 20:07:01.051
30	Отлично	9	4	2025-10-22 20:13:22.092	2025-10-22 20:13:22.092
\.


--
-- TOC entry 4857 (class 0 OID 32863)
-- Dependencies: 218
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, name, login, password, "familyId", "createdAt", "updatedAt") FROM stdin;
2	Яяна	yana	$2b$10$STZLNMkA8Q2yH9F84XV8aepxylGm72xI4sibvuU/TYJAXh/wLeNPa	1	2025-07-20 20:37:11.959	2025-07-20 20:37:11.959
3	Пидор	pidor	$2b$10$jPkvdrhGHsFvqonHCag5UeK725gxEzsNqecbGcKQGef3r52DERVje	\N	2025-07-20 22:05:21.342	2025-07-20 22:05:21.342
4	Пидор1	pidor1	$2b$10$G33WtdYqsS6K.wN6rjiA5.4sdMEvIvVjVdB466HbweB4ElVxtniWO	\N	2025-07-20 22:05:32.083	2025-07-20 22:05:32.083
7	Рома	roma	$2b$10$WUERjaSFknwLFQjkQCsioev9cnDO1XcbzHtKV1bEDg5dLn57xZLga	3	2025-08-27 13:17:05.948	2025-08-27 13:17:55.095
8	yyana	Yana	$2b$10$8zc8csWBE2zK.7j9U.Pm.eErly2ClmARXWagpVcFWKKnTwwoKvbRC	3	2025-08-27 13:18:38.956	2025-08-27 13:18:38.956
9	Станислав	Stas	$2b$10$aadq1ueMvmq/UQFPtdOiJewa8G2RQbn21JkeJpEGmM6tLoqg7IEIm	4	2025-09-21 16:29:09.295	2025-09-21 16:30:19.618
14	Яныч	Yana1	$2b$10$9TiB.1AzF1wTsbpVKjdLGO5asAdpN7biRQB/OxDa.U4d8TBj7fQo2	4	2025-09-21 16:31:46.956	2025-09-21 16:31:46.956
15	godd	godd	$2b$10$BKSmnAKp.fBk1cjUk97J/e2ovxjdwZAApx2TlELsDE3Lhh4FjkBGm	6	2025-10-06 18:15:03.328	2025-10-06 18:16:37.372
1	Стас	nenotice	$2b$10$oDHKV6eURDxsdBKp7.hcse0pazK93jRDvEvDCJcA25HXJ/WiHFrrO	\N	2025-07-20 20:36:42.522	2025-07-20 20:36:53.342
5	Стас	stas	$2b$10$3hVtwusMcOroogxYsUSSBOB8YpCucaehwdTbaeC1S4odaCG10JziS	\N	2025-08-27 13:14:31.086	2025-08-27 13:15:18.458
\.


--
-- TOC entry 4884 (class 0 OID 0)
-- Dependencies: 225
-- Name: CategoryExpense_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CategoryExpense_id_seq"', 13, true);


--
-- TOC entry 4885 (class 0 OID 0)
-- Dependencies: 227
-- Name: CategoryIncome_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CategoryIncome_id_seq"', 5, true);


--
-- TOC entry 4886 (class 0 OID 0)
-- Dependencies: 221
-- Name: Expense_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Expense_id_seq"', 78, true);


--
-- TOC entry 4887 (class 0 OID 0)
-- Dependencies: 219
-- Name: Family_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Family_id_seq"', 6, true);


--
-- TOC entry 4888 (class 0 OID 0)
-- Dependencies: 223
-- Name: Income_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Income_id_seq"', 10, true);


--
-- TOC entry 4889 (class 0 OID 0)
-- Dependencies: 229
-- Name: Message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Message_id_seq"', 30, true);


--
-- TOC entry 4890 (class 0 OID 0)
-- Dependencies: 217
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 15, true);


--
-- TOC entry 4696 (class 2606 OID 32939)
-- Name: CategoryExpense CategoryExpense_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CategoryExpense"
    ADD CONSTRAINT "CategoryExpense_pkey" PRIMARY KEY (id);


--
-- TOC entry 4698 (class 2606 OID 32949)
-- Name: CategoryIncome CategoryIncome_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CategoryIncome"
    ADD CONSTRAINT "CategoryIncome_pkey" PRIMARY KEY (id);


--
-- TOC entry 4692 (class 2606 OID 32906)
-- Name: Expense Expense_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Expense"
    ADD CONSTRAINT "Expense_pkey" PRIMARY KEY (id);


--
-- TOC entry 4690 (class 2606 OID 32881)
-- Name: Family Family_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Family"
    ADD CONSTRAINT "Family_pkey" PRIMARY KEY (id);


--
-- TOC entry 4694 (class 2606 OID 32929)
-- Name: Income Income_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Income"
    ADD CONSTRAINT "Income_pkey" PRIMARY KEY (id);


--
-- TOC entry 4701 (class 2606 OID 33071)
-- Name: Message Message_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_pkey" PRIMARY KEY (id);


--
-- TOC entry 4687 (class 2606 OID 32871)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 4688 (class 1259 OID 32893)
-- Name: Family_invite_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Family_invite_key" ON public."Family" USING btree (invite);


--
-- TOC entry 4699 (class 1259 OID 33072)
-- Name: Message_familyId_createdAt_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Message_familyId_createdAt_idx" ON public."Message" USING btree ("familyId", "createdAt");


--
-- TOC entry 4685 (class 1259 OID 32892)
-- Name: User_login_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_login_key" ON public."User" USING btree (login);


--
-- TOC entry 4703 (class 2606 OID 32966)
-- Name: Expense Expense_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Expense"
    ADD CONSTRAINT "Expense_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."CategoryExpense"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4704 (class 2606 OID 32917)
-- Name: Expense Expense_familyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Expense"
    ADD CONSTRAINT "Expense_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES public."Family"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4705 (class 2606 OID 32912)
-- Name: Expense Expense_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Expense"
    ADD CONSTRAINT "Expense_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4706 (class 2606 OID 32971)
-- Name: Income Income_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Income"
    ADD CONSTRAINT "Income_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."CategoryIncome"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4707 (class 2606 OID 32981)
-- Name: Income Income_familyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Income"
    ADD CONSTRAINT "Income_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES public."Family"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4708 (class 2606 OID 32976)
-- Name: Income Income_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Income"
    ADD CONSTRAINT "Income_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4709 (class 2606 OID 33078)
-- Name: Message Message_familyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES public."Family"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4710 (class 2606 OID 33073)
-- Name: Message Message_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4702 (class 2606 OID 32894)
-- Name: User User_familyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES public."Family"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4876 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2025-10-31 23:22:40

--
-- PostgreSQL database dump complete
--

