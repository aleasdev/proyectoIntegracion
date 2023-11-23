import React, { useEffect, useState } from "react";
import HabitDetails from "../components/HabitDetails";
import AddNewHabitForm from "../components/AddNewHabitForm";
import DayAndTime from "../components/DayAndTime";
import { useHabitsContext } from "../hooks/useHabitsContext";
import { Link } from "react-router-dom";
import { useDay } from "../utils/date";
import useGet from "../hooks/fetch/useGet";
import Quotes from "../components/Quotes";

const Home = () => {
  // Obtener el día actual
  const { day } = useDay();
  // Obtener los hábitos de hoy, todos los hábitos, la fecha y la función de despacho del contexto de hábitos
  const { todayHabits, allHabits, date, dispatch } = useHabitsContext();
  // Estado para manejar la carga de datos
  const [loading, setLoading] = useState(true);
  // Función de solicitud GET para obtener hábitos
  const { getRequest } = useGet();

  // Imprimir los hábitos de hoy en la consola
  console.log({ todayHabits });

  // Función para obtener hábitos del servidor
  const fetchHabits = async () => {
    // Indicar que la carga está en progreso
    setLoading(true);
    try {
      // Realizar una solicitud GET para obtener hábitos del día actual
      const res = await getRequest(`/habits?day=${date}`, {
        withAuthHeader: true,
      });
      // Obtener los datos de la respuesta
      const data = res.data;
      // Imprimir los datos en la consola
      console.log({ data });

      // Si hay datos, actualizar los hábitos de hoy en el contexto
      if (data) {
        dispatch({
          type: "SET_TODAY_HABITS",
          payload: data.filter((habit) => habit.reps.includes(day)),
        });
      }
    } catch (err) {
      // Manejar errores en la consola
      console.log(err);
    }
    // Indicar que la carga ha finalizado
    setLoading(false);
  };

  // Efecto secundario para llamar a fetchHabits cuando cambia el día o los hábitos
  useEffect(() => {
    fetchHabits();
  }, [day, allHabits]);

  // Renderizar la interfaz de usuario
  return (
    <div className="flex relative ">
      <div className="basis-full md:basis-4/5 md:pr-8 pb-12 md:border-r">
        {/* Mostrar el componente de día y hora */}
        <DayAndTime />
        {/* Mostrar citas */}
        <Quotes />
        <div className="flex flex-col gap-8 my-16">
          {/* Mapear y renderizar los detalles de cada hábito de hoy */}
          {todayHabits.map((habit) => (
            <React.Fragment key={habit._id}>
              <HabitDetails habit={habit} />
            </React.Fragment>
          ))}
          {/* Mostrar un cargador si está cargando */}
          {todayHabits.length < 1 && loading && (
            <div className="loader m-auto mt-12"></div>
          )}
          {/* Mostrar un mensaje si no hay hábitos y no está cargando */}
          {!loading && todayHabits.length < 1 && (
            <div className="text-center">
              Tu lista de hábitos está vacía por hoy.
            </div>
          )}
        </div>
      </div>
      {/* Barra lateral para agregar nuevos hábitos */}
      <div className="md:basis-1/5 sticky top-0 h-[80vh] pl-8 hidden md:flex flex-col justify-center items-center">
        <AddNewHabitForm />
      </div>

      {/* Enlace para crear un nuevo hábito */}
      <Link to="/create">
        <i className="md:hidden fa fa-plus fixed bottom-16 right-10 w-14 h-14 flex justify-center items-center outline outline-2 bg-[#92dBbC]/80 rounded-full text-2xl text-white"></i>
      </Link>
    </div>
  );
};

export default Home;
