import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddNewHabitForm from "../components/AddNewHabitForm";
import HabitDetails from "../components/HabitDetails";
import useGet from "../hooks/fetch/useGet";
import { useHabitsContext } from "../hooks/useHabitsContext";
import { days } from "../utils/date";

const FullList = () => {
  // Obtener el estado y las funciones del contexto de hábitos
  const { allHabits, sortedHabits, sortOption, dispatch } = useHabitsContext();
  // Utilizar el hook personalizado useGet para realizar solicitudes GET
  const { getRequest, loading, error } = useGet();

  // Función para obtener todos los hábitos del usuario
  const fetchAllHabits = async () => {
    try {
      const res = await getRequest("/habits", {
        withAuthHeader: true,
      });
      const data = res.data;
      console.log({ data });

      if (data) {
        // Actualizar el estado de todos los hábitos
        dispatch({
          type: "SET_ALL_HABITS",
          payload: data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Función para ordenar los hábitos según la opción seleccionada
  const sortHabits = (sortOption) => {
    // Ordenar por días de la semana
    if (sortOption === "days") {
      let categorizedHabits = [];
      if (allHabits.length > 0) {
        days.forEach((day) =>
          categorizedHabits.push({
            day,
            habits: allHabits.filter((habit) => habit.reps.includes(day)),
          })
        );
        // Actualizar el estado de hábitos ordenados
        dispatch({ type: "SET_SORTED_HABITS", payload: categorizedHabits });
      }
    }

    // Ordenar de más recientes a más antiguos
    if (sortOption === "newest-first") {
      dispatch({ type: "SET_SORTED_HABITS", payload: allHabits });
      console.log({ allHabits, sortedHabits });
    }

    // Ordenar de más antiguos a más recientes
    if (sortOption === "oldest-first") {
      let tempArray = [...allHabits];
      dispatch({ type: "SET_SORTED_HABITS", payload: tempArray.reverse() });
    }

    console.log({ sortOption });
    console.log({ sortedHabits });
  };

  // Manejar cambios en la opción de orden
  const handleOptionChange = (e) => {
    // Actualizar la opción de orden en el estado
    dispatch({ type: "SET_SORT_OPTION", payload: e.target.value });
    // Almacenar la opción de orden en el almacenamiento local
    localStorage.setItem("sort-option", e.target.value);
    // Ordenar los hábitos según la nueva opción
    sortHabits(e.target.value);
  };

  // Efecto para obtener todos los hábitos al cargar la página
  useEffect(() => {
    fetchAllHabits();
  }, []);

  // Efecto para ordenar los hábitos cuando cambia la lista completa de hábitos
  useEffect(() => {
    sortHabits(sortOption);
  }, [allHabits]);

  return (
    <div className="flex relative ">
      <div className="basis-full md:basis-4/5 md:pr-8 pb-12 md:border-r">
        <h2 className="text-center text-xl font-semibold">Todos los hábitos</h2>
        <div className="flex items-center my-8">
          <label>
            Ordenar por
            <select
              value={sortOption}
              onChange={handleOptionChange}
              className="mx-1 pl-px pr-1 border focus:outline-0"
            >
              <option value="days">Días</option>
              <option value="newest-first">Más recientes</option>
              <option value="oldest-first">Más antiguos</option>
            </select>
          </label>
        </div>
        <div className="flex flex-col gap-8 mt-8">
          {sortOption === "days" && sortedHabits.length > 0
            ? sortedHabits.map(({ day, habits }) => {
                console.log({ day, habits });
                return (
                  <React.Fragment key={day}>
                    <h4 className="text-lg font-semibold pb-1 border-b-2">
                      {day}
                    </h4>

                    {habits.length > 0 ? (
                      <div className="flex flex-col gap-8 mb-4">
                        {habits.map((habit) => {
                          console.log({ habit });
                          return (
                            <React.Fragment key={habit._id}>
                              <HabitDetails habit={habit} noCompleteState />
                            </React.Fragment>
                          );
                        })}
                      </div>
                    ) : (
                      <p className=" -mt-6 mb-4">No hay elementos para mostrar</p>
                    )}
                  </React.Fragment>
                );
              })
            : sortedHabits.map((habit) => {
                console.log({ habit });
                return (
                  <React.Fragment key={habit._id}>
                    <HabitDetails habit={habit} noCompleteState />
                  </React.Fragment>
                );
              })}

          {!loading && allHabits.length < 1 && (
            <div className="text-center mt-8">Tu lista de hábitos está vacía</div>
          )}
          {loading && <div className="loader m-auto mt-12"></div>}
        </div>
      </div>
      <div className="md:basis-1/5 sticky top-0 h-[80vh] pl-8 hidden md:flex flex-col justify-center items-center">
        <AddNewHabitForm />
      </div>

      <Link to="/create">
        <i className="md:hidden fa fa-plus fixed bottom-16 right-10 w-14 h-14 flex justify-center items-center outline outline-2 bg-[#92dBbC]/80 rounded-full text-2xl text-white"></i>
      </Link>
    </div>
  );
};

export default FullList;
