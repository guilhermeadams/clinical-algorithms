const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

export const myLocale = {
  days,
  daysShort: [...days.map((day) => day.slice(0, 3))],
  months,
  monthsShort: [...months.map((day) => day.slice(0, 3))],
  firstDayOfWeek: 0, // 0-6, 0 - Sunday, 1 Monday, ...
  format24h: true,
  pluralDay: 'dias',
};

export default {
  myLocale,
};
