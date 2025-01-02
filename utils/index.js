export const clearSpaces = (text) => {
  return text.replaceAll(" ", "");
};

export function cleanPhoneNumber(phoneNumber) {
  if (!phoneNumber) {
    return "";
  }
  return phoneNumber.replace(/^\+998/, "").replace(/[^\d]/g, "");
}

export const digitsOnly = (phoneNumber) => {
  return phoneNumber.match(/\d+/g).join("");
};

export const formatCurrency = (amount) => {
  if (!amount) {
    return "";
  }
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export const formatPhone = (phone) => {
  if (!phone) return "";
  const numericString = phone.replace(/\D/g, "");
  let formattedString = "";

  if (numericString.length === 12) {
    formattedString = numericString.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, "+$1 $2 $3 $4 $5");
  } else if (numericString.length === 10) {
    formattedString = numericString.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  } else if (numericString.length === 9) {
    formattedString = numericString.replace(/(\d{2})(\d{3})(\d{4})/, "+998 $1 $2 $3");
  } else if (numericString.length === 7) {
    formattedString = numericString.replace(/(\d{3})(\d{4})/, "$1-$2");
  } else {
    formattedString = phone;
  }

  return formattedString;
};

export const timerFormat = (time) => {
  let sec_num = parseInt(time, 10);
  let hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - hours * 3600) / 60);
  let seconds = sec_num - hours * 3600 - minutes * 60;
  const format = (num) => (num < 10 ? `0${num}` : num);
  return `${format(hours)}:${format(minutes)}:${format(seconds)}`;
};

// debounce
// timeouts obyektini saqlash uchun
const timeouts = {};

// timeoutni tozalash
const cTimeout = (key) => {
  if (timeouts[key]) {
    clearTimeout(timeouts[key]);
    timeouts[key] = undefined;
  }
};

// debounce funksiyasi
export const debounce = (key, fn, timeout = 500) => {
  const sTimeout = (key, fn, timeout) => {
    cTimeout(key);
    timeouts[key] = setTimeout(() => {
      try {
        fn();
      } catch (e) {
        console.error(e);
      }
      // Timeoutni tozalash
      timeouts[key] = undefined;
    }, timeout);
  };

  return sTimeout(key, fn, timeout);
};

// data

export const roles = {
  SCHOOL: "school",
  TEACHER: "teacher",
  PUPIL: "pupil",
  REGION: "regions",
  DISTRICT: "districts",
  DEFAULT: "users",
};
export const getRoleName = (userRole) => {
  switch (userRole) {
    case "school":
      return "Maktab admini";
    case "teacher":
      return "O'qituvchi";
    case "pupil":
      return "O'quvchi";
    case "user":
      return "Foydalanuvchi";
    default:
      return "Noma'lum";
  }
};

// language
export const languages = [
  { id: 1, name: "O'zbekcha", value: "O`zbek", status: true },
  { id: 2, name: "English", value: "en", status: false },
  { id: 3, name: "Русский", value: "ru", status: false },
  { id: 4, name: "Қазақша", value: "kz", status: false },
];

export const educationLevels = [
  { id: 1, name: "Kunduzgi", value: "Kunduzgi", status: true },
  { id: 2, name: "Sirtqi", value: "Sirtqi", status: true },
  { id: 3, name: "Kechki", value: "Kechki", status: true },
];

//

// utils/options.js

export const certificationTypes = [
  { value: "next", name: "Navbatdagi" },
  { value: "extraordinary", name: "Navbatdan tashqari" },
];

export const qualificationLevels = [
  { value: "specialist", name: "Mutaxassis toifa" },
  { value: "second", name: "Ikkinchi toifa" },
  { value: "first", name: "Birinchi toifa" },
  { value: "highest", name: "Oliy toifa" },
];

//

export const isPupil = (role) => role === roles.PUPIL;
export const isSchool = (role) => role === roles.SCHOOL;
export const isTeacher = (role) => role === roles.TEACHER;
export const isUser = (role) => role === roles.DEFAULT;

// classsesData

export const classesData = [
  { id: 1, number: 1 },
  { id: 2, number: 2 },
  { id: 3, number: 3 },
  { id: 4, number: 4 },
  { id: 5, number: 5 },
  { id: 6, number: 6 },
  { id: 7, number: 7 },
  { id: 8, number: 8 },
  { id: 9, number: 9 },
  { id: 10, number: 10 },
  { id: 11, number: 11 },
];
export const lettersData = [
  { id: "a", name: "A" },
  { id: "b", name: "B" },
  { id: "c", name: "C" },
  { id: "d", name: "D" },
  { id: "e", name: "E" },
  { id: "f", name: "F" },
  { id: "g", name: "G" },
  { id: "h", name: "H" },
  { id: "i", name: "I" },
  { id: "j", name: "J" },
  { id: "k", name: "K" },
  { id: "l", name: "L" },
  { id: "m", name: "M" },
  { id: "n", name: "N" },
  { id: "o", name: "O" },
  { id: "p", name: "P" },
  { id: "q", name: "Q" },
  { id: "r", name: "R" },
  { id: "s", name: "S" },
  { id: "t", name: "T" },
  { id: "u", name: "U" },
  { id: "v", name: "V" },
  { id: "w", name: "W" },
  { id: "x", name: "X" },
  { id: "y", name: "Y" },
  { id: "z", name: "Z" },
];

export const fillUserData = (userData, id, byrole) => {
  const isSchool = userRole.value === "school";
  const data = userData.data || {};
  if (id) {
    otherUser.value = {
      login: data.login || "",
      name: data.name || "",
      surname: data.surname || "",
      father_name: data.father_name || "",
      phone_number: cleanPhoneNumber(data.phone_number) || "",
    };
    const schoolData = data.school || {};
    otherUser.value.region = schoolData.region || "";
    otherUser.value.district = schoolData.district || "";
    otherUser.value.school = `${schoolData.number || ""} - ${schoolData.type || ""}`.trim() || "";
    otherUser.value.tariff = schoolData.tarif ? dayjs(schoolData.tarif).format("DD.MM.YYYY HH:mm:ss") : "";

    if (byrole === "pupil") {
      otherUser.value.class = `${data.class?.number || ""}${data.class?.letter || ""}`.trim() || "";
    }
  } else {
    user.value = {
      login: data.login || "",
      name: isSchool ? data.admin?.name || "" : data.name || "",
      surname: isSchool ? data.admin?.surname || "" : data.surname || "",
      father_name: isSchool ? data.admin?.father_name || "" : data.father_name || "",
      phone_number: cleanPhoneNumber(isSchool ? data.admin?.phone_number : data.phone_number) || "",
    };
    if (isSchool) {
      user.value.region = data.region || "";
      user.value.district = data.district || "";
      user.value.school = `${data.number || ""} - ${data.type || ""}`.trim() || "";
      user.value.tariff = data.tarif ? dayjs(data.tarif).format("DD.MM.YYYY HH:mm:ss") : "";
    } else {
      const schoolData = data.school || {};
      user.value.region = schoolData.region || "";
      user.value.district = schoolData.district || "";
      user.value.school = `${schoolData.number || ""} - ${schoolData.type || ""}`.trim() || "";
      user.value.tariff = schoolData.tarif ? dayjs(schoolData.tarif).format("DD.MM.YYYY HH:mm:ss") : "";
      if (userRole.value === "pupil") {
        user.value.class = `${data.class?.number || ""}${data.class?.letter || ""}`.trim() || "";
      }
    }
  }
};
