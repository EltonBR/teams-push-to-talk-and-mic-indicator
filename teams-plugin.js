class MicIndicator {
    divRef = null;
    interval = null;
    constructor() {
        let style = document.createElement("style");
        style.innerHTML = `
            @keyframes anim {
                from {
                    width: 100vw;
                    left:0%;
                }
                to {
                    width: 0vw;
                    left: 50%;

                }
            }

            #div-animated-indicator {
                animation: anim 2s infinite;
                width: 100vw;
                position: absolute;
                top:0px;
                height: 2pt;
                background-color: red;
                display: block;
                z-index: 9999;
                animation-direction: alternate;
            }
        `;

        let div = document.createElement("div");
        div.id = "div-animated-indicator";
        this.divRef = div;
        document.body.appendChild(style);
        document.body.appendChild(div)
    }

    show() {
        if (this.divRef !== null) {
            this.divRef.style.display = "block";
        }
    }

    hide() {
        if (this.divRef !== null) {
            this.divRef.style.display = "none";
        }
    }

    watchMicChanges() {
        this.interval = setInterval(() => {
            let micBtn = document.querySelector(".icons-call-microphone-off-filled") ?? document.querySelector(".icons-call-microphone")
            let isMuted = [...micBtn.classList].indexOf("icons-call-microphone-off-filled") > -1;
            if (!isMuted) {
                this.show();
            } else {
                this.hide();
            }
        }, 500);
    }

    stopMicChanges() {
        if(this.interval !== null) {
            clearInterval(this.interval);
        }
    }
} 

micIndicatorInstance = new MicIndicator();
micIndicatorInstance.watchMicChanges();

var isPressed = false;

const pushToTalkEvent = (e) => {
    if (e.code !== 'AltRight') {
        return;
    }

    if (isPressed && e.type == "keydown") {
        return;
    }

    const mute = (mute) => {
        var micBtn = document.querySelector(".icons-call-microphone-off-filled") ?? document.querySelector(".icons-call-microphone")
        isMuted = [...micBtn.classList].indexOf("icons-call-microphone-off-filled") > -1;
        if (mute) {
            if (isMuted) {
                return false;
            }
            micBtn.parentElement.click();
            return true;
        }
        if (!isMuted) {
            return false;
        }
        micBtn.parentElement.click();
        return true;
    };

    if (e.type == "keydown") {
        mute(false);
    } else if (e.type == "keyup") {
        mute(true);
    }

    //dry
    if(e.type == "keydown") {
        isPressed = true;
    } else {
        isPressed = false;
    }
};

window.addEventListener("keydown", pushToTalkEvent)
window.addEventListener("keyup", pushToTalkEvent)