insert into usuario(email, password, espremium) values ('admin@nutriapp.es', 'admin', true);
insert into authorities(email, authority) values ('admin@nutriapp.es','ROLE_ADMIN');

insert into usuario(email, password, espremium) values ('user@nutriapp.es', 'user', false);
insert into authorities(email, authority) values ('user@nutriapp.es','ROLE_ESTANDAR');

insert into usuario(email, password, espremium) values ('premium@nutriapp.es', 'premium', true);
insert into authorities(email, authority) values ('premium@nutriapp.es','ROLE_PREMIUM');