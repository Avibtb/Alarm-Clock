//getting all the elements

const runningTime = document.getElementById('running-time');
const alarmLabel = document.querySelector("#alarm-settings");
const hour = document.querySelector("#hours");
const minute = document.querySelector("#minutes");
const second = document.querySelector("#seconds");
const meridian = document.querySelector("#meridian");
const setAlarm = document.querySelector(".alarm-btn");

//making time value more appropriate by adding zero 
function Zero(value) {
    return (value < 10) ? "0" + value : value;
}

//setting the running time
let time = setInterval(function(){
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let meridian = (date.getHours()) < 12 ? 'AM' : 'PM';

    //handling 24 hours system
    if(hours <= 12){
        hours  = hours 
    }else{
        hours = hours -  12
    }

    //formatting  the running time 
    runningTime.textContent = Zero(hours) + ":" + Zero(minutes) + ":" + Zero(seconds) + " " + meridian;
},1000);

// adding to the seconds 
function addSec(){
    let sec = 59;
    for(let i = 0 ; i<= sec; i++){
        second.options[second.options.length] = new Option(Zero(i),i);
    }
}
addSec();

//adding to the minutes
function addMin(){
    let min = 59;
    for(let i =0;i<=min;i++)
    {
        minute.options[minute.options.length] = new Option(Zero(i),i);
    }
}
addMin();

//adding to the hours
function addHr(){
    let hr = 12;
    for(let i =1 ;i <=hour;i++){
        hour.options[hour.options.length] = new Option(Zero(i),i);
    }
}
addHr();

//adding the list of alarm and settint it

setAlarm.addEventListener('click',function(){
    let Hour = hour.value;
    let Minutte = minute.value;
    let Seconds = second.value;
    let Meridian = meridian.value;
    let Lablel = alarmLabel.value;

    if(Lablel === ""){
        Lablel = "Alarm"
    }

    
})