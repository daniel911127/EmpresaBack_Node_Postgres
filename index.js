const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

app.use(cors());
app.use(express.json());

app.post('/empleados', async (req, res) => {
  try {
    const { Nombre, Correo, Telefono, IdCargo, IdSede } = req.body;
    const newEmpleado = await pool.query(
      'insert into EMPLEADO(Nombre,Correo,Telefono,IdCargo,IdSede)values($1,$2,$3,$4,$5) returning *',
      [Nombre, Correo, Telefono, IdCargo, IdSede]
    );
    res.json(newEmpleado.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/empleados', async (req, res) => {
  try {
    const empleados = await pool.query('select * from EMPLEADO');
    res.json(empleados.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/empleados/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const empleado = await pool.query(
      'select * from EMPLEADO where IdEmpleado=$1',
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
      'update EMPLEADO SET Nombre=$1,Correo=$2,Telefono=$3,IdCargo=$4,IdSede=$5 Where IdEmpleado=$6 ',
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
      'Delete From  EMPLEADO WHERE IdEmpleado=$1 ',
      [id]
    );
    res.json('empleado eliminado');
  } catch (err) {
    console.error(err.message);
  }
});

app.post('/cargos', async (req, res) => {
  try {
    const { Descripcion } = req.body;
    const newCargo = await pool.query(
      'insert into CARGO(Descripcion)values($1) returning *',
      [Descripcion]
    );
    res.json(newCargo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/cargos', async (req, res) => {
  try {
    const cargos = await pool.query('select * from CARGO');
    res.json(cargos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/cargos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const cargo = await pool.query(
      'select * from CARGO where IdCargo=$1',
      [id]
    );
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
      'update CARGO SET Descripcion=$1 Where IdCargo=$2 ',
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
    const eliminar = await pool.query(
      'Delete From  CARGO WHERE IdCargo=$1 ',
      [id]
    );
    res.json('cargo eliminado');
  } catch (err) {
    console.error(err.message);
  }
});

app.post('/sedes', async (req, res) => {
  try {
    const { Descripcion } = req.body;
    const newSede = await pool.query(
      'insert into SEDE(Descripcion)values($1) returning *',
      [Descripcion]
    );
    res.json(newSede.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/sedes', async (req, res) => {
  try {
    const sedes = await pool.query('select * from SEDE');
    res.json(sedes.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/sedes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sede = await pool.query(
      'select * from SEDE where IdSede=$1',
      [id]
    );
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
      'update SEDE SET Descripcion=$1 Where IdSede=$2 ',
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
    const eliminar = await pool.query(
      'Delete From  SEDE WHERE IdSede=$1 ',
      [id]
    );
    res.json('sede eliminado');
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log('servidor escuchando en el puerto 5000');
});

// const pool = new Pool(config);

// const getEmpleados = async () => {
//   try {
//     const res = await pool.query('select * from EMPLEADO');
//     console.log(res.rows);
//     pool.end();
//   } catch (e) {
//     console.log(e);
//   }
// };

// const insertEmpleado = async () => {
//   try {
//     const insert =
//       'insert into EMPLEADO(Nombre,Correo,Telefono,IdCargo,IdSede)values($1,$2,$3,$4,$5)';
//     const values = ['Miguel Suarez', 'miguel.s@mail.com', '5489762', 2, 1];
//     const res = await pool.query(insert, values);
//     console.log(res);
//   } catch (e) {
//     console.log(e);
//   }
// };

// const deleteEmpleado = async () => {
//   try {
//     const eliminar = 'Delete From  EMPLEADO WHERE IdEmpleado=$1';
//     const values = [2];
//     const res = await pool.query(eliminar, values);
//     console.log(res);
//   } catch (e) {
//     console.log(e);
//   }
// };
// const editEmpleado = async () => {
//   try {
//     const actualizar = 'update EMPLEADO SET Nombre=$1,Correo=$2,Telefono=$3,IdCargo=$4,IdSede=$5 Where IdEmpleado=$6  ';
//     const values = ['Miguel Suarez', 'miguel.suarez@mail.com', '5489762', 2, 1,3];
//     const res = await pool.query(actualizar, values);
//     console.log(res);
//   } catch (e) {
//     console.log(e);
//   }
// };

// //insertEmpleado();
// //deleteEmpleado();
// //editEmpleado();
// getEmpleados();
