import Canvas from "./Canvas.js"
import { UiObject } from "./ui/UiObject.js";
import Screen from "./Screen.js";
import { Heading } from "./ui/Text.js";
import Fontloader from "./Font.js";

const enum State {
    TITLE=0
}

class App {

    fontloader: Fontloader
    debug = true
    canvas: Canvas
    timer: any

    screens = {}
    state = State.TITLE

    main() {
        this.canvas = new Canvas("gameDisplay", 1080, 1080)

        // Make the screens

        const titleScreen = new Screen(this.canvas)

        const box = new UiObject(100, 100, 200, 100)
        const text = new Heading("Froots", 300, 200, this.canvas)

        titleScreen.addUiObject(box)
        titleScreen.addUiObject(text)

        this.screens[State.TITLE] = titleScreen

        
        
        const self = this;
        this.timer = setInterval(() => self.tick(), 1000 / 30)
    }

    tick() {
        console.log("Tick!");
        this.canvas.clear()
        this.screens[this.state].draw()
    }
}


const fontloader = new Fontloader("fff", "richland")
const wait = setInterval(() => {
    if (fontloader.isReady()) { 
        clearInterval(wait)
        console.log("Loaded!");
    }
}, 1000 / 10)

const app = new App()
app.main()