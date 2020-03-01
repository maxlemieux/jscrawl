
let playerLoc = [0,0];

const gameContainer = document.getElementById("game-container");
document.body.setAttribute("style", "height:100%; margin:0; border:0;");

/* Use the function from npc.js to build an array of NPCs to refer to for this map */
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

function drawPlayer(playerLoc) {
    // Get new position
    x = playerLoc[0];
    y = playerLoc[1];
    var mapLoc = document.getElementById("r"+y+"c"+x);
    updateMap();
    mapLoc.innerHTML = '@';
};

displayStats();
buildMap();
drawMap();
updateMap();
drawPlayer(playerLoc);

/*
    Function to handle combat. Normally, combatantOne will be the player and combatantTwo a monster.
    However, both combatants could be monsters.
*/
const runCombat = (combatantOne, combatantTwo) => {
    console.log(`${combatantOne.name} is attacking ${combatantTwo.name}!`);
    console.log(`${combatantTwo.name} is attacking ${combatantOne.name}!`);
}

/*
    Function to move the player on the map. 
    Takes a direction as only parameter
    Handles initiating combat routines and other interactions, depending on what is found on the new map tile.
*/
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
        runCombat('player', mapArr[newPlayerLoc[1]][newPlayerLoc[0]].hasNpc);
        // lol 1-hit!
        mapArr[newPlayerLoc[1]][newPlayerLoc[0]].hasNpc = null;
        console.log(`You have slain a monster!`);
    } else {
        playerLoc = newPlayerLoc;
    };
    drawPlayer(playerLoc);
};