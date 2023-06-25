// Page Elements
const fullTimeElm = document.getElementById("full-time");
const amPmElm = document.getElementById("am-pm");
const timeFormatElm = document.getElementById("time-format");

const ar_day = document.getElementById("ar-day");
const en_day = document.getElementById("en-day");

const hejDate = document.getElementById("hijri");
const greDate = document.getElementById("gregorian");

const arMonth = document.getElementById("ar-month");
const enMonth = document.getElementById("en-month");

// static variables
let timeFormat = 12;

// Program Functions
const getFullTime = function (format) {
    const date = new Date();
    const hourRaw = date.getHours();
    const minuteRaw = date.getMinutes();
    const secondRaw = date.getSeconds();
    const ampm = hourRaw >= 12 ? "PM" : "AM";

    let hour, minute,second;

    // 
    if ( format == 24 ) {
        hour = hourRaw;
        minute = minuteRaw;
        second = secondRaw;
    } else if ( format == 12 ) {
        hour = hourRaw % 12;
        hour = hour ? hour : 12;
        minute = minuteRaw;
        second = secondRaw;
    }

    return { fullTime: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`, amOrPM: ampm};
};

const getToday = function () {
    const date = new Date();
    const currentDay = date.getDay();
    const en_days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const ar_days = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

    return {arDay: ar_days[currentDay], enDay: en_days[currentDay]};
}

const getDates = function () {
    const hejDay = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {day: 'numeric'}).format(Date.now());
    const hejMonth = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {month: 'numeric'}).format(Date.now());
    const hejYear = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {year: 'numeric'}).format(Date.now()).split(" ")[0];

    const greDay = new Date().getDate();
    const greMonth = new Date().getMonth() + 1;
    const greYear = new Date().getFullYear();
    

    return {hejD : `${hejDay.padStart(2, "0")}/${hejMonth.padStart(2, "0")}/${hejYear.padStart(4, "0")}`, 
            greD: `${String(greDay).padStart(2, "0")}/${String(greMonth).padStart(2, "0")}/${String(greYear).padStart(4, "0")}`};
}

const getMonths = function () {
    const arMonths = ['محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'];
    const enMonths = ['January', ' February', ' March', ' April', ' May', ' June', ' July', ' August', ' September', ' October', ' November', 'December'];

    const arMonthNum = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {month: 'numeric'}).format(Date.now()) - 1;
    const enMonthNum = new Date().getMonth();

    return {ar : arMonths[parseInt(arMonthNum)], en: enMonths[enMonthNum]}
}

const updateValues = function (format) {
    const timeDetails = getFullTime(format);
    fullTimeElm.textContent = timeDetails.fullTime;
    amPmElm.textContent = timeDetails.amOrPM;

    const day = getToday();
    ar_day.textContent = day.arDay;
    en_day.textContent = day.enDay;

    const date = getDates();
    hejDate.textContent = date.hejD;
    greDate.textContent = date.greD;

    const month = getMonths();
    arMonth.textContent = month.ar;
    enMonth.textContent = month.en;
};




// events handling
timeFormatElm.addEventListener("change", ()=>{
    if (timeFormatElm.value == "12format") {
        timeFormat = 12;
    } else if (timeFormatElm.value == "24format") {
        timeFormat = 24;
    }
})


// Clock update
setInterval(()=>{
    updateValues(timeFormat)
}, 200)

// Initial value when the page loaded
updateValues(timeFormat)
