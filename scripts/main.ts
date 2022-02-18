import { canvas } from "./Canvas.js";
import { fontloader } from "./Font.js";
import { State, makeScreens, Screens } from "./Screens.js"
import { cursor } from "./ui/Cursor.js";
import { settings } from "./Settings.js"


class App {

    timer: any

    screens: Screens
    state = State.TITLE
    previoustime = Date.now()

    main(screens: Screens) {
        this.screens = screens
        const self = this;
        // self.tick()
        this.timer = setInterval(() => self.tick(), 1000 / 30)
    }

    tick() {
        // console.log("Tick!");

        // const now = Date.now()
        // const fps = 1000 / (now - this.previoustime)
        // this.previoustime = now
        // console.log(fps);
    
        
        
        const currentScreen = this.screens.getScreen(this.state)

        cursor.update()
        const newState = currentScreen.update()
        
        if (newState !== null) this.state = newState

        currentScreen.draw()

        if (settings.DEBUG) {
            currentScreen.drawBoundingBoxes()
            const debugScreen = this.screens.getScreen(State.DEBUG)
            debugScreen.update()
            debugScreen.draw()
        }

        if (settings.POSTENABLED) canvas.postProcess()
        canvas.processImage()
    }
}

const wait = setInterval(() => {
    if (fontloader.isReady()) { 
        clearInterval(wait)
        console.log("Loaded!");
        const app = new App()
        app.main(makeScreens())
    }
}, 1000 / 10)

