import Canvas from "./Canvas.js"
import { UiObject } from "./ui/UiObject.js";
import Session from "./Session.js";
import { Heading } from "./ui/Text.js";
import Fontloader from "./Font.js";
import { timeStamp } from "console";


enum State {

}
class App {

    fontloader: Fontloader
    timer: any

    main() {
        const canvas = new Canvas("gameDisplay", 1080, 1080)
        const session = new Session(canvas)

        const box = new UiObject(100, 100, 200, 100)
        const text = new Heading("Alww", 300, 200, canvas)

        session.addUiObject(box)
        session.addUiObject(text)

        this.fontloader = new Fontloader("fff", "richland")

        session.drawBoundingBoxes()
        session.draw()

        const res = this.fontloader.isReady()
        console.log(res);
        
        const self = this;
        this.timer = setInterval(() => self.tick(), 1000 / 30)
    }

    tick() {
        console.log("Tick!");
        
        const res = this.fontloader.isReady()
        console.log(res);
    }
}

const app = new App()
app.main()