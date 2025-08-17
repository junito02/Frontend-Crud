import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const UserPost = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [direccion, setDireccion] = useState("");
  const [edad, setEdad] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const validate = () => {
    const newErrors = {};
    if (!nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!apellido.trim()) newErrors.apellido = "El apellido es obligatorio";
    if (!direccion.trim()) newErrors.direccion = "La dirección es obligatoria";
    if (!edad || edad < 0 || edad > 120) newErrors.edad = "Edad inválida";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    axios
      .post(`${apiUrl}/api/users`, {
        nombre,
        apellido,
        direccion,
        edad: Number(edad),
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert("Error al agregar el usuario. Intenta de nuevo.");
        console.error(err);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center justify-center px-4 py-10">
      <Link
        to="/"
        className="self-start mb-6 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-semibold px-5 py-2 rounded-md shadow-md transition"
      >
        ← Volver
      </Link>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-lg p-8 animate-fadeIn"
        noValidate
      >
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">
          Crear Usuario
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          Completa el formulario para agregar un nuevo usuario
        </p>

        {[
          {
            label: "Nombre",
            value: nombre,
            setValue: setNombre,
            name: "nombre",
            type: "text",
            placeholder: "Escribe tu nombre",
          },
          {
            label: "Apellido",
            value: apellido,
            setValue: setApellido,
            name: "apellido",
            type: "text",
            placeholder: "Escribe tu apellido",
          },
          {
            label: "Dirección",
            value: direccion,
            setValue: setDireccion,
            name: "direccion",
            type: "text",
            placeholder: "Escribe tu dirección",
          },
          {
            label: "Edad",
            value: edad,
            setValue: setEdad,
            name: "edad",
            type: "number",
            placeholder: "Escribe tu edad",
            min: 0,
            max: 120,
          },
        ].map(
          ({ label, value, setValue, name, type, placeholder, min, max }) => (
            <div key={name} className="mb-6">
              <label
                htmlFor={name}
                className="block mb-2 font-semibold text-gray-700"
              >
                {label}
              </label>
              <input
                type={type}
                id={name}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={(e) => setValue(e.target.value)}
                min={min}
                max={max}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition
                ${
                  errors[name]
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-400"
                }`}
                aria-invalid={errors[name] ? "true" : "false"}
                aria-describedby={`${name}-error`}
                required
              />
              {errors[name] && (
                <p
                  id={`${name}-error`}
                  className="mt-1 text-sm text-red-600 font-medium"
                >
                  {errors[name]}
                </p>
              )}
            </div>
          )
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white font-semibold py-3 rounded-md shadow-md transition cursor-pointer"
        >
          Agregar Usuario
        </button>
      </form>

      <style>
        {`
          @keyframes fadeIn {
            from {opacity: 0; transform: translateY(15px);}
            to {opacity: 1; transform: translateY(0);}
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease forwards;
          }
        `}
      </style>
    </div>
  );
};

export default UserPost;
