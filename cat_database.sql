
CREATE TABLE IF NOT EXISTS public.card_information
(
    id bigint NOT NULL DEFAULT nextval('card_information_id_seq'::regclass),
    card_number character varying(16) COLLATE pg_catalog."default" NOT NULL,
    card_type character varying(16) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT card_information_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.card_information
    OWNER to postgres;


CREATE TABLE IF NOT EXISTS public.address
(
    id bigint NOT NULL DEFAULT nextval('address_id_seq'::regclass),
    street_address character varying(255) COLLATE pg_catalog."default" NOT NULL,
    city character varying(50) COLLATE pg_catalog."default" NOT NULL,
    state character varying(2) COLLATE pg_catalog."default" NOT NULL,
    zipcode character varying(5) COLLATE pg_catalog."default",
    country character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT address_pkey PRIMARY KEY (id)
)

CREATE TABLE IF NOT EXISTS public.contact_information
(
    id bigint NOT NULL DEFAULT nextval('customer_information_customer_information_id_seq'::regclass),
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    phone character varying(20) COLLATE pg_catalog."default" NOT NULL,
    shipping_address_id bigint NOT NULL,
    billing_address_id bigint NOT NULL,
    CONSTRAINT contact_information_pkey PRIMARY KEY (id),
    CONSTRAINT contact_information_id_email_key UNIQUE (id, email),
    CONSTRAINT billing_address_id_fkey FOREIGN KEY (billing_address_id)
        REFERENCES public.address (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT shipping_address_id_fkey FOREIGN KEY (shipping_address_id)
        REFERENCES public.address (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.contact_information
    OWNER to postgres;



TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.address
    OWNER to postgres;


CREATE TABLE IF NOT EXISTS public.product
(
    id bigint NOT NULL DEFAULT nextval('product_id_seq'::regclass),
    product_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    price numeric(10,2) NOT NULL,
    inventory_id bigint NOT NULL,
    CONSTRAINT product_pkey PRIMARY KEY (id),
    CONSTRAINT product_inventory_id FOREIGN KEY (inventory_id)
        REFERENCES public.inventory (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.product
    OWNER to postgres;


CREATE TABLE IF NOT EXISTS public."order"
(
    id bigint NOT NULL DEFAULT nextval('order_id_seq'::regclass),
    tracking_number character varying(14) COLLATE pg_catalog."default" NOT NULL,
    shipped_from_address_id bigint NOT NULL,
    purchase_date date NOT NULL,
    estimated_delivery_date date NOT NULL,
    product_id bigint NOT NULL,
    quantity integer NOT NULL,
    customer_id bigint NOT NULL,
    total numeric(10,2) NOT NULL,
    CONSTRAINT order_pkey PRIMARY KEY (id),
    CONSTRAINT order_customer_id_fkey FOREIGN KEY (customer_id)
        REFERENCES public.customer (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT order_product_id_fkey FOREIGN KEY (product_id)
        REFERENCES public.product (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT order_shipped_from_address_id_fkey FOREIGN KEY (shipped_from_address_id)
        REFERENCES public.address (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."order"
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.customer
(
    id bigint NOT NULL DEFAULT nextval('customer_id_seq'::regclass),
    first_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    contact_information_id bigint NOT NULL,
    card_id bigint NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    created_date date NOT NULL,
    user_type character varying(10) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT customer_id_pkey PRIMARY KEY (id),
    CONSTRAINT customer_card_id_key UNIQUE (card_id),
    CONSTRAINT customer_contact_information_id_key UNIQUE (contact_information_id),
    CONSTRAINT customer_card_id_fkey FOREIGN KEY (card_id)
        REFERENCES public.card_information (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT customer_contact_information_id_fkey FOREIGN KEY (contact_information_id)
        REFERENCES public.contact_information (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.customer
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.admin
(
    id bigint NOT NULL DEFAULT nextval('admin_admin_id_seq'::regclass),
    first_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    contact_information_id bigint NOT NULL,
    password character varying(100) COLLATE pg_catalog."default" NOT NULL,
    user_type character varying(10) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT admin_pkey PRIMARY KEY (id),
    CONSTRAINT admin_contact_information_id_key UNIQUE (contact_information_id),
    CONSTRAINT admin_contact_information_id_fkey FOREIGN KEY (contact_information_id)
        REFERENCES public.contact_information (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.admin
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.inventory
(
    id bigint NOT NULL,
    CONSTRAINT inventory_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.inventory
    OWNER to postgres;