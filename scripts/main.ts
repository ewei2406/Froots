import Fontloader from "./Font.js";
import { State, makeScreens } from "./Screens.js"

class App {

    fontloader: Fontloader
    debug = true
    timer: any

    screens: any
    state = State.TITLE

    main(screens: any) {
        this.screens = screens
        const self = this;
        this.timer = setInterval(() => self.tick(), 1000 / 30)
    }

    tick() {
        console.log("Tick!");

        const newState = this.screens[this.state].update()
        if (newState) this.state = newState

        this.screens[this.state].draw()

        if (this.debug) this.screens[this.state].drawBoundingBoxes()
    }
}

const fontloader = new Fontloader("fff", "richland")
const wait = setInterval(() => {
    if (fontloader.isReady()) { 
        clearInterval(wait)
        console.log("Loaded!");
        const app = new App()
        app.main(makeScreens())
    }
}, 1000 / 10)

