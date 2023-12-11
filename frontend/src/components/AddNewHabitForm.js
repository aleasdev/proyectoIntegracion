//import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
//import axiosClient from "../api/axiosClient";
import usePatch from "../hooks/fetch/usePatch";
import usePost from "../hooks/fetch/usePost";
import { useHabitsContext } from "../hooks/useHabitsContext";
import { days } from "../utils/date";
import notificationSound from '../sounds/info-sound.mp3';


// Estilos con muchas clases y las mismas clases
const styles = {
  inputStyle:
    "bg-white/60 px-4 py-1 outline outline-1 outline-slate-300/70 text-sm rounded-full focus:rounded-full focus:outline-2 focus:outline-[#92dbbC]",
  selected:
    "bg-[#529B7C] text-white px-3 py-1 border rounded-full text-xs cursor-pointer outline outline-2 outline-[#92dbbC]",
  notSelected:
    "px-3 py-1 border border-slate-300/70 rounded-full text-xs cursor-pointer bg-white/60 hover:bg-gray-100",
  rowCenter: "flex justify-center items-center",
  colCenter: "flex flex-col justify-center items-center gap-2",
};

// Componente del formulario para añadir/editar hábitos
const AddNewHabitForm = ({ edit = false }) => {
  const [newHabit, setNewHabit] = useState("");
  const [reps, setReps] = useState([]);
  const [errorMessage, setErrorMessage] = useState({ newHabit: "", reps: "" });
  const [loading, setLoading] = useState(false);
  const { dispatch } = useHabitsContext();
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const { toBeEdited } = useHabitsContext();
  const { postRequest, loading: loadingPostData, error: postError } = usePost();
  const {
    patchRequest,
    loading: loadingPatchData,
    error: patchError,
  } = usePatch();

  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState("");



  //console.log({ toBeEdited });

  // Maneja el clic en "Everyday" para establecer o limpiar los días seleccionados
  const handleOnClickEveryday = () => {
    setErrorMessage((errorMessage) => {
      return { ...errorMessage, reps: "" };
    });
    if (reps.length < 7) {
      setReps(days);
    }
    if (reps.length === 7) {
      setReps([]);
    }
  };

  // Maneja el clic en un día específico para agregarlo o quitarlo de los días seleccionados
  const handleOnClickSpecificDay = (day) => {
    setErrorMessage((errorMessage) => {
      return { ...errorMessage, reps: "" };
    });
    if (!reps.includes(day)) {
      setReps([...reps, day]);
    } else if (reps.includes(day)) {
      setReps(reps.filter((item) => item !== day));
    }
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newHabit.trim().length === 0 || reps.length === 0) {
      newHabit.trim().length === 0 &&
        setErrorMessage((errorMessage) => {
          return { ...errorMessage, newHabit: "Campo obligatorio" };
        });
      reps.length === 0 &&
        setErrorMessage((errorMessage) => {
          return { ...errorMessage, reps: "Selecciona al menos un día" };
        });
    } else {
      if (!edit) {
        setLoading(true);
        const orderedReps = days.filter((day) => reps.includes(day));
        const payload = {
            title: newHabit,
            reps: orderedReps,
            reminders,
            isDone: false
            
          };
          console.error(reminders)
          console.error(orderedReps)
        try {
          
          const res = await postRequest("/habits", payload, {
            withAuthHeader: true,
          });
          const data = res.data;
          console.log({ data });

          if (data) {

            toast.success("Añadido exitosamente");
            new Audio(notificationSound).play();
            dispatch({ type: "ADD_HABIT", payload: data });
            setNewHabit("");
            setReps([]);
            setReminders([])
            setLoading(false);
            if (pathname.includes("create")) {
              navigate("/");
            }
          }
        } catch (err) {
          console.log(err);
          alert(
            err.message +
              ". Puede que no hayas completado todos los campos. De lo contrario, verifica tu conexión a Internet."
          );
          setLoading(false);
        }
      }

      if (edit) {
        setLoading(true);
        const orderedReps = days.filter((day) => reps.includes(day));
        const payload = {
          title: newHabit,
          reps: orderedReps,
          isDone: false,
          reminders,
        };
        try {
          const res = await patchRequest(`/habits/${toBeEdited._id}`, payload, {
            withAuthHeader: true,
          });
          const data = res.data;
          console.log({ data });

          if (data) {
            toast.success("Actualizado exitosamente");
            console.log({ posted: data });
            dispatch({ type: "UPDATE_HABIT", payload: data });
            setNewHabit("");
            setReps([]);
            setReminders([])
            setLoading(false);
            if (pathname.includes("edit")) {
              navigate(-1);
            }
          }
        } catch (err) {
          console.log(err);
          alert(
            err.message +
              ". Puede que no hayas completado todos los campos. De lo contrario, verifica tu conexión a Internet."
          );
          setLoading(false);
        }
      }
    }
  };

  // Establece los valores iniciales al editar
  useEffect(() => {
    if (edit) {
      setNewHabit(toBeEdited.title);
      setReps(toBeEdited.reps);
      setReminders(toBeEdited.reminders)
      
    }
  }, []);

 
  


  return (
    <div className={`${styles.colCenter} gap-6`}>
      <div className={`${styles.rowCenter} font-medium`}>
        {!edit ? "Añadir nuevo" : "Editar el seleccionado"}
        <span className="tracking-wide font-medium text-[#529B7C]">
          &nbsp;HÁBITO&nbsp;
        </span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={`${styles.colCenter} gap-4`}>
          <div className={styles.colCenter}>
            <h4>Haz un hábito de:</h4>
            <input
              name="newHabit"
              id="newHabit"
              value={newHabit}
              onChange={(e) => {
                setNewHabit(e.target.value);
                setErrorMessage((errorMessage) => {
                  return { ...errorMessage, newHabit: "" };
                });
              }}
              placeholder="Haciendo algo..."
              className={styles.inputStyle}
            />
            <p className="text-red-400 text-sm">{errorMessage.newHabit}</p>
          </div>
          <div className={styles.colCenter}>
            <h4 className="text-center">Repite esto:</h4>
                        <div className={`${styles.rowCenter} gap-2 flex-wrap`}>
              <span
                className={`${
                  reps.length === 7 ? styles.selected : styles.notSelected
                }`}
                onClick={handleOnClickEveryday}
              >
                Todos los días
              </span>
              {days.map((day) => (
                <span
                  key={day}
                  className={`${
                    reps.includes(day) ? styles.selected : styles.notSelected
                  }`}
                  onClick={() => {
                    handleOnClickSpecificDay(day);
                  }}
                >
                  {day}
                </span>
              ))}
            </div>
            <p className="text-red-400 text-sm">{errorMessage.reps}</p>
          </div>


          <input
            type="time" // Change to text for storing as String
            name="newReminder"
            id="newReminder"
            value={newReminder}
            onChange={(e) => setNewReminder(e.target.value)}
            placeholder="Añadir recordatorio..."
            className={styles.inputStyle}
          />
          <button
            onClick={() => {
              setReminders([...reminders, newReminder]); // Add directly to the reminders array
              setNewReminder(""); // Clear new reminder input
            }}
            disabled={!newReminder}
            className="bg-white/60 hover:bg-gray-100 hover:border-gray-400 text-xs px-3 py-1 border-2 border-gray-400/50 rounded-full cursor-pointer active:border-gray-500/80 active:outline active:outline-[#92dbbC] transition-colors ease-in-out duration-300"
          >
            Agregar recordatorio
          </button>

          <ul className="list-none flex flex-col gap-2">
            {reminders.map((reminder) => (
              <li key={reminder}>
                <span className="font-medium">{reminder}</span>
                <button
                  type="button"
                  onClick={() => {
                    setReminders(reminders.filter((r) => r !== reminder)); // Remove reminder directly from the array
                  }}
                >
                  <i className="fa fa-times" aria-hidden="true"></i>
                </button>
              </li>
            ))}
          </ul>


          <div className={`${styles.rowCenter} font-semibold`}>
            <input
              type="submit"
              value="Enviar"
              disabled={loading}
              className={`bg-white/60 hover:bg-gray-100 hover:border-gray-400 text-xs px-3 py-1 border-2 border-gray-400/50 rounded-full cursor-pointer focus:border-gray-500/80 focus:outline focus:outline-[#92dbbC] transition-colors ease-in-out duration-300 ${
                loading ? "text-gray-300" : ""
              }`}
            />
          </div>
        </div>
      </form>
      <div className={`${styles.rowCenter} font-semibold mt-4`}>
        {(pathname.includes("create") || pathname.includes("edit")) && (
          <button
            className="bg-white/60 hover:bg-gray-100 hover:border-gray-400 text-xs px-3 py-1 border-2 border-gray-400/50 rounded-full cursor-pointer active:border-gray-500/80 active:outline active:outline-[#92dbbC] transition-colors ease-in-out duration-300"
            onClick={() => {
              navigate(-1);
            }}
          >
            <i className="fa fa-arrow-left" aria-hidden="true"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default AddNewHabitForm;


