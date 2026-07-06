--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2026-07-06 10:40:42

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4799 (class 1262 OID 16398)
-- Name: watchgram-bd; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "watchgram-bd" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Argentina.1252';


ALTER DATABASE "watchgram-bd" OWNER TO postgres;

\connect -reuse-previous=on "dbname='watchgram-bd'"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 16399)
-- Name: publicaciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.publicaciones (
    id integer NOT NULL,
    usuario_id integer,
    url_imagen character varying NOT NULL,
    descripcion text,
    likes integer DEFAULT 0,
    fecha_creacion timestamp without time zone
);


ALTER TABLE public.publicaciones OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16405)
-- Name: publicaciones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.publicaciones ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.publicaciones_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 217 (class 1259 OID 16406)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre_completo character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    foto_perfil character varying,
    biografia character varying,
    nombre_usuario character varying NOT NULL
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16411)
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.usuarios ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.usuarios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 4790 (class 0 OID 16399)
-- Dependencies: 215
-- Data for Name: publicaciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.publicaciones OVERRIDING SYSTEM VALUE VALUES (2, 1, 'https://ejemplo.com/gato-teclado.jpg', 'Intenté programar pero alguien tenía otros planes', 0, '2026-07-06 10:24:22.118223');
INSERT INTO public.publicaciones OVERRIDING SYSTEM VALUE VALUES (1, 1, 'https://ejemplo.com/gato-durmiendo-caja.jpg', 'Mi gato encontró su nueva caja favorita, ahora vive ahí', 3, '2026-07-06 10:24:16.395324');


--
-- TOC entry 4792 (class 0 OID 16406)
-- Dependencies: 217
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.usuarios OVERRIDING SYSTEM VALUE VALUES (2, 'Michi Developer', 'michi@example.com', '$2a$10$gtdN2vTFPCWD5/cFu.JKjebYkfyyIgcaUjYBf5.ndqB.SR9FKyyN2', 'https://ejemplo.com/michi.jpg', NULL, 'michi_dev');
INSERT INTO public.usuarios OVERRIDING SYSTEM VALUE VALUES (1, 'Gato Programador Senior', 'gato@example.com', '$2a$10$zhD0jKA4YiNvreAcjSKckeh2imIQyLbEMRp6D6RAcagDxPnWizBva', 'https://ejemplo.com/foto-nueva.jpg', 'Full stack developer especializado en siestas y teclados', 'gato_programador');


--
-- TOC entry 4800 (class 0 OID 0)
-- Dependencies: 216
-- Name: publicaciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.publicaciones_id_seq', 2, true);


--
-- TOC entry 4801 (class 0 OID 0)
-- Dependencies: 218
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 2, true);


--
-- TOC entry 4641 (class 2606 OID 16413)
-- Name: publicaciones publicaciones_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publicaciones
    ADD CONSTRAINT publicaciones_pk PRIMARY KEY (id);


--
-- TOC entry 4643 (class 2606 OID 16415)
-- Name: usuarios usuarios_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pk PRIMARY KEY (id);


--
-- TOC entry 4645 (class 2606 OID 16417)
-- Name: usuarios usuarios_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_unique UNIQUE (nombre_usuario);


--
-- TOC entry 4646 (class 2606 OID 16418)
-- Name: publicaciones publicaciones_usuarios_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publicaciones
    ADD CONSTRAINT publicaciones_usuarios_fk FOREIGN KEY (id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


-- Completed on 2026-07-06 10:40:42

--
-- PostgreSQL database dump complete
--

