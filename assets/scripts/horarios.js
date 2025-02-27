import { horariosElements } from '../elements/dom.js';

export default new class Horarios {
  getUniqueHours(data) {
    const hours = new Set(); // Usamos un Set para asegurar valores únicos
    data.forEach(day => {      
      day.activities.forEach(activity => {
        hours.add(activity.hour);
      });
    });
    return Array.from(hours).sort(); // Convertimos el Set a un array
  };

  getUniqueDays(data) {
    return data.map(day => day.day);
  };

  getDay(data, date) {
    return data.find(day => day.day == date).activities;
  }

  fetchHorarios = async () => {
    let horarios = await fetch("./assets/data/horarios.json");
    horarios = horarios.json();
    return horarios;
  }

  getActivity(data, day, hour) {
    try{
      return data.find(date => date.day == day).activities.find(activity => activity.hour == hour).activity;
    } catch {
      return "-";
    }
  };

  DisplayAllHours(document, horariosArray) {
    const uniqueHours = this.getUniqueHours(horariosArray);
    const uniqueDays = this.getUniqueDays(horariosArray);
    uniqueHours.forEach(hour => {
      const horarioContainer = document.createElement('tr')
      const hourValueContainer = document.createElement('td')
      hourValueContainer.textContent = hour;
      hourValueContainer.dataset.name = `hour-${hour}`;
      horarioContainer.append(hourValueContainer);

      uniqueDays.forEach(day => {
        const activityValueContainer = document.createElement('td')
        activityValueContainer.dataset.name = `${day}-${hour}`;
        activityValueContainer.textContent = this.getActivity(horariosArray, day, hour);
        horarioContainer.append(activityValueContainer);
      });

      document.getElementById("schedule-body-desktop").append(horarioContainer)
   });
  }

  DisplayHoursByDay(document, horariosArray) {
    const selectedDay = horariosElements.daySelector.value;
    const selectedDayHours = this.getDay(horariosArray, selectedDay);
    horariosElements.table_mobile_body.innerHTML = '';

    horariosElements.table_mobile_header.innerHTML = '<tr><th>Hora</th><th>' + selectedDay + '</th></tr>';
    selectedDayHours.forEach(selectedDayHour => {
      const horarioContainer = document.createElement('tr')

      const hourValueContainer = document.createElement('td')
      hourValueContainer.textContent = selectedDayHour.hour;
      hourValueContainer.dataset.name = `hour-${selectedDayHour.hour}`;
      horarioContainer.append(hourValueContainer);

      const activityValueContainer = document.createElement('td')
      activityValueContainer.dataset.name = `${selectedDay}-${selectedDayHour.hour}`;
      activityValueContainer.textContent = selectedDayHour.activity;
      horarioContainer.append(activityValueContainer);

      horariosElements.table_mobile_body.append(horarioContainer);
    });   
  };
};