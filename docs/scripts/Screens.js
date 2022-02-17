import { Screen } from "./Screen.js";
import { Heading } from "./ui/Text.js";
import { UiObject } from "./ui/UiObject.js";
class TitleScreen extends Screen {
    constructor() {
        super();
    }
    update() {
        return 0 /* TITLE */;
    }
}
function makeScreens() {
    const Screens = {};
    const titleScreen = new TitleScreen();
    const box = new UiObject(100, 100, 200, 100);
    const text = new Heading("Froots", 300, 200);
    titleScreen.addUiObject(box);
    titleScreen.addUiObject(text);
    Screens[0 /* TITLE */] = titleScreen;
    return (Screens);
}
export { makeScreens };
