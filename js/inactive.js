var IDLE_TIMEOUT = 10; //seconds
var _idleMilliSecondsCounter = 0; //milliseconds
var _lifeLongCounter = 0; //milliseconds
var _lifeLongCounterDelta = 0; //milliseconds

var _MilliSecondsInterval = 10; //milliseconds
//var UpgradeSecondsInterval = 5; //seconds
var click = 0; //anti-cheating

document.onclick = function () {
  //_idleMilliSecondsCounter = 0;
  //click++;
  Rest_idleCounter();
  console.log("Click");
};
/* 
document.onmousemove = function () { //建议禁用！太过于作弊了！
  _idleMilliSecondsCounter = 0;
  console.log("Move");
  click++;
};*/
document.onkeypress = function () {
  //_idleMilliSecondsCounter = 0;
  //click++;
  Rest_idleCounter();
  console.log("KeyPress");
};

var myInterval = null;//window.setInterval(CheckIdleTime, _MilliSecondsInterval);
//var UpgradeInterval = null;//window.setInterval(Upgrade, 5000);

function start() {
  IDLE_TIMEOUT = 10; //seconds
  _idleMilliSecondsCounter = 0; //milliseconds
  _lifeLongCounter = 0; //milliseconds
  _lifeLongCounterDelta = 0; //milliseconds
  click = 0;
  myInterval = window.setInterval(CheckIdleTime, _MilliSecondsInterval);
  //UpgradeInterval = window.setInterval(Upgrade, 11000);

  var e = document.getElementById("start-game");
  e.disabled = true;
  e.hidden = true;

  var e2 = document.getElementById("rank");
  e2.disabled = true;
  e2.hidden = true;

  var e1 = document.getElementById("click-me");
  e1.disabled = false;
  e1.hidden = false;
}

function dead(info) {
  /* 死的逻辑 */
  var oPanel = document.getElementById("SecondsUntilExpire");
  if (info) {
    alert(info);
  }
  else {
    alert("你输了！")
  }

  window.clearInterval(myInterval);
  //window.clearInterval(UpgradeInterval);
  oPanel.innerHTML = ("送你们一个鸡啊，今年是鸡年啊！🐸");

  var e = document.getElementById("start-game");
  e.disabled = false;
  e.hidden = false;

  var e2 = document.getElementById("rank");
  e2.disabled = false;
  e2.hidden = false;

  var e1 = document.getElementById("click-me");
  e1.disabled = true;
  e1.hidden = true;

  if (deadCallback){
    deadCallback();
  }
}

function Rest_idleCounter() {
  _lifeLongCounter += _lifeLongCounterDelta;
  _idleMilliSecondsCounter = 0;
  click++;

  var e = document.getElementById("LifeLong");
  e.innerHTML = "已为 他 续命：";
  e.innerHTML += _lifeLongCounter / 1000.0;
  e.innerHTML += " 秒！"
}


function CheckIdleTime() {
  _idleMilliSecondsCounter += _MilliSecondsInterval;
  var oPanel = document.getElementById("SecondsUntilExpire");
  if (oPanel)
    oPanel.innerHTML = (IDLE_TIMEOUT * 1000 - _idleMilliSecondsCounter) / 1000;
  oPanel.innerHTML += "秒内，点击/敲键 续命"
  if (click >= 3) {
    Upgrade();
  }

  _lifeLongCounterDelta = _idleMilliSecondsCounter;
  if (_idleMilliSecondsCounter > IDLE_TIMEOUT * 1000) {

    /* 死的逻辑 */
    //var oPanel = document.getElementById("SecondsUntilExpire");
    //alert("GameOver! 去吃粘液饭！");
    //window.clearInterval(myInterval);
    //window.clearInterval(UpgradeInterval);
    //oPanel.innerHTML = ("祝你鸡年大吉吧！");
    dead("续命失败....!");
  }
}

