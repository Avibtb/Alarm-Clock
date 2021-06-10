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


//adding to the hours
function addHr(){
    let hr = 12;
    for(let i =0 ;i <=hr;i++){
        hour.options[hour.options.length] = new Option(Zero(i),i);
    }
}
addHr();

//adding to the minutes
function addMin(){
    let min = 59;
    for(let i =0;i<=min;i++)
    {
        minute.options[minute.options.length] = new Option(Zero(i),i);
    }
}
addMin();



// adding to the seconds 
function addSec(){
    let sec = 59;
    for(let i = 0 ; i<= sec; i++){
        second.options[second.options.length] = new Option(Zero(i),i);
    }
}
addSec();

showAlarms();
triggerAlarm();


//adding the list of alarm and setting it

setAlarm.addEventListener('click',function(){
    let Hour = hour.value;
    let Minute = minute.value;
    let Seconds = second.value;
    let Meridian = meridian.value;
    let Lablel = alarmLabel.value;

    if(Lablel === ""){
        Lablel = "Alarm"
    }

    //alarm time 
    let Time = Zero(Hour) + ":" + Zero(Minute) + ":" + Zero(Seconds)  + " " + Meridian;

    let alarmEvent = {
        label : Lablel,
        time: Time
    }

    let nextAlarm = localStorage.getItem('nextAlarm');

    if(nextAlarm == null){
        list = [];
    }else{
        list = JSON.parse(nextAlarm);
    }

    list.push(alarmEvent);
    localStorage.setItem('nextAlarm', JSON.stringify(list));

    showAlarms();
    triggerAlarm();
});

// deleting alarm 
function deleteAlarm(index){
    let nextAlarm = localStorage.getItem('nextAlarm');
    let list = JSON.parse(nextAlarm);

    list.splice(index,1);

    localStorage.setItem('nextAlarm',JSON.stringify(list));

    showAlarms();
    triggerAlarm();
    
}
// showing next Alarm 
function showAlarms(){
    let nextAlarm =localStorage.getItem('nextAlarm');

    if(nextAlarm == null){
        list = [];
    }else{
        list =JSON.parse(nextAlarm);
    }
    let html = '';
    let nextAlarmsList = document.getElementById('all-alarm-list');

    nextAlarmsList.innerHTML = html;

    list.forEach((alarmEvent,index) =>{
        html += `<tr>
                    <td class="alarm-list-info">
                        <p style="margin: 5px;">${alarmEvent.label}</p>
                        <p><i class="far fa-clock"></i> ${alarmEvent.time}</p>
                    </td>
                    <td class="del_btn" onclick="deleteAlarm(${index})"><i class="fas fa-trash"></i></td>
                </tr>`
    });

    nextAlarmsList.innerHTML = html;
}


//triggering the alarm
function triggerAlarm(){
    let nextAlarm =localStorage.getItem('nextAlarm');

    if(nextAlarm == null){
        list = [];
    }else{
        list =JSON.parse(nextAlarm);
    }

    if(list.length != 0){
        let newAlarm = list[0];
      
    


    setInterval(function(){
            let date = new Date(); 
            let hours = date.getHours(); 
            let minutes = date.getMinutes(); 
            let seconds = date.getSeconds(); 
            let meridian = (date.getHours()) < 12 ? 'AM' : 'PM'; 
        
          
            if(hours <= 12){
                hours = hours 
            }else{
                hours = hours - 12;
            }
        
            let running_Time = runningTime.textContent = Zero(hours) + ":" + Zero(minutes) + ":" + Zero(seconds) + "  " + meridian;

            if(newAlarm.time == running_Time){
                window.alert(newAlarm.label);
                list.splice(0,1);
                localStorage.setItem('nextAlarm',JSON.stringify(list));
                showAlarms();
                triggerAlarm();
            }
        },1000);
}
}

