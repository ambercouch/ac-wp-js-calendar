
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
    selectedDays : [],
    els : {
        calContainer: function(){
            return document.querySelector("[data-ac-calendar]");
        },
        calElement: function(){
            return document.createElement('div');
        },
        calDayItemEl: function(){
            return document.createElement('li');
        },
        yearDownButton: function () {
            return document.getElementById("yearDownButton");
        },
        yearUpButton: function () {
            return document.getElementById("yearUpButton");
        },
        yearHeading: function () {
            return document.getElementById("yearHeading");
        },
        monthDownButton: function () {
            return  document.getElementById("monthDownButton");
        },
        monthUpButton: function () {
            return   document.getElementById("monthUpButton");
        },
        monthHeading: function () {
            return document.getElementById("monthHeading");
        },
        monthDaysList: function () {
            return document.getElementById('monthDaysList')
        },
        monthDays: function () {
            return document.querySelectorAll('[data-day-of-month]');
        }

    },
    init: {
      build: function(){
          calDat.init.events.createEvent('yearUpdate' );
          calDat.init.events.createEvent('monthUpdate' );
          calDat.init.events.createEvent('selectedDaysUpdate' );
          calDat.init.events.createEvent('daySelected')

          // Set the current year and the selected year
          calDat.setCurrentYear()
          calDat.setSelectedYear()

          // set the current day and the selected day
          calDat.setCurrentMonth()
          calDat.setSelectedMonth()

          //set the selected day
          calDat.setCurrentDay()
          let calElement = calDat.els.calElement();
          calElement.className = 'c-ac-calendar'
          calElement.innerHTML= calTemplate()
          calDat.els.calContainer().appendChild(calElement);


          //Build the calendar
          calDat.updateCalendar();


          calDat.init.listeners.yearControl();
          calDat.init.listeners.monthControl();


      },

        events: {
            createEvent: function (eventListen, eventDispatch = false, deetsObj) {
                eventDispatch = (eventDispatch == false) ? 'event' + eventListen.charAt(0).toUpperCase() + eventListen.slice(1) : eventDispatch ;
                this[eventDispatch] = new CustomEvent(eventListen, {detail : deetsObj});
                //this[eventDispatch].initEvent(eventListen, true, true);
            }
        },
        listeners : {
            yearControl : function(){
                //Year control event listeners
                calDat.els.yearDownButton().addEventListener('click', function(){
                    calDat.setSelectedYear( calDat.getSelectedYear() - 1)
                });
                calDat.els.yearUpButton().addEventListener('click', function(){
                    calDat.setSelectedYear( calDat.getSelectedYear() + 1)
                });
                window.addEventListener('yearUpdate', function (e) {
                    calDat.els.yearHeading().innerText = calDat.selectedYear;
                    calDat.updateCalendar();
                })

            },
            monthControl : function () {

                //Month control event listeners
                calDat.els.monthDownButton().addEventListener('click', function(){
                    calDat.setSelectedMonth( calDat.getSelectedMonth() - 1)
                });
                calDat.els.monthUpButton().addEventListener('click', function(){
                    calDat.setSelectedMonth( calDat.getSelectedMonth() + 1)
                });

                window.addEventListener('monthUpdate', function (e) {
                    calDat.els.monthHeading().innerText = calDat.monthNames[calDat.selectedMonth];
                    calDat.updateCalendar();
                })
            },
            dayControl : function () {

                let clickHandler;
                let selectedDaysHandler = function(){

                    document.querySelectorAll('[data-day-of-month]').forEach(function (el) {
                        el.dataset.state = 'off';
                    });
                    [].forEach.call(calDat.selectedDays, function (date) {
                        let day = date.getDate();
                        let month = date.getMonth();
                        let year = date.getFullYear();
                        if(month == calDat.selectedMonth && year == calDat.selectedYear){
                            document.querySelectorAll('[data-day-of-month="'+day+'"]').forEach(function (el) {
                                el.dataset.state = 'on';
                            })
                        }
                    })
                }
                window.removeEventListener('selectedDaysUpdate', selectedDaysHandler);
                window.addEventListener('selectedDaysUpdate', selectedDaysHandler);

                //month day event listeners
                calDat.els.monthDays().forEach(function (monthDay) {
                    clickHandler = function(){
                        let day = this.dataset.dayOfMonth;
                        let month = calDat.selectedMonth;
                        let year = calDat.selectedYear;
                        let state = this.dataset.state;
                        calDat.setSelectedDay(day,month,year,state);
                    }
                    monthDay.removeEventListener('click', clickHandler);
                    monthDay.addEventListener('click', clickHandler);
                })
            }
        },
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
        window.dispatchEvent(calDat.init.events.eventYearUpdate);
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
        window.dispatchEvent(calDat.init.events.eventMonthUpdate);
    },
    getCurrentDay: function(){
        return (new Date()).getDate();
    },
    setCurrentDay: function (){
      this.currentDay = this.getCurrentDay();
    },
    setSelectedDay: function(day = 1, month = this.getSelectedMonth(), year = this.getSelectedYear(), state = 'off'){
        console.log('setSelectedDay')
        let date = (new Date(year, month, day))
        let el = document.querySelector('[data-day-of-month="'+day+'" ]');
        if (state != 'on' ){
            this.selectedDays.push(date)
             //el.dataset.state = 'on'
            calDat.init.events.createEvent('daySelected',false,{'date': date, 'day': day, 'month' : month, 'year' : year})
            window.dispatchEvent(calDat.init.events.eventDaySelected);
        }else{
            let dateIndex = this.selectedDays.map(Number).indexOf(+date);
            this.selectedDays.splice(dateIndex, 1);
            //el.dataset.state = 'off'
        }

        window.dispatchEvent(calDat.init.events.eventSelectedDaysUpdate);

    },
    setDaysInMonth : function (month = this.selectedMonth, year = this.selectedYear) {
        let day = 0;
        this.daysInMonth = new Date(year, month + 1, day).getDate();
        //window.dispatchEvent(eventSelectedDaysUpdate);
    },
    setFirstDayOfmonth: function (month = this.selectedMonth, year = this.selectedYear) {
        this.firstDayOfMonth = new Date(year, month, 1).getDay();
    },
    buildDaysGrid: function () {

        let calDayItemEl = calDat.els.calDayItemEl();

        calDayItemEl.className = 'c-date-list__item--month-days is-empty';
        calDayItemEl.innerText = '';
        calDayItemEl.dataset.state = 'off';

        let daysInMonth = calDat.daysInMonth;
        let firstDayOfMonth = (calDat.firstDayOfMonth == 0) ? 6 : calDat.firstDayOfMonth - 1;
        let gridCount = daysInMonth + firstDayOfMonth;

        if(gridCount > 28 && gridCount < 36 ){
            gridCount = 35;
        } else if (gridCount > 35 ){
            gridCount = 42
        }

        console.log('days in month' + daysInMonth);
        console.log('first day of month' + firstDayOfMonth)
        for (let i = 0; i < gridCount ; i++) {
            calDayItemEl = calDayItemEl.cloneNode(true)
            calDayItemEl.dataset.elIndex = i;

            calDayItemEl.id = 'dayIndex' + i;

            this.els.monthDaysList().appendChild(calDayItemEl);
        }
    },
    clearDaysGrid: function () {
        this.els.monthDaysList().innerHTML = '';
    },
    buildDays: function () {
        let startDay = this.firstDayOfMonth - 1;
        if (startDay < 0){
            startDay = 6
        }
        for (let i = 0; i < this.daysInMonth; i++) {
            let day = i + 1;

            let offset = startDay  + i;
            let el = document.getElementById('dayIndex' + offset)
            el.innerText = day;
            el.dataset.dayOfMonth = day;
            el.classList.remove('is-empty');
        }
        calDat.init.listeners.dayControl();
    },
    addTodayClass: function (){
        if (this.selectedYear == this.currentYear && this.selectedMonth == this.currentMonth){
            let el = document.querySelectorAll('[data-day-of-month="'+ calDat.currentDay +'"]');
            el[0].classList.add("is-today");
        }
    },

    updateCalendar: function () {
        this.setDaysInMonth();
        this.setFirstDayOfmonth();
        this.clearDaysGrid();
        this.buildDaysGrid();
        this.buildDays();
        this.addTodayClass();
        //calDat.init.listeners.dayControl();
        window.dispatchEvent(calDat.init.events.eventSelectedDaysUpdate);
    }

}



calDat.init.build();