function Upgrade() {
  /* 死的逻辑 */
  //var oPanel = document.getElementById("SecondsUntilExpire");
  //if (click <= 0) {
  //alert("一股神秘的力量，把你拽去吃年夜饭！");
  //window.clearInterval(myInterval);
  //window.clearInterval(UpgradeInterval);
  //oPanel.innerHTML = ("祝你鸡年大吉吧！");
  //return;
  //}

  click = 0;
  _idleMilliSecondsCounter = 0;
  IDLE_TIMEOUT = IDLE_TIMEOUT * 0.75; // soft 

  //window.clearInterval(UpgradeInterval);
  //UpgradeInterval = window.setInterval(Upgrade, IDLE_TIMEOUT*1000 + 10);
}

function DisableMouse() {
  var warn = document.getElementById("BanWarn");
  warn.innerHTML = "禁用鼠标！"
  var time = IDLE_TIMEOUT * 0.8 * 1000;

  var old = document.onclick;
  document.onclick = function () {
    warn.innerHTML += "！";
    click++;
  };

  window.setTimeout(RestoreMouse, time)

  function RestoreMouse() {
    warn.innerHTML = "注意警告"
    //document.onclick = function () {
    //_idleMilliSecondsCounter = 0;
    //console.log("Click");
    //click++;
    //};
    document.onclick = old;
  }
}

function DisableKey() {
  var warn = document.getElementById("BanWarn");
  warn.innerHTML = "禁用键盘！"
  var time = IDLE_TIMEOUT * 0.8 * 1000;

  var old = document.onkeypress;
  document.onkeypress = function () {
    warn.innerHTML += "！";
    click++;
  };

  window.setTimeout(RestoreKey, time)

  function RestoreKey() {
    warn.innerHTML = "注意警告"
    //document.onkeypress = function () {
    //_idleMilliSecondsCounter = 0;
    //console.log("KeyPress");
    //click++;
    //};
    document.onkeypress = old;
  }
}

function DeadMouse() {
  var warn = document.getElementById("DeadWarn");
  warn.innerHTML = "碰鼠标就死！"
  var time = IDLE_TIMEOUT * 0.8 * 1000;

  var old = document.onclick;

  document.onclick = function () {
    /* 死的逻辑 */
    //var oPanel = document.getElementById("SecondsUntilExpire");
    //alert("叫！你！别！碰！鼠标！GameOver! ");
    //window.clearInterval(myInterval);
    //window.clearInterval(UpgradeInterval);
    //oPanel.innerHTML = ("祝你鸡年大吉吧！");

    dead("叫！你！别！碰！鼠标！续命失败.....! ");
  };

  window.setTimeout(RestoreMouse, time)

  function RestoreMouse() {
    warn.innerHTML = "注意警告"
    //document.onclick = function () {
    //_idleMilliSecondsCounter = 0;
    //console.log("Click");
    //click++;
    //};
    document.onclick = old;
  }
}

function DeadKey() {
  var warn = document.getElementById("DeadWarn");
  warn.innerHTML = "碰键盘就死！"
  var time = IDLE_TIMEOUT * 0.8 * 1000;

  var old = document.onkeypress;
  document.onkeypress = function () {
    /* 死的逻辑 */
    //var oPanel = document.getElementById("SecondsUntilExpire");
    //alert("叫！你！别！碰！键盘！GameOver! ");
    //window.clearInterval(myInterval);
    //window.clearInterval(UpgradeInterval);
    //oPanel.innerHTML = ("祝你鸡年大吉吧！");
    dead("叫！你！别！碰！键盘！续命失败.....! ");
  };

  window.setTimeout(RestoreKey, time)

  function RestoreKey() {
    warn.innerHTML = "注意警告"
    //document.onkeypress = function () {
    //_idleMilliSecondsCounter = 0;
    //console.log("KeyPress");
    //click++;
    //};
    document.onkeypress = old;
  }
}