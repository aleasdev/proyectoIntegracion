const Habit = require("../models/habitModel");
const Day = require("../models/dayModel");
const mongoose = require("mongoose");

// Función aún no implementada
const updateHabitItsOnNewDay = () => {};

//# Obtener
// -> Obtener todos los hábitos
const getAllHabits = async (req, res) => {
  const user_id = req.user._id;
  const habits = await Habit.find({ user_id }).sort({ createdAt: -1 });
  //
  const dayFromFrontend = req.query.day;
  if (dayFromFrontend) {
    console.log({ dayFromFrontend });
    let dayFromDatabase = await Day.find({});
    console.log({ dayFromDatabase });
    if (dayFromDatabase[0]?.day) {
      if (dayFromDatabase[0].day !== dayFromFrontend) {
        for (let habit of habits) {
          const updatedHabit = await Habit.findOneAndUpdate(
            { _id: habit._id },
            {
              title: habit.title,
              reps: habit.reps,
              reminders: habit.reminders,
              isDone: false,
              user_id: habit.user_id,
            },
            { new: true }
          );
        }
        const updatedDay = await Day.findOneAndUpdate(
          { _id: dayFromDatabase[0]._id },
          {
            day: dayFromFrontend,
            user_id,
          },
          { new: true }
        );
        console.log({ updatedDay });
      }
    }
    if (dayFromDatabase.length < 1) {
      const updatedDay = await Day.create({
        day: dayFromFrontend,
        user_id,
      });
      console.log({ updatedDay });
    }
  }

  res.status(200).json(habits);
};

// -> Obtener un solo hábito
const getSingleHabit = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No existe ese hábito" });
  }

  const singleHabit = await Habit.findById(id);

  if (!singleHabit) {
    return res.status(404).json({ error: "No existe ese hábito" });
  }

  res.status(200).json(singleHabit);
};

//# Enviar
// -> Crear un nuevo hábito
const createNewHabit = async (req, res) => {
  const { title, reps, reminders } = req.body;
  const emptyFields = [];
  if (!title) emptyFields.push("title");
  if (!reps) emptyFields.push("reps");
  if (!reminders) emptyFields.push("reminders")
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Por favor, completa todos los campos", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const habit = await Habit.create({ title, reps, reminders, isDone: false, user_id });
    res.status(200).json(habit);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

//# Eliminar
// -> Eliminar un hábito
const deleteAHabit = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No existe ese hábito" });
  }

  const deletedHabit = await Habit.findOneAndDelete({ _id: id });

  if (!deletedHabit) {
    return res.status(400).json({ error: "No existe ese hábito" });
  }

  res.status(200).json(deletedHabit);
};

//# Actualizar
// -> Actualizar un hábito
const updateAHabit = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No existe ese hábito" });
  }

  const updatedHabit = await Habit.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );

  if (!updatedHabit) {
    return res.status(400).json({ error: "No existe ese hábito" });
  }

  res.status(200).json(updatedHabit);
};

module.exports = {
  getAllHabits,
  getSingleHabit,
  createNewHabit,
  deleteAHabit,
  updateAHabit,
};