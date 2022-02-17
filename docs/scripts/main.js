import Canvas from "./canvas.js";
import { UiObject } from "./gameObjects.js";
import Session from "./session.js";
class App {
    main() {
        const canvas = new Canvas("gameDisplay", 1080, 1080);
        const session = new Session(canvas);
        const box = new UiObject(100, 100, 200, 100);
        session.addUiObject(box);
        session.draw();
        console.log("Working!");
    }
}
const app = new App();
app.main();
