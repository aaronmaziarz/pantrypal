create schema if not exists app_public;
create schema if not exists private;

comment on schema app_public is 'Public application schema reserved for PantryPal services.';
comment on schema private is 'Private schema reserved for internal PantryPal tables and jobs.';
