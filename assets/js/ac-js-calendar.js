
/*
 *  AC JS Calendar - v0.0.1
 *  A Calendar
 *
 *  Made by Richie Arnold
 *  Under MIT License
 */

'use Strict';

//alert('some calendar plugin');

function calTemplate(){
    return `
<div class="c-ac-calendar__header">
  <div class="c-ac-calendar__year-header">
    <div class="c-year-header">
      <div class="c-year-header__control">
        <button id="yearDownButton" class="c-year-header__cont-btn--down">&larr;</button>
      </div>
      <h2 id="yearHeading" class="c-year-header__heading">
        <span class="c-year-header__year-text">${calDat.currentYear}</span>
      </h2>
      <div class="c-year-header__control">
        <button id="yearUpButton" class="c-year-header__cont-btn--Up">&rarr;</button>
      </div>
    </div>
   </div>
   <div class="c-ac-calendar__month-header">
     <div class="c-month-header">
      <div class="c-month-header__control">
        <button id="monthDownButton" class="c-month-header__cont-btn--down">&larr;</button>
      </div>
      <h2 id="monthHeading" class="c-month-header__heading">
        <span class="c-month-header__month-text">${calDat.monthNames[calDat.currentMonth]}</span>
      </h2>
      <div class="c-month-header__control">
        <button id="monthUpButton" class="c-month-header__cont-btn--Up">&rarr;</button>
      </div>
    </div>

</div>
</div>
<div class="c-ac-calendar__body">
<div class="c-ac-calendar__date-list">
<div class="c-date-list">
<ul class="c-date-list__list--heading">
<li class="c-date-list__item--heading">m</li>
<li class="c-date-list__item--heading">t</li>
<li class="c-date-list__item--heading">w</li>
<li class="c-date-list__item--heading">t</li>
<li class="c-date-list__item--heading">f</li>
<li class="c-date-list__item--heading">s</li>
<li class="c-date-list__item--heading">s</li>
</ul>
<ul id='monthDaysList' class="c-date-list__list--month-days" data-month="" >

</ul>
</div>
</div>
</div>
`;
}


let calContainer = document.querySelector("[data-ac-calendar]");

let calElement = document.createElement('div');

let calDayItemEl = document.createElement('li');

let yearDownButton;

let yearUpButton;

let yearHeading;

let monthDownButton;

let monthUpButton;

let monthHeading;

let monthDaysList;



let year = (new Date()).getFullYear();
let month = (new Date()).getMonth();


//let updateYearEvent  = new Event('updateYear');

let eventYearUpdate = document.createEvent('Event');
eventYearUpdate.initEvent('yearUpdate', true, true);

let eventMonthUpdate = document.createEvent('Event');
eventMonthUpdate.initEvent('monthUpdate', true, true);

let eventMonthDaysUpdate = document.createEvent('Event');
eventMonthDaysUpdate.initEvent('monthDaysUpdate', true, true);

// var eventActClose = document.createEvent('Event');
// eventActClose.initEvent('actClose', true, true);


