export default class Fontloader {

    loadingFonts = {}

    constructor(...fonts: Array<string>) {

        fonts.forEach(font => {
            this.loadingFonts[font] = false
            const f = new FontFace(font, `url(/assets/fonts/${font}.woff)`)
            f.load().then(() => {
                this.loadingFonts[font] = true
                document.fonts.add(f)
            })
        })
    }

    isReady(): boolean {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const [_key, value] of Object.entries(this.loadingFonts)) {
            if (!value) return false
        }
        return true
    }
}