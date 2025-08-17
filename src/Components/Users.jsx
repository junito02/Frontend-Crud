import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/users`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error(err);
        setUsers([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return;

    try {
      await axios.delete(`${apiUrl}/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      alert("Error al eliminar usuario");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-8">
      <div className="max-w-7xl mx-auto bg-white/95 backdrop-blur-lg rounded-xl shadow-lg p-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 drop-shadow-md">
            Usuarios
          </h1>
          <Link
            to="/create"
            className="mt-4 sm:mt-0 inline-block bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition"
          >
            ➕ Crear usuario
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-600 animate-pulse font-medium">
            Cargando usuarios...
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-20 text-gray-600 text-lg font-medium">
            No hay usuarios registrados.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
            <table className="min-w-full bg-white rounded-lg">
              <thead className="bg-gray-100 border-b border-gray-300">
                <tr>
                  {[
                    "ID",
                    "Nombre",
                    "Apellido",
                    "Dirección",
                    "Edad",
                    "Acciones",
                  ].map((head) => (
                    <th
                      key={head}
                      scope="col"
                      className="text-gray-700 text-left px-6 py-3 text-sm font-semibold uppercase tracking-wide"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-purple-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.nombre}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.apellido}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {user.direccion}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {user.edad}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex gap-3 justify-center">
                      <Link
                        to={`edit/${user.id}`}
                        className="bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 text-white px-3 py-1 rounded-md text-sm font-medium transition cursor-pointer"
                        aria-label={`Editar usuario ${user.nombre}`}
                      >
                        ✏️ Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-400 text-white px-3 py-1 rounded-md text-sm font-medium transition cursor-pointer"
                        aria-label={`Eliminar usuario ${user.nombre}`}
                      >
                        🗑️ Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
