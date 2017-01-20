var IDLE_TIMEOUT = 10; //seconds
var _idleMilliSecondsCounter = 0; //in XXX ms


document.onclick = function() {
  _idleMilliSecondsCounter = 0;
};
document.onmousemove = function() {
  _idleMilliSecondsCounter = 0;
};
document.onkeypress = function() {
  _idleMilliSecondsCounter = 0;
};

var myInterval = window.setInterval(CheckIdleTime, _MilliSecondsInterval);

function CheckIdleTime() {
  _idleMilliSecondsCounter+= _MilliSecondsInterval;
  var oPanel = document.getElementById("SecondsUntilExpire");
  if (oPanel)
    oPanel.innerHTML = Math.round((IDLE_TIMEOUT*1000 - _idleMilliSecondsCounter)/1000) + "";
  if (_idleMilliSecondsCounter >= IDLE_TIMEOUT*1000) {
    alert("Time expired!");
    window.clearInterval(myInterval);
    oPanel.innerHTML = ("Job Done");
  }
}

