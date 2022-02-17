import { Screen } from "./Screen.js";
import { Heading } from "./ui/Text.js";
import { UiObject } from "./ui/UiObject.js";

export const enum State {
    TITLE = 0
}

class TitleScreen extends Screen {
    constructor() {
        super()
    }

    update(): State {
        return State.TITLE
    }
}

function makeScreens(): any {

    const Screens = {}

    const titleScreen = new TitleScreen()

    const box = new UiObject(100, 100, 200, 100)
    const text = new Heading("Froots", 300, 200)

    titleScreen.addUiObject(box)
    titleScreen.addUiObject(text)

    Screens[State.TITLE] = titleScreen

    return (
        Screens
    )
}


export { makeScreens }