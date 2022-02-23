export var Settings;
(function (Settings) {
    Settings["DEBUG"] = "DEBUG";
    Settings["POSTPROCESSING"] = "POSTPROCESSING";
})(Settings || (Settings = {}));
const settings = {
    DEBUG: false,
    POSTPROCESSING: true
};
class Session {
    constructor() {
        this.settings = settings;
        this.currentScreen = "LVLS" /* LEVELSELECT */;
    }
    setScreens(screens) {
        this.screens = screens;
        this.screens.getScreen(this.currentScreen).onLoad();
    }
    getCurrentScreenName() {
        return this.currentScreen;
    }
    setSetting(setting, value) {
        this.settings[setting] = value;
    }
    getSetting(setting) {
        return this.settings[setting];
    }
    setCurrentScreen(newScreen, disableOnload = false) {
        this.currentScreen = newScreen;
        if (!disableOnload) {
            this.screens.getScreen(this.currentScreen).onLoad();
        }
    }
}
const session = new Session();
export { session };
