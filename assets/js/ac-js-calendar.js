
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
<p>Some Calendar</p>
`;
}


let calContainer = document.querySelector("[data-ac-calendar]");

let calElement = document.createElement('div');

let yearDownButton;

let yearUpButton;

let yearHeading;

let year = (new Date()).getFullYear();
let month = (new Date()).getMonth();


//let updateYearEvent  = new Event('updateYear');

let eventYearUpdate = document.createEvent('Event');
eventYearUpdate.initEvent('yearUpdate', true, true);

let eventMonthUpdate = document.createEvent('Event');
eventMonthUpdate.initEvent('monthUpdate', true, true);

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
    getCurrentYear : function(){
        return (new Date()).getFullYear();
    },
    getSelectedYear : function(){
        return calDat.selectedYear;
    },
    setCurrentYear : function() {
        calDat.currentYear = (new Date()).getFullYear();
    },
    setSelectedYear : function(year = calDat.getCurrentYear()) {
        calDat.selectedYear = year;
    },
    getCurrentMonth : function(){
        return (new Date()).getMonth();
    },
    getSelectedMonth : function(){
        return calDat.selectedMonth;
    },
    setCurrentMonth : function() {
        calDat.currentMonth = (new Date()).getMonth();
    },
    setSelectedMonth : function(month = calDat.getCurrentMonth()) {
        if (month < 0){
            month = 10 - month;
            return calDat.setSelectedMonth(month);
        }else if(month > 11){
            month = month - 12;
            return calDat.setSelectedMonth(month);
        }
        calDat.selectedMonth = month;
    }
}
calDat.setCurrentYear()
calDat.setSelectedYear()

calDat.setCurrentMonth()
calDat.setSelectedMonth()

console.log(calDat.selectedYear)
calDat.setCurrentYear();




calElement.className = 'c-ac-calendar'
calElement.innerHTML= calTemplate()

calContainer.appendChild(calElement);

yearDownButton = document.getElementById("yearDownButton");
yearUpButton = document.getElementById("yearUpButton");
yearHeading = document.getElementById("yearHeading");

yearDownButton.addEventListener('click', function(){
    calDat.setSelectedYear( calDat.getSelectedYear() - 1)
    window.dispatchEvent(eventYearUpdate);
});
yearUpButton.addEventListener('click', function(){
    calDat.setSelectedYear( calDat.getSelectedYear() + 1)
    window.dispatchEvent(eventYearUpdate);
});

window.addEventListener('yearUpdate', function (e) {
    yearHeading.innerText = calDat.selectedYear;
})

monthDownButton = document.getElementById("monthDownButton");
monthUpButton = document.getElementById("monthUpButton");
monthHeading = document.getElementById("monthHeading");

monthDownButton.addEventListener('click', function(){
    calDat.setSelectedMonth( calDat.getSelectedMonth() - 1)
    window.dispatchEvent(eventMonthUpdate);
});
monthUpButton.addEventListener('click', function(){
    calDat.setSelectedMonth( calDat.getSelectedMonth() + 1)
    window.dispatchEvent(eventMonthUpdate);
});

window.addEventListener('monthUpdate', function (e) {
    monthHeading.innerText = calDat.monthNames[calDat.selectedMonth];
    console.log(calDat.selectedMonth)
})