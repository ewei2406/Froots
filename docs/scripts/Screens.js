import { colors } from "./Color.js";
import { Fonts } from "./Font.js";
import { Screen } from "./Screen.js";
import { Button } from "./ui/Button.js";
import { cursor } from "./ui/Cursor.js";
import { Heading, TextObject } from "./ui/Text.js";
import { session, Settings } from "./Session.js";
import { TrackSelector } from "./ui/TrackButton.js";
import { TrackUiObject } from "./game/tracks.js";
import { gameConstructor } from "./game/gameConstructor.js";
import { difficulties, gameModes } from "./game/gameModes.js";
import { gameSession } from "./game/gameSession.js";
import { UiObject } from "./ui/UiObject.js";
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
            this.text = "SC: " + session.getCurrentScreenName();
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
            session.setCurrentScreen("LVLS" /* LEVELSELECT */);
        }));
        this.addUiObject(new Button("ABOUT", 20, 210, 10, () => {
            console.log("ABOUT!");
        }, true));
        this.addUiObject(new Button("SETTINGS", 20, 235, 10, () => {
            console.log("SETTINGS!");
            session.setCurrentScreen("SETTINGS" /* SETTINGS */);
        }));
    }
    onLoad() {
        console.log("LOADAED TITLE");
    }
}
class SettingsScreen extends Screen {
    constructor() {
        super();
        this.addUiObject(new Heading("Settings", 20, 20, 40));
        const togglePost = new Button(session.getSetting(Settings.POSTPROCESSING) ? "DISABLE POST" : "ENABLE POST", 20, 210, 10, null);
        togglePost.onClick = (function () {
            session.setSetting(Settings.POSTPROCESSING, !session.getSetting(Settings.POSTPROCESSING));
            this.text = session.getSetting(Settings.POSTPROCESSING) ? "DISABLE POST" : "ENABLE POST";
            this.calcSize();
            return null;
        }).bind(togglePost);
        this.addUiObject(togglePost);
        const toggleDebug = new Button(session.getSetting(Settings.DEBUG) ? "DISABLE DEBUG" : "ENABLE DEBUG", 20, 235, 10, null);
        toggleDebug.onClick = (function () {
            session.setSetting(Settings.DEBUG, !session.getSetting(Settings.DEBUG));
            this.text = session.getSetting(Settings.DEBUG) ? "DISABLE DEBUG" : "ENABLE DEBUG";
            this.calcSize();
            return null;
        }).bind(toggleDebug);
        this.addUiObject(toggleDebug);
        this.addUiObject(new Button("BACK", 20, 260, 10, () => {
            console.log("BACK!");
            session.setCurrentScreen("TITLE" /* TITLE */);
        }));
    }
}
class LevelSelectScreen extends Screen {
    constructor() {
        super();
        this.addUiObject(new Heading("Select Level", 20, 20, 40));
        this.addUiObject(new Button("BACK", 20, 260, 10, () => {
            session.setCurrentScreen("TITLE" /* TITLE */);
        }));
        this.addUiObject(new TrackSelector(20, 100));
    }
}
class DifModeSelect extends Screen {
    constructor() {
        super();
        this.addUiObject(new Heading("Game Settings", 20, 20, 40));
        // TITLE
        const title = new Heading(gameConstructor.trackName, 20, 100, 20);
        title.onLoad = (function () {
            this.text = gameConstructor.getTrackName();
        }).bind(title);
        this.addUiObject(title);
        // TRACK
        const currentTrack = new TrackUiObject(gameConstructor.trackName, 180, 100, 200, 150, true);
        currentTrack.onLoad = (function () {
            this.trackName = gameConstructor.getTrackName();
        }).bind(currentTrack);
        this.addUiObject(currentTrack);
        // DIFFICULTY
        this.addUiObject(new TextObject("DIFFICULTY", 20, 140, 10, Fonts.BODY, colors.SOLID));
        this.addUiObject(new TextObject("▲", 20, 155, 9, Fonts.BODY, colors.SOLID));
        this.addUiObject(new TextObject("▼", 20, 165, 9, Fonts.BODY, colors.SOLID));
        const difButton = new Button(difficulties[gameConstructor.getDifficulty()], 35, 155, 10, () => null);
        difButton.onClick = (function () {
            gameConstructor.cycleDifficulty();
            this.text = difficulties[gameConstructor.getDifficulty()];
            this.calcSize();
        }).bind(difButton);
        difButton.onLoad = (function () {
            this.text = difficulties[gameConstructor.getDifficulty()];
            this.calcSize();
        }).bind(difButton);
        this.addUiObject(difButton);
        // GAME MODE
        this.addUiObject(new TextObject("GAME MODE", 20, 185, 10, Fonts.BODY, colors.SOLID));
        this.addUiObject(new TextObject("▲", 20, 200, 9, Fonts.BODY, colors.SOLID));
        this.addUiObject(new TextObject("▼", 20, 210, 9, Fonts.BODY, colors.SOLID));
        const gameButton = new Button(gameModes[gameConstructor.getGameMode()], 35, 200, 10, () => null);
        gameButton.onClick = (function () {
            gameConstructor.cycleGameMode();
            this.text = gameModes[gameConstructor.getGameMode()];
            this.calcSize();
        }).bind(gameButton);
        gameButton.onLoad = (function () {
            this.text = gameModes[gameConstructor.getGameMode()];
            this.calcSize();
        }).bind(gameButton);
        this.addUiObject(gameButton);
        // Start
        const startButton = new Button("START!", 380, 260, 10, () => {
            gameConstructor.createGameSession();
            session.setCurrentScreen("INGAME" /* INGAME */);
        });
        startButton.x -= startButton.w;
        this.addUiObject(startButton);
        // Back
        this.addUiObject(new Button("BACK", 20, 260, 10, () => {
            session.setCurrentScreen("LVLS" /* LEVELSELECT */);
        }));
    }
}
class InGame extends Screen {
    constructor() {
        super();
        this.addUiObject(gameSession);
    }
    update() {
        gameSession.update();
    }
}
class Lose extends Screen {
    constructor() {
        super();
        this.addUiObject(new UiObject(0, 0, this.canvas.width, this.canvas.height, colors.DARKEN));
        this.addUiObject(new Heading("You Lose!", 20, 20, 40));
        this.addUiObject(new Button("EXIT TO TITLE", 20, 235, 10, () => {
            gameConstructor.reset();
            session.setCurrentScreen("TITLE" /* TITLE */);
        }));
        this.addUiObject(new Button("RETRY", 20, 260, 10, () => {
            session.setCurrentScreen("LVLS2" /* DIFMODESELECT */);
        }));
    }
    draw() {
        this.canvas.clear();
        this.canvas.screenFill(colors.EMPTY); // Set the background color
        gameSession.draw();
        this.UiObjects.forEach(e => e.draw());
    }
}
class Win extends Screen {
    constructor() {
        super();
        this.addUiObject(new UiObject(0, 0, this.canvas.width, this.canvas.height, colors.DARKEN));
        this.addUiObject(new Heading("You Win!", 20, 20, 40));
        this.addUiObject(new Button("EXIT TO TITLE", 20, 235, 10, () => {
            gameConstructor.reset();
            session.setCurrentScreen("TITLE" /* TITLE */);
        }));
        this.addUiObject(new Button("RETRY", 20, 260, 10, () => {
            session.setCurrentScreen("LVLS2" /* DIFMODESELECT */);
        }));
    }
    draw() {
        this.canvas.clear();
        this.canvas.screenFill(colors.EMPTY); // Set the background color
        gameSession.draw();
        this.UiObjects.forEach(e => e.draw());
    }
}
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
function makeScreens() {
    const screens = new Screens();
    screens.addScreen(new TitleScreen(), "TITLE" /* TITLE */);
    screens.addScreen(new DebugScreen(), "DEBUG" /* DEBUG */);
    screens.addScreen(new SettingsScreen(), "SETTINGS" /* SETTINGS */);
    screens.addScreen(new LevelSelectScreen(), "LVLS" /* LEVELSELECT */);
    screens.addScreen(new DifModeSelect(), "LVLS2" /* DIFMODESELECT */);
    screens.addScreen(new InGame(), "INGAME" /* INGAME */);
    screens.addScreen(new Lose(), "LOSE" /* LOSE */);
    screens.addScreen(new Win(), "WIN" /* WIN */);
    return (screens);
}
export { makeScreens };