let calDat = {
    monthNames : ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ],
    monthShortNames : ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    currentYear : '',
    selectedYear : '',
    currentMonth : '',
    selectedMonth : '',
    currentDay : '',
    daysInMonth : '',
    firstDayOfMonth: '',
    init: function(){
        this.setCurrentYear()
        this.setSelectedYear()
        
        this.setCurrentMonth()
        this.setSelectedMonth()

        this.setCurrentDay()





        this.setDaysInMonth();

        this.setFirstDayOfmonth();

        calElement.className = 'c-ac-calendar'
        calElement.innerHTML= calTemplate()

        calContainer.appendChild(calElement);

        yearDownButton = document.getElementById("yearDownButton");
        yearUpButton = document.getElementById("yearUpButton");
        yearHeading = document.getElementById("yearHeading");

        monthDaysList = document.getElementById('monthDaysList')

        this.buildDaysGrid();
        this.buildDays();

        this.addTodayClass();



    },
    getCurrentYear : function(){
        return (new Date()).getFullYear();
    },
    getSelectedYear : function(){
        return this.selectedYear;
    },
    setCurrentYear : function() {
        this.currentYear = (new Date()).getFullYear();
    },
    setSelectedYear : function(year = this.getCurrentYear()) {
        this.selectedYear = year;
        console.log('selected year' + year);
        window.dispatchEvent(eventYearUpdate);
    },
    getCurrentMonth : function(){
        return (new Date()).getMonth();
    },
    getSelectedMonth : function(){
        return this.selectedMonth;
    },
    setCurrentMonth : function() {
        this.currentMonth = (new Date()).getMonth();
    },
    setSelectedMonth : function(month = this.getCurrentMonth()) {
        if (month < 0){
            month =  month + 12;
            return this.setSelectedMonth(month);
        }else if(month > 11){
            month = month - 12;
            return this.setSelectedMonth(month);
        }
        if (this.selectedMonth == 0 && month == 11){
            this.setSelectedYear( this.getSelectedYear() - 1)
        }else if(this.selectedMonth == 11 && month == 0){

            this.setSelectedYear( this.getSelectedYear() + 1)
        }
        this.selectedMonth = month;
        window.dispatchEvent(eventMonthUpdate);
    },
    getCurrentDay: function(){
        return (new Date()).getDate();
    },
    setCurrentDay: function (){
      this.currentDay = this.getCurrentDay();
    },
    setDaysInMonth : function (month = this.selectedMonth, year = this.selectedYear) {
        //year = selected year
        //month + 1 = month after selected month
        //day 0 = last day of previous month
        let day = 0;
        this.daysInMonth = new Date(year, month + 1, day).getDate();
        window.dispatchEvent(eventMonthDaysUpdate);
    },
    setFirstDayOfmonth: function (month = this.selectedMonth, year = this.selectedYear) {
        this.firstDayOfMonth = new Date(year, month, 1).getDay();
    },
    buildDaysGrid: function () {
        calDayItemEl.className = 'c-date-list__item--month-days is-empty';
        calDayItemEl.innerText = '';
        for (let i = 0; i < 35; i++) {
            calDayItemEl = calDayItemEl.cloneNode(true)
            calDayItemEl.dataset.elIndex = i;

            calDayItemEl.id = 'dayIndex' + i;

            monthDaysList.appendChild(calDayItemEl);
        }
    },
    clearDaysGrid: function () {
        monthDaysList.innerHTML = '';
    },
    buildDays: function () {
        let startDay = this.firstDayOfMonth - 1;
        if (startDay < 0){
            startDay = 6
        }
        console.log('startDay');
        console.log(startDay);
        for (let i = 0; i < this.daysInMonth; i++) {
            let day = i + 1;

            let offset = startDay  + i;
            let el = document.getElementById('dayIndex' + offset)
            el.innerText = day;
            el.dataset.dayOfMonth = day;
            el.classList.remove('is-empty');
        }
    },
    addTodayClass: function (){
        if (this.selectedYear == this.currentYear && this.selectedMonth == this.currentMonth){
            el = document.querySelectorAll('[data-day-of-month="'+ calDat.currentDay +'"]');
            el[0].classList.add("is-today");
            console.log(el);
        }
    },
    updateCalendar: function () {
        this.setDaysInMonth();
        this.setFirstDayOfmonth();
        this.clearDaysGrid();
        this.buildDaysGrid();
        this.buildDays();
    }

}



calDat.init();
console.log(calDat.selectedYear)


yearDownButton.addEventListener('click', function(){
    calDat.setSelectedYear( calDat.getSelectedYear() - 1)
    console.log(calDat.getSelectedYear())
});
yearUpButton.addEventListener('click', function(){
    calDat.setSelectedYear( calDat.getSelectedYear() + 1)
});

window.addEventListener('yearUpdate', function (e) {
    yearHeading.innerText = calDat.selectedYear;
    calDat.updateCalendar();
})

monthDownButton = document.getElementById("monthDownButton");
monthUpButton = document.getElementById("monthUpButton");
monthHeading = document.getElementById("monthHeading");

monthDownButton.addEventListener('click', function(){
    calDat.setSelectedMonth( calDat.getSelectedMonth() - 1)
});
monthUpButton.addEventListener('click', function(){
    calDat.setSelectedMonth( calDat.getSelectedMonth() + 1)
});

window.addEventListener('monthUpdate', function (e) {
    monthHeading.innerText = calDat.monthNames[calDat.selectedMonth];
    calDat.updateCalendar();
})