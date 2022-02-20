import { canvas } from "./Canvas.js";
import { fontloader } from "./Font.js";
import { screenNames, makeScreens, Screens } from "./Screens.js"
import { cursor } from "./ui/Cursor.js";
import { session, Settings } from "./Session.js"
import { colors } from "./Color.js";
import { audioPlayer } from "./Audio.js";


class App {

    timer: any

    screens: Screens
    previoustime = Date.now()

    main(screens: Screens) {
        this.screens = screens
        const self = this;
        // self.tick()
        this.timer = setInterval(() => self.tick(), 1000 / 30)

    }

    tick() {
        // console.log("Tick!");
        
        const currentScreen = this.screens.getScreen(session.getCurrentScreenName())

        // UPDATE
        cursor.update()
        currentScreen.update()
        colors.update()


        // DRAW
        currentScreen.draw()

        if (session.getSetting(Settings.DEBUG)) {
            currentScreen.drawBoundingBoxes()
            const debugScreen = this.screens.getScreen(screenNames.DEBUG)
            debugScreen.update()
            debugScreen.draw()
        }

        if (session.getSetting(Settings.POSTPROCESSING)) canvas.postProcess()
        canvas.processImage()
    }
}

const wait = setInterval(() => {
    if (fontloader.isReady() && audioPlayer.isReady()) { 
        clearInterval(wait)
        console.log("Loaded!");

        const screens = makeScreens()


        const app = new App()
        session.setScreens(screens)
        app.main(screens)
    }
}, 1000 / 10)

