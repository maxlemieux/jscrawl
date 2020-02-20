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
        constructor(npcName, npcType, hitPoints, abilities) {
            this.npcName = npcName;
            this.npcType = npcType;
            this.hitPoints = hitPoints;
            this.abilities = abilities;
        }
}

const buildNpcRefArr () => {
    npcRefArr.push(new NonPlayerCharacter('Small Orc', 'orc', '25', null));
    npcRefArr.push(new NonPlayerCharacter('Sneaky thief', 'humanoid', '20', null));
}

export { npcRefArr, npcTypes };