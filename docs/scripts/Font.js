export default class Fontloader {
    constructor(...fonts) {
        this.loadingFonts = {};
        fonts.forEach(font => {
            this.loadingFonts[font] = false;
            const f = new FontFace(font, `url(/assets/fonts/${font}.woff)`);
            f.load().then(() => {
                this.loadingFonts[font] = true;
            });
        });
    }
    isReady() {
        for (const [_key, value] of Object.entries(this.loadingFonts)) {
            if (!value)
                return false;
        }
        return true;
    }
}
