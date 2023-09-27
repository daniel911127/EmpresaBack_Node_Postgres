const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

app.use(cors());
app.use(express.json());

app.post('/empleados', async (req, res) => {
  try {
    const { IdEmpleado,Nombre, Correo, Telefono, IdCargo, IdSede } = req.body;
    const newEmpleado = await pool.query(
      'insert into public."EMPLEADO"("IdEmpleado","Nombre","Correo","Telefono","IdCargo","IdSede")values($1,$2,$3,$4,$5,$6) returning *',
      [IdEmpleado,Nombre, Correo, Telefono, IdCargo, IdSede]
    );
    res.json(newEmpleado.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/empleados', async (req, res) => {
  try {
    const empleados = await pool.query('select * from public."EMPLEADO"');
    res.json(empleados.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/empleados/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const empleado = await pool.query(
      'select * from public."EMPLEADO" where "IdEmpleado"=$1',
      [id]
    );
    res.json(empleado.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.put('/empleados/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { Nombre, Correo, Telefono, IdCargo, IdSede } = req.body;
    const actualizar = await pool.query(
      'update public."EMPLEADO" SET "Nombre"=$1,"Correo"=$2,"Telefono"=$3,"IdCargo"=$4,"IdSede"=$5 Where "IdEmpleado"=$6 ',
      [Nombre, Correo, Telefono, IdCargo, IdSede, id]
    );
    res.json('empleado actualizado');
  } catch (err) {
    console.error(err.message);
  }
});

app.delete('/empleados/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const eliminar = await pool.query(
      'Delete From  public."EMPLEADO" WHERE "IdEmpleado"=$1 ',
      [id]
    );
    res.json('empleado eliminado');
  } catch (err) {
    console.error(err.message);
  }
});

app.post('/cargos', async (req, res) => {
  try {
    const {IdCargo, Descripcion } = req.body;
    const newCargo = await pool.query(
      'insert into public."CARGO"("IdCargo","Descripcion")values($1,$2) returning *',
      [IdCargo,Descripcion]
    );
    res.json(newCargo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/cargos', async (req, res) => {
  try {
    const cargos = await pool.query('select * from public."CARGO"');
    res.json(cargos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/cargos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const cargo = await pool.query('select * from public."CARGO" where "IdCargo"=$1',[id]);
    res.json(cargo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.put('/cargos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { Descripcion } = req.body;
    const actualizar = await pool.query(
      'update public."CARGO" SET "Descripcion"=$1 Where "IdCargo"=$2 ',
      [Descripcion, id]
    );
    res.json('cargo actualizado');
  } catch (err) {
    console.error(err.message);
  }
});

app.delete('/cargos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const eliminar = await pool.query('Delete From  public."CARGO" WHERE "IdCargo"=$1 ', [
      id,
    ]);
    res.json('cargo eliminado');
  } catch (err) {
    console.error(err.message);
  }
});

app.post('/sedes', async (req, res) => {
  try {
    const { IdSede,Descripcion } = req.body;
    const newSede = await pool.query(
      'insert into public."SEDE"("IdSede","Descripcion")values($1,$2) returning *',
      [IdSede,Descripcion]
    );
    res.json(newSede.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/sedes', async (req, res) => {
  try {
    const sedes = await pool.query('select * from public."SEDE"');
    res.json(sedes.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/sedes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sede = await pool.query('select * from public."SEDE" where "IdSede"=$1', [id]);
    res.json(sede.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.put('/sedes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { Descripcion } = req.body;
    const actualizar = await pool.query(
      'update public."SEDE" SET "Descripcion"=$1 Where "IdSede"=$2 ',
      [Descripcion, id]
    );
    res.json('sede actualizado');
  } catch (err) {
    console.error(err.message);
  }
});

app.delete('/sedes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const eliminar = await pool.query('Delete From  public."SEDE" WHERE "IdSede"=$1 ', [
      id,
    ]);
    res.json('sede eliminado');
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log('servidor escuchando en el puerto 5000');
});
