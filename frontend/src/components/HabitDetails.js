//import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHabitsContext } from "../hooks/useHabitsContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Link, useNavigate } from "react-router-dom";
import usePatch from "../hooks/fetch/usePatch";
import useDelete from "../hooks/fetch/useDelete";
import { es } from 'date-fns/locale';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Componente para mostrar los detalles de un hábito
const HabitDetails = ({ habit, noCompleteState = false }) => {
  const { _id, title, reps, reminders, createdAt, isDone } = habit;
  const { dispatch } = useHabitsContext();
  const { patchRequest } = usePatch();
  const { deleteRequest } = useDelete();
  const navigate = useNavigate();

  console.log({ fromHabitDetails: habit });
  const iconStyle =
    "flex justify-center items-center cursor-pointer hover:bg-[#dbf0db] w-[28px] h-[28px] rounded-full active:bg-[#bce4bc] duration-500";

  // Maneja la eliminación de un hábito
  const handleDelete = async () => {
    try {
      const res = await deleteRequest(`/habits/${_id}`, {
        withAuthHeader: true,
      });

      if (res?.data) {
        console.log({ deleted: res?.data });
        dispatch({ type: "DELETE_HABIT", payload: _id });
      }
    } catch (err) {
      alert(err.message);
    }
  };

  // Maneja la edición de un hábito
  const handleEdit = () => {
    dispatch({ type: "TO_BE_EDITED", payload: habit });
    navigate("/edit");
  };

  // Maneja el cambio de estado (completado/no completado) de un hábito
  const handleIsDone = async () => {
    const payload = { title, reps,reminders, isDone: !isDone };

    try {
      const res = await patchRequest(`/habits/${_id}`, payload, {
        withAuthHeader: true,
      });
      const data = res.data;
      console.log({ upDatedForIsDone: data });

      if (data) {
        dispatch({ type: "UPDATE_HABIT", payload: data });
      }
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

const [hasNotified, setHasNotified] = useState(false);
 
  useEffect(() => {
      const checkReminders = setInterval(() => {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinutes = now.getMinutes();
        const currentDay = now.getDay();

        // Map from day number to day name in Spanish
        const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

        reminders.forEach(reminder => {
          const [reminderHour, reminderMinutes] = reminder.split(':').map(Number);

          reps.forEach(rep => {
            if (!hasNotified && reminderHour === currentHour && reminderMinutes === currentMinutes && rep === days[currentDay]) {
              toast(`¡Hola! Es hora de cumplir tu hábito: "${title}". ¡Vamos, tú puedes hacerlo!`, {
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                style: { backgroundColor: '#529B7C', color: 'white', fontWeight: 'bold' },
                icon: '👋',
                position: 'top-right',
                });
              setHasNotified(true);
            }
          });
        });
      }, 1000); // Check every minute

      // Clear the interval when the component unmounts
      return () => clearInterval(checkReminders);
    }, [reminders, reps, title, hasNotified]);

  return (
    <div
      className={` p-4 px-8 border border-gray-200 rounded-md duration-500 ${
        !noCompleteState && isDone ? "bg-[#f0fff0]" : "bg-white/70"
      } ${!noCompleteState && isDone ? "" : "hover:bg-[#f9fff9]"} `}
    >
      {/* Título del hábito */}
      <h4 className="text-lg font-semibold text-[#529B7C]">{title}</h4>
      <div className="text-sm text-slate-500">
        Repeticiones: {reps.length === 7 ? "Todos los días" : reps.join(", ")}
      </div>
      <div className="text-sm text-slate-500">
        Creado&nbsp;
        {formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: es })}
      </div>
      <div className="text-sm text-slate-500">
        Recordatorios: {reminders.join(", ")}
      </div>
    
      <div className="flex gap-3 mt-1">
        {/* Icono para marcar como completado o no completado */}
        {!noCompleteState && (
          <i
            className={`ml-auto fa fa-check ${iconStyle} ${
              isDone
                ? "bg-green-800 text-white hover:bg-green-800 active:bg-green-700"
                : ""
            }`}
            onClick={handleIsDone}
          ></i>
        )}

        {/* Icono para editar el hábito */}
        <i
          className={`${
            noCompleteState ? "ml-auto" : ""
          } fa fa-edit ${iconStyle}`}
          onClick={handleEdit}
        ></i>

        {/* Icono para eliminar el hábito */}
        <i className={` fa fa-trash ${iconStyle}`} onClick={handleDelete}></i>
      </div>
    </div>
  );
};

export default HabitDetails;
