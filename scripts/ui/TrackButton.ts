import { canvas } from "../Canvas.js";
import { colors } from "../Color.js";
import { Fonts } from "../Font.js";
import { tracks, TrackNames, TrackUiObject } from "../game/tracks.js";
import { screenNames } from "../Screens.js";
import { session } from "../Session.js";
import { Button } from "./Button.js";
import { TextObject } from "./Text.js";
import { UiObject } from "./UiObject.js";

export class TrackButton extends UiObject {

    trackUiObject: TrackUiObject
    selectButton: Button
    title: TextObject
    trackName: TrackNames

    constructor(trackName: TrackNames, x: number, y: number, w: number) {
        super(x, y, w, w * 0.75)
        this.trackUiObject = tracks.getTrackUiObject(trackName, this.x, this.y, this.w, this.h)
        this.trackName = trackName
        
        this.selectButton = new Button("", this.x, this.y, 10, () => {
            session.CURRENTSCREEN = screenNames.DIFMODESELECT
        })

        this.selectButton.w = this.w
        this.selectButton.h = this.h
        this.selectButton.hoverColor = colors.MEDIUM
        this.selectButton.borderHoverColor = colors.ULTRABRIGHT
        
        this.title = new TextObject(this.trackName, this.x, this.y - 20, 15, Fonts.BODY, colors.SOLID)
    }

    setX(x: number) {
        this.x = x
        this.selectButton.x = x
        this.trackUiObject.setX(x)
        this.title.x = x
    }

    draw(): void {
        this.selectButton.draw()
        this.trackUiObject.draw(this.selectButton.isHover ? colors.ULTRABRIGHT : colors.SOLID)
        this.title.draw(this.selectButton.isHover ? colors.ULTRABRIGHT : colors.SOLID)
    }

    update(): void {
        this.selectButton.update()
    }
}

export class TrackSelector extends UiObject {

    trackButtons: Array<TrackButton>
    spacing = 10
    itemWidth = 100
    scrollLeft = new Button("<", 20, 200, 10, () => { this.scroll(-1) })
    scrollRight = new Button(">", 45, 200, 10, () => { this.scroll(1) })
    offset = 0

    constructor(x: number, y: number) {
        super(x, y, canvas.width, canvas.height)
        this.trackButtons = []

        tracks.trackNames.forEach((trackName, i) => {
            this.trackButtons.push(new TrackButton(trackName, 
                this.x + (this.itemWidth + this.spacing) * i, this.y, this.itemWidth))
        })

        this.w = this.trackButtons.length * (this.itemWidth + this.spacing)
        this.h = (this.scrollLeft.y - this.y) + this.scrollLeft.h
    }

    scroll(offset: number): void {
        this.offset -= offset
        this.offset = Math.max(1 - this.trackButtons.length, this.offset)
        this.offset = Math.min(0, this.offset)

        for (let i = 0; i < this.trackButtons.length; i++) {
            this.trackButtons[i].setX(this.x + (this.itemWidth + this.spacing) * (i + this.offset))
        }
    }

    draw(): void {
        this.trackButtons.forEach(tb => tb.draw())

        this.scrollRight.draw()
        this.scrollLeft.draw()
    }

    update(): void {
        this.trackButtons.forEach(tb => tb.update())
        if (this.offset <= 1 - this.trackButtons.length) this.scrollRight.disabled = true
        else this.scrollRight.disabled = false
        if (this.offset >= 0) this.scrollLeft.disabled = true
        else this.scrollLeft.disabled = false

        this.scrollRight.update()
        this.scrollLeft.update()
    }
}