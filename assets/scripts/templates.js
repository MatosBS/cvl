export const templates = {
    horarioItem: (horario) => {
        return `<td>${horario.hora}</td>
            <td>${horario.lunes}</td>
            <td>${horario.martes}</td>
            <td>${horario.miercoles}</td>
            <td>${horario.jueves}</td>
            <td>${horario.viernes}</td>
            <td>${horario.sabado}</td>`;
    },
};