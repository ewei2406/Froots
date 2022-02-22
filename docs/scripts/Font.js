export var Fonts;
(function (Fonts) {
    Fonts["TITLE"] = "richland";
    Fonts["BODY"] = "fff";
})(Fonts || (Fonts = {}));
class Fontloader {
    constructor(...fonts) {
        this.loadingFonts = {};
        fonts.forEach(font => {
            this.loadingFonts[font] = false;
            const f = new FontFace(font, `url(/assets/fonts/${font}.woff)`);
            f.load().then(() => {
                this.loadingFonts[font] = true;
                document.fonts.add(f);
            });
        });
    }
    isReady() {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const [_key, value] of Object.entries(this.loadingFonts)) {
            if (!value)
                return false;
        }
        return true;
    }
}
const fontloader = new Fontloader(Fonts.TITLE, Fonts.BODY);
export { fontloader };
