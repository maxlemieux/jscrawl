
let playerLoc = [0,0];

const gameContainer = document.getElementById("game-container");
document.body.setAttribute("style", "height:100%; margin:0; border:0;");

/* Use the function from npc.js to build an array of NPCs to refer to for this map */
buildNpcRefArr();

const playerObj = {
    name: 'Player',
    level: 1,
    xp: 0,
    stamina: 10,
    intellect: 10,
    strength: 10,
    maxHitPoints: function() {
        return (this.level * 1.3) * (this.stamina * 10);
    },
    getMaxHitPoints: function () {
        return this.maxHitPoints();
    },
    hitPoints: 1,
    abilities: [],
};

const displayStats = () => {
    hpElement = document.querySelector('#hit-points').textContent = playerObj.hitPoints;
    levelElement = document.querySelector('#level').textContent = playerObj.level;
    xpElement = document.querySelector('#xp').textContent = playerObj.xp;
};

/* Draw the player on the map */
function drawPlayer(playerLoc) {
    // Get new position
    x = playerLoc[0];
    y = playerLoc[1];
    var mapLoc = document.getElementById("r"+y+"c"+x);
    updateMap();
    mapLoc.innerHTML = '@';
};

/* Function to load initial state of game */
const loadGame = () => {
    /* Set player hitpoints to maximum */
    playerObj.hitPoints = playerObj.maxHitPoints();
    displayStats();

    /* Build map contents in memory */
    buildMap();

    /* Add map elements to the DOM */
    drawMap();

    updateMap();
    drawPlayer(playerLoc);    
};
loadGame();

/*
    Function to handle combat. Normally, cbOne will be the player and cbTwo a monster.
    However, both combatants could be monsters.
*/
const runCombat = (cbOne, abilityOne, cbTwo, abilityTwo) => {
    /* Initialize status of combatants - set false if dead */
    let cbOneStatus = true;
    let cbTwoStatus = true;

    /* C1 attacks C2 using A1 */
    let cbOneAttackDmg = abilityOne.dmg * cbOne.level;
    let newCbTwoHitPoints = cbTwo.hitPoints -= cbOneAttackDmg;
    if (abilityOne.name === 'melee') {
        console.log(`${cbOne.name} hits ${cbTwo.name} for ${cbOneAttackDmg} (${newCbTwoHitPoints}/${cbTwo.getMaxHitPoints()})!`);
    } else {
        console.log(`${cbOne.name}'s ${abilityOne.name} hits ${cbTwo.name} for ${cbOneAttackDmg}!`);
    };
    
    /* If still alive, C2 attacks C1 using A2 */
    if (newCbTwoHitPoints > 0) {
        let cbTwoAttackDmg = abilityTwo.dmg * cbTwo.level;
        let newCbOneHitPoints = cbOne.hitPoints -= cbTwoAttackDmg;
        console.log(`${cbTwo.name} hits ${cbOne.name} for ${cbTwoAttackDmg} (${newCbOneHitPoints}/${cbOne.getMaxHitPoints()})!`);
        displayStats();
    } else {
        /* C2 is dead, mark dead and finish up */
        cbTwoStatus = false;
        console.log(`${cbTwo.name} died!`);
    };
    
    /* Check if C1 is still alive */

    /* Return status of combatants */
    return {
        cbOne: cbOneStatus,
        cbTwo: cbTwoStatus,
    };
};

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
        // console.log('Moving into a monster!');
        let combatResult = runCombat(
            playerObj, 
            abilities.melee, 
            mapArr[newPlayerLoc[1]][newPlayerLoc[0]].hasNpc, 
            abilities.melee
        );
        /* If result indicates C2 is dead... */
        if (combatResult.cbTwo === false) {
            mapArr[newPlayerLoc[1]][newPlayerLoc[0]].hasNpc = null;
            console.log(`You have slain a monster!`);
        };
    } else {
        playerLoc = newPlayerLoc;
    };
    drawPlayer(playerLoc);
};