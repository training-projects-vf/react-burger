
export const getDayTimeString = (dateString: string) => {
  const orderDate = new Date(Date.parse(dateString));

  let hh: number | string = orderDate.getHours();
  if (hh < 10) { hh = `0${hh}` }
  let mm: number | string = orderDate.getMinutes();
  if (mm < 10) { mm = `0${mm}` }

  let timeOffset = orderDate.getTimezoneOffset() / 60 * (-1)

  const dayNumber = (timeStamp: number) => {
    return Math.ceil(timeStamp / 1000 / 60 / 60 / 24)
  }

  const diffInDaysNumber = dayNumber((new Date()).getTime()) - dayNumber(orderDate.getTime());
  let diffDaysInWords = '';
  switch (diffInDaysNumber) {
    case 0: {
      diffDaysInWords = 'Сегодня';
      break;
    }
    case 1: {
      diffDaysInWords = 'Вчера';
      break;
    }
    case 2:
    case 3:
    case 4:
      {
        diffDaysInWords = `${diffInDaysNumber} дня назад`;
        break;
      }
    default: {
      diffDaysInWords = `${diffInDaysNumber} дней назад`;
      break;
    }
  }

  return `${diffDaysInWords}, ${hh}:${mm} i-GMT${timeOffset >= 0 ? '+' : '-'}${timeOffset}`
}
