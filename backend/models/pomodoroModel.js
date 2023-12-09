const mongoose = require('mongoose');

const pomodoroSchema = new mongoose.Schema({
    startTime: { type: Date, required: true} ,
    endTime: { type: Date, required: true },
    taskName: { type: String, required: true },
});

const Pomodoro = mongoose.model('Pomodoro', pomodoroSchema);

module.exports = Pomodoro;