var IDLE_TIMEOUT = 10; //seconds
var _idleMilliSecondsCounter = 0; //milliseconds
var _MilliSecondsInterval = 10; //milliseconds
//var UpgradeSecondsInterval = 5; //seconds

document.onclick = function() {
  _idleMilliSecondsCounter = 0;
  console.log("Click");
};
document.onmousemove = function() {
  _idleMilliSecondsCounter = 0;
  console.log("Move");
};
document.onkeypress = function() {
  _idleMilliSecondsCounter = 0;
  console.log("KeyPress")
};

var myInterval = window.setInterval(CheckIdleTime, _MilliSecondsInterval);

function CheckIdleTime() {
  _idleMilliSecondsCounter+= _MilliSecondsInterval;
  var oPanel = document.getElementById("SecondsUntilExpire");
  if (oPanel)
    oPanel.innerHTML = (IDLE_TIMEOUT*1000 - _idleMilliSecondsCounter)/1000 + " 秒，不动就死";
  if (_idleMilliSecondsCounter >= IDLE_TIMEOUT*1000) {
    alert("Time expired!");
    window.clearInterval(myInterval);
    oPanel.innerHTML = ("Job Done");
  }
}

var UpgradeInterval = window.setInterval(Upgrade, 5000);

function Upgrade(){
  _idleMilliSecondsCounter = 0;
  IDLE_TIMEOUT = IDLE_TIMEOUT * 0.8; // soft 

  window.clearInterval(UpgradeInterval);
  UpgradeInterval = window.setInterval(Upgrade, 5000);
}

