create database DBEmpresa;

CREATE TABLE CARGO(
IdCargo serial primary key ,
Descripcion varchar(50) 
);

Create table SEDE(
IdSede serial primary key,
Descripcion varchar(50)
);

create table EMPLEADO(
IdEmpleado serial primary key ,
Nombre varchar(60),
Correo varchar(60),
Telefono varchar(60),
IdCargo int references CARGO(IdCargo),
IdSede int references SEDE(IdSede)
);