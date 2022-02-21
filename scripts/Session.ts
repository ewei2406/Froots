import { screenNames, Screens } from "./Screens.js";

export enum Settings {
    DEBUG="DEBUG",
    POSTPROCESSING="POSTPROCESSING"
}

const settings = {
    DEBUG: false,
    POSTPROCESSING: true
}

class Session {
    settings = settings
    currentScreen = screenNames.TITLE
    screens: Screens

    setScreens(screens: Screens) {
        this.screens = screens
    }

    getCurrentScreenName() {
        return this.currentScreen
    }

    setSetting(setting: Settings, value: any) {
        this.settings[setting] = value
    }

    getSetting(setting: Settings) {
        return this.settings[setting]
    }

    setCurrentScreen(newScreen: screenNames, disableOnload=false) {
        this.currentScreen = newScreen
        if (!disableOnload) {
            this.screens.getScreen(this.currentScreen).onLoad()
        }
    }
}

const session = new Session()
export { session }