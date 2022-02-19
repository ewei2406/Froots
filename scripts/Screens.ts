import { Colors } from "./Color.js";
import { Fonts } from "./Font.js";
import { Screen } from "./Screen.js";
import { Button } from "./ui/Button.js";
import { cursor } from "./ui/Cursor.js";
import { Heading, TextObject } from "./ui/Text.js";
import { settings } from "./Settings.js";

export const enum State {
    DEBUG="DEBUG",
    TITLE="TITLE",
    SETTINGS="SETTINGS",
    LEVELSELECT="LVLS"
}

export class Screens {
    screens = {}

    addScreen(screen: Screen, state: State) {
        this.screens[state] = screen
    }

    getScreen(state: State): Screen {
        return this.screens[state]
    }
}

class DebugScreen extends Screen {

    now = Date.now()
    previousTime = 0

    constructor() {
        super()

        const cursorX = new TextObject("X: ERROR", 340, 5, 9, Fonts.BODY, Colors.DEBUG)

        cursorX.update = (function () {
            this.text = "X: " + Math.round(cursor.x)
            return null
        }).bind(cursorX)

        this.addUiObject(cursorX)


        const cursorY = new TextObject("Y: ERROR", 340, 15, 9, Fonts.BODY, Colors.DEBUG)

        cursorY.update = (function () {
            this.text = "Y: " + Math.round(cursor.y)
            return null
        }).bind(cursorY)

        this.addUiObject(cursorY)

        const currentState = new TextObject("S: ERROR", 340, 25, 9, Fonts.BODY, Colors.DEBUG)

        currentState.update = (function () {
            this.text = "S: " + settings.STATE
            return null
        }).bind(currentState)

        this.addUiObject(currentState)


        const fpsCounter = new TextObject("F: ERROR", 340, 35, 9, Fonts.BODY, Colors.DEBUG)

        fpsCounter.update = (function () {

            this.now = Date.now()
            const fps = 1000 / (this.now - this.previousTime)
            this.previousTime = this.now

            this.text = "F: " + Math.round(fps)
            return null
        }).bind(fpsCounter)

        this.addUiObject(fpsCounter)

        
        
    }

    draw(): void {
        this.UiObjects.forEach(uiElement => {
            uiElement.draw()
        })
    }
}

class TitleScreen extends Screen {

    constructor() {
        super()

        this.addUiObject(new Heading("Froots", 20, 20, 40))
        this.addUiObject(new TextObject("TD", 145, 20, 20, Fonts.BODY, Colors.SOLID))
        this.addUiObject(new TextObject("V 0.0.1", 340, 270, 10, Fonts.BODY, Colors.SOLID))

        this.addUiObject(new Button("NEW GAME", 20, 185, 10, () => {
            settings.STATE = State.LEVELSELECT
        }))

        this.addUiObject(new Button("ABOUT", 20, 210, 10, () => {
            console.log("ABOUT!");
        }))

        this.addUiObject(new Button("SETTINGS", 20, 235, 10, () => {
            console.log("SETTINGS!");
            settings.STATE = State.SETTINGS
        }))
    }
}

class SettingsScreen extends Screen {
    constructor() {
        super()

        this.addUiObject(new Heading("Settings", 20, 20, 40))

        const togglePost = new Button(settings.POSTENABLED ? "DISABLE POST" : "ENABLE POST", 
            20, 210, 10, null)

        togglePost.onClick = (function() {
            settings.POSTENABLED = !settings.POSTENABLED
            this.text = settings.POSTENABLED ? "DISABLE POST" : "ENABLE POST"
            this.calcSize()
            return null
        }).bind(togglePost)

        this.addUiObject(togglePost)


        const toggleDebug = new Button(settings.DEBUG ? "DISABLE DEBUG" : "ENABLE DEBUG", 
            20, 235, 10, null)

        toggleDebug.onClick = (function () {
            settings.DEBUG = !settings.DEBUG
            this.text = settings.DEBUG ? "DISABLE DEBUG" : "ENABLE DEBUG"
            this.calcSize()
            return null
        }).bind(toggleDebug)

        this.addUiObject(toggleDebug)

        this.addUiObject(new Button("BACK", 20, 260, 10, () => {
            console.log("BACK!");
            settings.STATE = State.TITLE
        }))
    }
}

class LevelSelectScreen extends Screen {
    constructor() {
        super()

        this.addUiObject(new Heading("New Game", 20, 20, 40))

        this.addUiObject(new Button("BACK", 20, 260, 10, () => {
            console.log("BACK!");
            settings.STATE = State.TITLE
        }))
    }
}

function makeScreens(): any {

    const screens = new Screens()

    screens.addScreen(new TitleScreen(), State.TITLE)
    screens.addScreen(new DebugScreen(), State.DEBUG)
    screens.addScreen(new SettingsScreen(), State.SETTINGS)
    screens.addScreen(new LevelSelectScreen(), State.LEVELSELECT)

    return (
        screens
    )
}


export { makeScreens }