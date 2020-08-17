$(document).ready(function () {
    // variables
    let takenTimes = [];
    // // function using moment to set up the timeTable
    function todaysDate() {
        let dateToday = moment().format('MMMM Do YYYY');
        $("#currentDay").html(dateToday);
    }
    todaysDate();

    let clock = moment().hour();
    // function currentTime() {
    //     let clock = moment().hour();
    //     console.log(clock);
    // }
    // currentTime();
    // to set hour in moment - moment().hour(Number);
    //append textareas for each row of the schedule
    for (let i = 9; i < 18; i++) {
        takenTimes.push(moment({ i }).format("h a"));
        // create the rows
        // first column is class - hour
        // second column is textarea with class time-block
        // third col is the saveBtn with <i> add icon from fontawesome.com
        // $("<i class='far fa-save fa-2x save-icon''></i>");
        const $row = $(`<div class="row time-block" current-time="${i}">
        
        <div class="col-sm-1 hour">
        <p>${moment({i}).format("h a")}</p>
        </div>

        <div class="col-sm-10">
              <div class='event'>
                <textarea class="form-control text-area"></textarea>
                <div class="input-group-append"></div>
              </div>
            </div>
            <button class="col-sm-1 saveBtn justify-center d-flex align-center">
                    <i class="far fa-save fa-2x save-icon"></i>
                  </button>
        </div>`);
        $(".container").append($row);
    }

    // console.log(clock);
    // based off the current time check for past, present & future
    $.each($(".time-block"), function (index, value) {
        let currentHour = $(value).attr("current-time");
        // find present time slot
        if (Number(currentHour) === clock) {
            $(this).find("textarea").addClass("present");
        }
        else if (Number(currentHour) > clock) {
            $(this).find("textarea").addClass("future")
        }
        else {
            $(this).find("textarea").addClass("past").attr("disabled", "disabled");
            $(this).find(".saveBtn").addClass("disabled").attr("disabled", true);
        }
    });

    // clear local storage at the start of the day
    if (clock === 0) {
        localStorage.clear();
    }

    // creat object that pulls saved calendar events form local storage
    let availableTimes = {};

    if (localStorage.getItem("availableTimes")) {
        availableTimes = JSON.parse(localStorage.getItem("availableTimes"));
    }
    else {
        availableTimes = {
            '9': {
                time: '9',
                value: ''
            },
            '10': {
                time: '10',
                value: ''
            },
            '11': {
                time: '11',
                value: ''
            },
            '12': {
                time: '12',
                value: ''
            },
            '13': {
                time: '13',
                value: ''
            },
            '14': {
                time: '14',
                value: ''
            },
            '15': {
                time: '15',
                value: ''
            },
            '16': {
                time: '16',
                value: ''
            },
            '17': {
                time: '17',
                value: ''
            }
        };
    }
    // console.log(availableTimes[16].value);
    // set the user input to the correct objects value
    $(".time-block").each(function() {
        $(this).find(".text-area").val(availableTimes[$(this).attr("current-time")].value);
      });
// save to local storage, set the availableTimes time and value only when the saveBtn is clicked
    $('.saveBtn').on('click', function (event) {
        event.preventDefault();
        let availableTimesTime = $(this).closest(".time-block").attr("current-time");
        let availableTimesValue = $(this).closest(".time-block").find(".text-area").val();
        availableTimes[availableTimesTime].value = availableTimesValue;
        localStorage.setItem("availableTimes", JSON.stringify(availableTimes));
    });

    // notes:

    // when save button is clicked, need to know which textarea to grab the value from
    // added to local storage once part of calendar

    // to get specific time moment().format('MMMM Do YYYY, h:mm:ss a');

    // create the timetable only with the hours of 9-5 and create a function for the exact time - hour and minute and second of day
    // use this to alter the color inside of an if statement of past events - change color and leave future events as is
    // try to alter current events in schedule as bright red

    // add a click event listener on the time table that prompts the user to enter: "event name and time"
    // possibly add the info from user to an object of the events that will at the end add??? - ask clinton about this idea
    // save this info to local storage!!! - so when page is refeshed it remains on scheduler

    // function that creates event and adds them to timeblock and local storage only when save button is clicked
    // this is where we need to target the specific button that was clicked and find the time-block accordingly

});