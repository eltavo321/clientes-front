import { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

function App() {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    ciudad: ""
  });
  const [editando, setEditando] = useState(null);

  const API = "http://backend-service:3000/clientes";

  const obtenerClientes = () => {
    axios.get(API)
      .then(res => setClientes(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    obtenerClientes();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const guardarCliente = () => {
    if (editando) {
      axios.put(`${API}/${editando}`, form)
        .then(() => {
          setEditando(null);
          setForm({ nombre: "", apellidos: "", ciudad: "" });
          obtenerClientes();
        });
    } else {
      axios.post(API, form)
        .then(() => {
          setForm({ nombre: "", apellidos: "", ciudad: "" });
          obtenerClientes();
        });
    }
  };

  const editarCliente = (c) => {
    setEditando(c.id);
    setForm({
      nombre: c.nombre,
      apellidos: c.apellidos,
      ciudad: c.ciudad
    });
  };

  const eliminarCliente = (id) => {
    axios.delete(`${API}/${id}`)
      .then(() => obtenerClientes());
  };

  return (
    <div className="container">
      <h1 className="title">📊 Clientes</h1>

      {/* FORMULARIO */}
      <div className="form">
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
        <input name="apellidos" placeholder="Apellidos" value={form.apellidos} onChange={handleChange} />
        <input name="ciudad" placeholder="Ciudad" value={form.ciudad} onChange={handleChange} />

        <button onClick={guardarCliente}>
          {editando ? "Actualizar" : "Agregar"}
        </button>
      </div>

      {/* TABLA */}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Ciudad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.nombre}</td>
              <td>{c.apellidos}</td>
              <td>{c.ciudad}</td>
              <td>
                <button onClick={() => editarCliente(c)}>✏️</button>
                <button onClick={() => eliminarCliente(c.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;