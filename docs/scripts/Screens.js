import { colors } from "./Color.js";
import { Fonts } from "./Font.js";
import { Screen } from "./Screen.js";
import { Button } from "./ui/Button.js";
import { cursor } from "./ui/Cursor.js";
import { Heading, TextObject } from "./ui/Text.js";
import { session } from "./Session.js";
import { TrackSelector } from "./ui/TrackButton.js";
export class Screens {
    constructor() {
        this.screens = {};
    }
    addScreen(screen, screenName) {
        this.screens[screenName] = screen;
    }
    getScreen(screenName) {
        return this.screens[screenName];
    }
}
class DebugScreen extends Screen {
    constructor() {
        super();
        this.now = Date.now();
        this.previousTime = 0;
        const cursorX = new TextObject("X: ERROR", 340, 5, 9, Fonts.BODY, colors.DEBUG);
        cursorX.update = (function () {
            this.text = "X: " + Math.round(cursor.x);
            return null;
        }).bind(cursorX);
        this.addUiObject(cursorX);
        const cursorY = new TextObject("Y: ERROR", 340, 15, 9, Fonts.BODY, colors.DEBUG);
        cursorY.update = (function () {
            this.text = "Y: " + Math.round(cursor.y);
            return null;
        }).bind(cursorY);
        this.addUiObject(cursorY);
        const currentScreen = new TextObject("SC: ERROR", 340, 25, 9, Fonts.BODY, colors.DEBUG);
        currentScreen.update = (function () {
            this.text = "SC: " + session.CURRENTSCREEN;
            return null;
        }).bind(currentScreen);
        this.addUiObject(currentScreen);
        const fpsCounter = new TextObject("F: ERROR", 340, 35, 9, Fonts.BODY, colors.DEBUG);
        fpsCounter.update = (function () {
            this.now = Date.now();
            const fps = 1000 / (this.now - this.previousTime);
            this.previousTime = this.now;
            this.text = "F: " + Math.round(fps);
            return null;
        }).bind(fpsCounter);
        this.addUiObject(fpsCounter);
    }
    draw() {
        this.UiObjects.forEach(uiElement => {
            uiElement.draw();
        });
    }
}
class TitleScreen extends Screen {
    constructor() {
        super();
        this.addUiObject(new Heading("Froots", 20, 20, 40));
        this.addUiObject(new TextObject("TD", 145, 20, 20, Fonts.BODY, colors.SOLID));
        this.addUiObject(new TextObject("V 0.0.1", 340, 270, 10, Fonts.BODY, colors.SOLID));
        this.addUiObject(new Button("NEW GAME", 20, 185, 10, () => {
            session.CURRENTSCREEN = "LVLS" /* LEVELSELECT */;
        }));
        this.addUiObject(new Button("ABOUT", 20, 210, 10, () => {
            console.log("ABOUT!");
        }, true));
        this.addUiObject(new Button("SETTINGS", 20, 235, 10, () => {
            console.log("SETTINGS!");
            session.CURRENTSCREEN = "SETTINGS" /* SETTINGS */;
        }));
    }
}
class SettingsScreen extends Screen {
    constructor() {
        super();
        this.addUiObject(new Heading("Settings", 20, 20, 40));
        const togglePost = new Button(session.POSTENABLED ? "DISABLE POST" : "ENABLE POST", 20, 210, 10, null);
        togglePost.onClick = (function () {
            session.POSTENABLED = !session.POSTENABLED;
            this.text = session.POSTENABLED ? "DISABLE POST" : "ENABLE POST";
            this.calcSize();
            return null;
        }).bind(togglePost);
        this.addUiObject(togglePost);
        const toggleDebug = new Button(session.DEBUG ? "DISABLE DEBUG" : "ENABLE DEBUG", 20, 235, 10, null);
        toggleDebug.onClick = (function () {
            session.DEBUG = !session.DEBUG;
            this.text = session.DEBUG ? "DISABLE DEBUG" : "ENABLE DEBUG";
            this.calcSize();
            return null;
        }).bind(toggleDebug);
        this.addUiObject(toggleDebug);
        this.addUiObject(new Button("BACK", 20, 260, 10, () => {
            console.log("BACK!");
            session.CURRENTSCREEN = "TITLE" /* TITLE */;
        }));
    }
}
class LevelSelectScreen extends Screen {
    constructor() {
        super();
        this.addUiObject(new Heading("Select Level", 20, 20, 40));
        this.addUiObject(new Button("BACK", 20, 260, 10, () => {
            session.CURRENTSCREEN = "TITLE" /* TITLE */;
        }));
        this.addUiObject(new TrackSelector(20, 100));
    }
}
function makeScreens() {
    const screens = new Screens();
    screens.addScreen(new TitleScreen(), "TITLE" /* TITLE */);
    screens.addScreen(new DebugScreen(), "DEBUG" /* DEBUG */);
    screens.addScreen(new SettingsScreen(), "SETTINGS" /* SETTINGS */);
    screens.addScreen(new LevelSelectScreen(), "LVLS" /* LEVELSELECT */);
    screens.addScreen(new Screen(), "LVLS2" /* DIFMODESELECT */);
    return (screens);
}
export { makeScreens };
