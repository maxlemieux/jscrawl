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
        constructor(npcName, npcType, color, level, maxHitPoints, abilities) {
            this.name = npcName;
            this.npcType = npcType;
            this.symbolColor = color;
            this.level = level;
            this.hitPoints = maxHitPoints;
            this.maxHitPoints = maxHitPoints;
            this.getMaxHitPoints = function() {return maxHitPoints};
            this.abilities = abilities;
        }
};

/* Roll the bones! */
const d = (numDice, numSides) => {
    let totalRoll = 0;
    for (let i=0; i<numDice; i++) {
        totalRoll += Math.ceil(Math.random() * numSides);
    }
    return totalRoll;
};

/* Define abilities that can be used by npcs and players */
let abilities = {
    melee: {
        name: 'melee',
        dmg: d(1,5),
        type: ['physical'],
        speed: 1.0,
    },
    fireball: {
        name: 'Fireball',
        dmg: d(1,10),
        type: ['magic','fire'],
        speed: 1.0,
    },
};

const buildNpcRefArr = () => {
    npcRefArr.push(new NonPlayerCharacter('Small Orc', 'orc', 'tan', 1, 25, null));
    npcRefArr.push(new NonPlayerCharacter('Sneaky thief', 'humanoid', 'grey', 1, 20, null));
};