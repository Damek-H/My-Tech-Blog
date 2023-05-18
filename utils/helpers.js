const dayjs = require('dayjs');

module.exports = {
  formatTime: (date) => {
    return date.toLocaleTimeString();
  },
  formatDate: (date) => {
    const formattedDate = `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    return formattedDate;
  },
};
