-- create table person
-- (
--     personId int auto_increment PRIMARY KEY,
--     nome varchar(85) NULL,
--     apelido varchar(85) NULL,
--     sexo varchar(3) NULL
-- );

-- create table worker(
--     workerId int auto_increment PRIMARY KEY,
--     personId int,
--     foreign key (personId) references person(personId)
-- );

-- create table iten(
--     itenId int auto_increment PRIMARY KEY,
--     description varchar(45) NULL
-- )

CREATE procedure insert_worker (
    in name varchar(85),
    in apelido varchar(85),
    in job varchar(45),
    in workerId int
	)
BEGIN
    insert into person(nome,apelido) values(name,apelido);
    SELECT LAST_INSERT_ID() INTO @personId;
    insert into worker(personId,job) values(@personId,job);
END