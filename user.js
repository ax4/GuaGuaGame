function initWilddog() {
    var appID = "guaguagame"
    var config = {
        authDomain: appID + '.wilddog.com',
        syncURL: "https://" + appID + ".wilddogio.com"
    };
    wilddog.initializeApp(config);
}

function login() {
    initWilddog();
    wilddog.auth().signInAnonymously().then(function (user) {
        console.info("Signed In with ->", user);
        loginCb();
    }).catch(function (error) {
        // 错误处理
        console.info(error);
        // ...
    });
}

function loginCb() {
    //todo: get name from webpage 
    // var userName = get
    changeName("hello_new name");

    //todo: hide getName-div

    //start();
}

function changeName(name) {
    wilddog.auth().currentUser.updateProfile({
        displayName: name,
    }).then(function () {
        // 更新成功
        console.log("更名成功");
    }).catch(function (error) {
        // 发生错误
        console.log(error);
    });
}
