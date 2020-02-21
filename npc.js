const npcRefArr = [];
const npcTypes = {
    orc: {
        npcSymbol: 'o',
    },
    humanoid: {
        npcSymbol: 'p',
    }
};

class NonPlayerCharacter {
        constructor(npcName, npcType, color, hitPoints, abilities) {
            this.npcName = npcName;
            this.npcType = npcType;
            this.symbolColor = color;
            this.hitPoints = hitPoints;
            this.abilities = abilities;
        }
};

const buildNpcRefArr = () => {
    npcRefArr.push(new NonPlayerCharacter('Small Orc', 'orc', 'tan', '25', null));
    npcRefArr.push(new NonPlayerCharacter('Sneaky thief', 'humanoid', 'grey', '20', null));
};