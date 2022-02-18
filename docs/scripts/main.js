import { canvas } from "./Canvas.js";
import { fontloader } from "./Font.js";
import { makeScreens } from "./Screens.js";
import { cursor } from "./ui/Cursor.js";
import { settings } from "./Settings.js";
class App {
    constructor() {
        this.state = 2 /* TITLE */;
        this.previoustime = Date.now();
    }
    main(screens) {
        this.screens = screens;
        const self = this;
        // self.tick()
        this.timer = setInterval(() => self.tick(), 1000 / 30);
    }
    tick() {
        // console.log("Tick!");
        // const now = Date.now()
        // const fps = 1000 / (now - this.previoustime)
        // this.previoustime = now
        // console.log(fps);
        const currentScreen = this.screens.getScreen(this.state);
        cursor.update();
        const newState = currentScreen.update();
        if (newState !== null)
            this.state = newState;
        currentScreen.draw();
        if (settings.DEBUG) {
            currentScreen.drawBoundingBoxes();
            const debugScreen = this.screens.getScreen(1 /* DEBUG */);
            debugScreen.update();
            debugScreen.draw();
        }
        if (settings.POSTENABLED)
            canvas.postProcess();
        canvas.processImage();
    }
}
const wait = setInterval(() => {
    if (fontloader.isReady()) {
        clearInterval(wait);
        console.log("Loaded!");
        const app = new App();
        app.main(makeScreens());
    }
}, 1000 / 10);
