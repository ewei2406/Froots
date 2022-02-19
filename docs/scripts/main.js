import { canvas } from "./Canvas.js";
import { fontloader } from "./Font.js";
import { makeScreens } from "./Screens.js";
import { cursor } from "./ui/Cursor.js";
import { session } from "./Session.js";
import { colors } from "./Color.js";
class App {
    constructor() {
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
        const currentScreen = this.screens.getScreen(session.CURRENTSCREEN);
        // UPDATE
        cursor.update();
        currentScreen.update();
        colors.update();
        // DRAW
        currentScreen.draw();
        if (session.DEBUG) {
            currentScreen.drawBoundingBoxes();
            const debugScreen = this.screens.getScreen("DEBUG" /* DEBUG */);
            debugScreen.update();
            debugScreen.draw();
        }
        if (session.POSTENABLED)
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
