const gameContainer = document.getElementById("game-container");
document.body.setAttribute("style", "height:100%; margin:0; border:0;");

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
buildNpcRefArr();

const playerStats = {
    level: 1,
    xp: 0,
    stamina: 10,
    intellect: 10,
    strength: 10,
    hitPoints: function() {
        return (this.level * 1.3) * (this.stamina * 10);
    }
};

const displayStats = () => {
    lifeElement = document.querySelector('#life-points').textContent = playerStats.hitPoints();
    levelElement = document.querySelector('#level').textContent = playerStats.level;
    xpElement = document.querySelector('#xp').textContent = playerStats.xp;
};
displayStats();

const mapNpcArr = [];
const mapArr = [];
const mapDimensions = [12,12];

const tileTypes = {
    floor: {
        tileSymbol: '.',
        passable: true,
        trapped: false,
        trapType: null,
    },
    wall: {
        tileSymbol: '#',
        passable: false,
    }
}

const getTile = () => {
    let thisNpc = null;
    /* Chance to place NPC on any passable tile */
    if (Math.random() > 0.9) {
        thisNpc = npcRefArr[Math.floor(npcRefArr.length * Math.random())];
        mapNpcArr.push(thisNpc);
        //console.log(thisNpc);
    };
    const tile = {
        tileType: 'floor',
        hasNpc: thisNpc,
    };
    return tile;
};

const buildMap = () => {    
    for (let i=0; i<mapDimensions[0]; i++) {
        let thisRow = [];
        for (let j=0; j<mapDimensions[1]; j++) {
            const tile = getTile();
            thisRow.push(tile);
        }
        mapArr.push(thisRow);
    };
}
buildMap();

const drawMap = () => {
    for (i=0; i<mapDimensions[1]; i++) {
        let row = document.createElement("div");
        row.setAttribute("class", "row mx-auto");
        row.setAttribute("id", "r"+i);
        row.setAttribute("style", "height:30px; width:360px;");
        gameContainer.append(row);
    
        for (j=0; j<mapDimensions[0]; j++) {
          let col = document.createElement("div");
          col.setAttribute("class", "col");
          col.setAttribute("id", "r"+i+"c"+j);
          row.append(col);
        }
    };
};
drawMap();

const updateMap = () => {
    for (let i=0, rowCount=mapArr.length; i<rowCount; i++) {
        const row = mapArr[i];
        for (let j=0, colCount=row.length; j<colCount; j++) {
            let tileColor = 'white';
            
            const col = mapArr[i][j];
            thisTile = document.getElementById(`r${i}c${j}`);
            let tileChar;
            
            const tileType = col.tileType;
            switch(tileType) {
                case 'floor':
                    tileChar = '.';
                    break;
                case 'wall': 
                    tileChar = '#';
                    break;
                default:
                    break;
            };
            thisTile.innerHTML = tileChar;
            if (col.hasNpc != null) {
                thisTile.innerHTML = npcTypes[col.hasNpc.npcType].npcSymbol;
                tileColor = col.hasNpc.symbolColor;
            }
            thisTile.setAttribute("style", `height:30px; width:30px; background:black; color: ${tileColor};)`)
        };
    };
};
updateMap();

let playerLoc = [0,0];

function drawPlayer(playerLoc) {
    // Get new position
    x = playerLoc[0];
    y = playerLoc[1];
    var mapLoc = document.getElementById("r"+y+"c"+x);
    updateMap();
    mapLoc.innerHTML = '@';
};

drawPlayer(playerLoc);

function movePlayer(direction) {
    // Remove the old player sprite
    x = parseInt(playerLoc[0]);
    y = parseInt(playerLoc[1]);
    var oldMapLoc = document.getElementById("r"+y+"c"+x);
    
    // Calculate new player location
    var newPlayerLoc = [];
    switch(direction) {
        case "east":
            if (x < mapDimensions[0] - 1) {
                x = x+1;
            };
            newPlayerLoc = [x, y];
            break;
        case "west":
            if (x > 0) {
                x = x-1;
            };
            newPlayerLoc = [x, y];
            break;
        case "north":
            if (y > 0) {
                y = y-1;
            };
            newPlayerLoc = [x, y];
            break;
        case "south":
            if (y < mapDimensions[1] -1) {
                y = y+1;
            };
            newPlayerLoc = [x, y];
            break;
        case 'northwest':
            if (y > 0 && x > 0) {
                y = y-1;
                x = x-1;
            };
            newPlayerLoc = [x, y];
            break;
        case 'northeast':
            if (y > 0 && x < mapDimensions[0] - 1) {
                y = y-1;
                x = x+1;
            };
            newPlayerLoc = [x, y];
            break;
        case 'southeast':
            if (y < mapDimensions[1] -1 && x < mapDimensions[0] - 1) {
                y = y+1;
                x = x+1;
            };
            newPlayerLoc = [x, y];
            break;
        case 'southwest':
            if (y < mapDimensions[1] -1 && x > 0) {
                y = y+1;
                x = x-1;
            };
            newPlayerLoc = [x, y];
            break;
    };
    if (mapArr[newPlayerLoc[1]][newPlayerLoc[0]].hasNpc) {
        console.log('Moving into a monster!');
        // lol 1-hit!
        mapArr[newPlayerLoc[1]][newPlayerLoc[0]].hasNpc = null;
        console.log(`You have slain a monster!`);
        drawPlayer(playerLoc);
    } else {
        playerLoc = newPlayerLoc;
        drawPlayer(playerLoc);
    };
};

document.addEventListener("keydown", function(event) {
    //console.log(event.keyCode);
    const moveKeyCodes = [37,65,38,87,39,68,40,88,81,69,67,90];
    if (moveKeyCodes.includes(event.keyCode)) {
        event.preventDefault();
    };
    switch(event.keyCode) {
        case 37:
        case 65:
            movePlayer("west");
            break;
        case 38:
        case 87:
            movePlayer("north");
            break;
        case 39:
        case 68:
            movePlayer("east");
            break;
        case 40:
        case 88:
            movePlayer("south");
            break;
        case 81:
            movePlayer("northwest");
            break;
        case 69:
            movePlayer("northeast");
            break;
        case 67:
            movePlayer("southeast");
            break;
        case 90:
            movePlayer("southwest");
            break;
        default:
            break;
    };
});