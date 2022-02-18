import { Colors } from "./Color.js";
import { Fonts } from "./Font.js";
import { Screen } from "./Screen.js";
import { Button } from "./ui/Button.js";
import { cursor } from "./ui/Cursor.js";
import { Heading, TextObject } from "./ui/Text.js";
import { settings } from "./Settings.js";

export const enum State {
    DEBUG=1,
    TITLE=2,
    SETTINGS=3
}

export class Screens {
    screens = {}

    addScreen(screen: Screen) {
        this.screens[screen.matchState] = screen
    }

    getScreen(state: State): Screen {
        return this.screens[state]
    }
}

class DebugScreen extends Screen {
    constructor() {
        super(State.DEBUG)

        const cursorText = new TextObject(0, 250, 250, 20, Fonts.BODY, Colors.SOLID)

        cursorText.update = (function () {
            this.text = "X: " + Math.round(cursor.x)
            return null
        }).bind(cursorText)

        this.addUiObject(cursorText)
    }

    draw(): void {
        this.UiObjects.forEach(uiElement => {
            uiElement.draw()
        })
    }
}

class TitleScreen extends Screen {

    constructor() {
        super(State.TITLE)

        this.addUiObject(new Heading("Froots", 20, 20, 40))
        this.addUiObject(new TextObject("TD", 145, 20, 20, Fonts.BODY, Colors.SOLID))
        this.addUiObject(new TextObject("V 0.0.1", 340, 270, 10, Fonts.BODY, Colors.SOLID))

        this.addUiObject(new Button("PLAY", 20, 160, 10, () => {
            console.log("PLAY!");
            return null
        }))

        this.addUiObject(new Button("HELP", 20, 210, 10, () => {
            console.log("HELP!");
            return null
        }))

        this.addUiObject(new Button("ABOUT", 20, 235, 10, () => {
            console.log("ABOUT!");
            return null
        }))

        this.addUiObject(new Button("SETTINGS", 20, 185, 10, () => {
            console.log("SETTINGS!");
            return State.SETTINGS
        }))

        this.addUiObject(new Button("EXIT", 20, 260, 10, () => {
            console.log("EXIT!");
            return null
        }))
    }
}

class SettingsScreen extends Screen {
    constructor() {
        super(State.SETTINGS)

        this.addUiObject(new Heading("Settings", 20, 20, 40))

        const togglePost = new Button("DISABLE POST", 20, 160, 10, null)

        togglePost.onClick = (function() {
            this.text = settings.POSTENABLED ? "ENABLE POST" : "DISABLE POST"
            this.calcSize()
            settings.POSTENABLED = !settings.POSTENABLED
            return null
        }).bind(togglePost)

        this.addUiObject(togglePost)


        this.addUiObject(new Button("BACK", 20, 260, 10, () => {
            console.log("BACK!");
            return State.TITLE
        }))
    }
}

function makeScreens(): any {

    const screens = new Screens()

    screens.addScreen(new TitleScreen())
    screens.addScreen(new DebugScreen())
    screens.addScreen(new SettingsScreen())

    return (
        screens
    )
}


export { makeScreens }