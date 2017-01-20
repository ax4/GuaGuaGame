var IDLE_TIMEOUT = 10; //seconds
var _idleMilliSecondsCounter = 0; //milliseconds
var _MilliSecondsInterval = 10; //milliseconds
//var UpgradeSecondsInterval = 5; //seconds
var click = 0; //anti-cheating

document.onclick = function () {
  _idleMilliSecondsCounter = 0;
  console.log("Click");
  click++;
};
document.onmousemove = function () { //建议禁用！太过于作弊了！
  _idleMilliSecondsCounter = 0;
  console.log("Move");
  click++;
};
document.onkeypress = function () {
  _idleMilliSecondsCounter = 0;
  console.log("KeyPress");
  click++;
};

var myInterval = window.setInterval(CheckIdleTime, _MilliSecondsInterval);

function CheckIdleTime() {
  _idleMilliSecondsCounter += _MilliSecondsInterval;
  var oPanel = document.getElementById("SecondsUntilExpire");
  if (oPanel)
    oPanel.innerHTML = (IDLE_TIMEOUT * 1000 - _idleMilliSecondsCounter) / 1000;
  if (_idleMilliSecondsCounter >= IDLE_TIMEOUT * 1000) {
    alert("你死了！");
    window.clearInterval(myInterval);
    oPanel.innerHTML = ("祝你鸡年大吉吧！");
  }
}

var UpgradeInterval = window.setInterval(Upgrade, 5000);

function Upgrade() {
  var oPanel = document.getElementById("SecondsUntilExpire");
  if (click <= 0) {
    alert("你偷懒，懒死了！");
    window.clearInterval(myInterval);
    window.clearInterval(UpgradeInterval);
    oPanel.innerHTML = ("祝你鸡年大吉吧！");
    return; 
  }

  click = 0;
  _idleMilliSecondsCounter = 0;
  IDLE_TIMEOUT = IDLE_TIMEOUT * 0.8; // soft 

  window.clearInterval(UpgradeInterval);
  UpgradeInterval = window.setInterval(Upgrade, 5000);
}

function DisableMouse() {

}

function DisableKey() {

}