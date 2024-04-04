ALTER TABLE db_microservice_exams.students MODIFY COLUMN photo LONGBLOB NULL;
INSERT INTO db_microservice_exams.students (create_at,email,name,photo,second_name) VALUES
	 ('2024-04-02 12:28:57.176000','jose@email.com','Jose Luis',NULL,'Aresti'),
	 ('2024-04-02 12:31:16.654000','carlos@email.com','Carlos',NULL,'Castrati'),
	 ('2024-04-03 00:25:44.141000','marta@mail.com','Marta',NULL,'Aresti'),
	 ('2024-04-03 01:56:04.171000','pilar@mail.com','Pilar',NULL,'Pardo'),
	 ('2024-04-03 13:56:09.334000','calvo@mail.com','Alvaro',NULL,'Borja'),
	 ('2024-04-03 13:56:41.479000','rocio@mail.com','Rocio',NULL,'Marinez'),
	 ('2024-04-03 13:56:59.535000','sore@maiil.com','Diego',NULL,'Soriano'),
	 ('2024-04-03 13:57:19.164000','jmaravilla@mail.com','Juanito',NULL,'Soler'),
	 ('2024-04-03 13:57:33.303000','lupi@mail.com','Luis',NULL,'Lopez'),
	 ('2024-04-03 13:57:48.127000','leke@mail.com','Jose Manuel',NULL,'Serrano');
INSERT INTO db_microservice_exams.students (create_at,email,name,photo,second_name) VALUES
	 ('2024-04-03 13:58:02.479000','mooooar@mail.com','Marc',NULL,'Molinero'),
	 ('2024-04-03 13:58:55.662000','yogui@mail.com','Jorge',NULL,'Izquierdo'),
	 ('2024-04-03 13:59:25.974000','la12@mail.com','Agus',NULL,'Montanaro'),
	 ('2024-04-03 13:59:45.928000','mario@mail.com','Mario',NULL,'Suarez'),
	 ('2024-04-04 01:18:10.721000','das@asd.com','Creando',NULL,'Foto');
