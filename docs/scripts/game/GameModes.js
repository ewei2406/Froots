export var difficulties;
(function (difficulties) {
    difficulties[difficulties["EASY"] = 0] = "EASY";
    difficulties[difficulties["MEDIUM"] = 1] = "MEDIUM";
    difficulties[difficulties["HARD"] = 2] = "HARD";
    difficulties[difficulties["DEATH"] = 3] = "DEATH";
})(difficulties || (difficulties = {}));
export var gameModes;
(function (gameModes) {
    gameModes[gameModes["NORMAL"] = 0] = "NORMAL";
    gameModes[gameModes["NOPAUSE"] = 1] = "NOPAUSE";
    gameModes[gameModes["RECESSION"] = 2] = "RECESSION";
})(gameModes || (gameModes = {}));
