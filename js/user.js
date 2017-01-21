function initWilddog() {
    var appID = "guaguagame"
    var config = {
        authDomain: appID + '.wilddog.com',
        syncURL: "https://" + appID + ".wilddogio.com"
    };
    wilddog.initializeApp(config);
}

function login() {
    var doLogin = function () {
        wilddog.auth().signInAnonymously().then(function (user) {
            console.info("Signed In with ->", user);
            loginCb();
        }).catch(function (error) {
            // 错误处理
            console.info(error);
            // ...
        });
    }

    var already = function () {
        console.log("already login")
    }

    quick_pre_login(already, doLogin);
}

function quick_pre_login(successCb, failCb) {
    if (wilddog.auth().currentUser != null) {
        if (successCb) {
            successCb();
        }
    }
    else {
        if (failCb) {
            failCb();
        }
    }
}


function pre_login(successCb, failCb) {
    var stoplisten = wilddog.auth().onAuthStateChanged(function (user) {
        console.info("auth state changed ->", user);
        if (wilddog.auth().currentUser != null) {
            if (successCb) {
                successCb();
                if (stoplisten) {
                    stoplisten();
                }

            }
        }
        else {
            if (failCb) {
                failCb();
                if (stoplisten) {
                    stoplisten();
                }
            }
        }
    });
}

function loginCb() {
    var userName = document.getElementById("name").value;
    if (userName == "") {
        userName = "无名蛤丝"
    }

    changeName(userName);
    postLoginCb();
}

function postLoginCb() {
    var e = document.getElementById("getName-div");
    if (e){
        e.hidden = true;
    }

    var e2 = document.getElementById("UserName");
    e2.innerHTML = wilddog.auth().currentUser.displayName;
    e2.innerHTML += "， 吼啊！"

}

function changeName(name) {
    wilddog.auth().currentUser.updateProfile({
        displayName: name,
    }).then(function () {
        // 更新成功
        console.log("更名成功 ->", wilddog.auth().currentUser);
    }).catch(function (error) {
        // 发生错误
        console.log(error);
    });
}
