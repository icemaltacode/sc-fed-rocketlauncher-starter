let launched = false;
let altitude = 0;
let temp = 27;
let fuel = 100000;

document.addEventListener('DOMContentLoaded', function(e) {
    monitor();
}, false);

document.getElementById('launchButton').addEventListener('click', function(e) {
    if (!launched) {
        let launchButton = document.getElementById('launchButton');
        launchButton.classList.remove("eightbit-btn--reset");
        launchButton.classList.add('eightbit-btn--proceed');
        launchButton.innerHTML = "Reset";
        initiateCountdown();
    } else {
        reset();
    }
});

function log(message, newLine = true) {
    let status = document.querySelector(".status");
    if (newLine) {
        status.innerHTML += "<br>" + message;
    } else {
        status.innerHTML += message;
    }
}

function initiateCountdown() {
    launched = true;
    log("Initiating Countdown");
    log("");
    let t = 5;
    let countDown = setInterval(() => {
        if (t < 0) {
            clearInterval(countDown);
            launch();
        } else {
            log(`${t}...`, false);
            t--;
        }
    }, 1000);
}

function launch() {
    log("Lift off!")
    let rocket = document.querySelector('.rocket');
    rocket.style.backgroundImage="url(assets/rocket.gif)";
    rocket.style.paddingTop = "500px";
    climb();
}

function climb() {
    let rocket = document.querySelector('.rocket');
    setInterval(monitor, 10);
    let climbRate = 50;
    let climbTimer = setInterval(frame, climbRate);
    function frame() {
        if (altitude == 340) {
            clearInterval(climbTimer);
            return;
        }
        altitude++;
        fuel -= 50;
        temp += 5;
        rocket.style.paddingTop = `${500 - altitude}px`;
        if (altitude % 10 == 0) {
            clearInterval(climbTimer);
            climbRate -= 5;
            climbTimer = setInterval(frame, climbRate);
        }
    }
}

let monitor = () => {
    document.getElementById('altitude').innerHTML = `${altitude}m`;
    document.getElementById('temp').innerHTML = `${temp}C`;
    document.getElementById('fuel').innerHTML = `${fuel}L`;
};

function reset() {
    location.reload();
}