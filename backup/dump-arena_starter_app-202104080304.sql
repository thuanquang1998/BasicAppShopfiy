PGDMP                         y            arena_starter_app    12.4    12.2 	               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16856    arena_starter_app    DATABASE     ?   CREATE DATABASE arena_starter_app WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';
 !   DROP DATABASE arena_starter_app;
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                postgres    false                       0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   postgres    false    3            ?            1259    16863    store_settings    TABLE     ?  CREATE TABLE public.store_settings (
    store_name character varying NOT NULL,
    status character varying,
    install_date timestamp without time zone,
    uninstall_date timestamp without time zone,
    contact character varying,
    store_plan character varying,
    app_plan character varying,
    reinstall_date timestamp without time zone,
    accepted_date timestamp without time zone,
    app_plan_id bigint,
    scopes character varying,
    nonce character varying,
    token character varying
);
 "   DROP TABLE public.store_settings;
       public         heap    postgres    false    3            ?
          0    16863    store_settings 
   TABLE DATA           ?   COPY public.store_settings (store_name, status, install_date, uninstall_date, contact, store_plan, app_plan, reinstall_date, accepted_date, app_plan_id, scopes, nonce, token) FROM stdin;
    public          postgres    false    202            
           2606    16878     store_settings store_settings_pk 
   CONSTRAINT     f   ALTER TABLE ONLY public.store_settings
    ADD CONSTRAINT store_settings_pk PRIMARY KEY (store_name);
 J   ALTER TABLE ONLY public.store_settings DROP CONSTRAINT store_settings_pk;
       public            postgres    false    202            ?
   ?   x?E?Kn1D??)8 X??*'?HV?????S?G??&!A?M?{??SMU?g???S??7?t??h?ܮk²??Y!S??GƘ~??,??	uy??????r?
?8?+??(?????	>??w??y5	??5????]?'?K?*??}}????z???ր????8Y;N ?M??=S?      	               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16856    arena_starter_app    DATABASE     ?   CREATE DATABASE arena_starter_app WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';
 !   DROP DATABASE arena_starter_app;
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                postgres    false                       0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   postgres    false    3            ?            1259    16863    store_settings    TABLE     ?  CREATE TABLE public.store_settings (
    store_name character varying NOT NULL,
    status character varying,
    install_date timestamp without time zone,
    uninstall_date timestamp without time zone,
    contact character varying,
    store_plan character varying,
    app_plan character varying,
    reinstall_date timestamp without time zone,
    accepted_date timestamp without time zone,
    app_plan_id bigint,
    scopes character varying,
    nonce character varying,
    token character varying
);
 "   DROP TABLE public.store_settings;
       public         heap    postgres    false    3            ?
          0    16863    store_settings 
   TABLE DATA           ?   COPY public.store_settings (store_name, status, install_date, uninstall_date, contact, store_plan, app_plan, reinstall_date, accepted_date, app_plan_id, scopes, nonce, token) FROM stdin;
    public          postgres    false    202   2
       
           2606    16878     store_settings store_settings_pk 
   CONSTRAINT     f   ALTER TABLE ONLY public.store_settings
    ADD CONSTRAINT store_settings_pk PRIMARY KEY (store_name);
 J   ALTER TABLE ONLY public.store_settings DROP CONSTRAINT store_settings_pk;
       public            postgres    false    202           