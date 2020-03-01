const mapNpcArr = [];
const mapArr = [];
//const mapDimensions = [12,12];
const mapDimensions = [80,40];
const viewportDimensions = [40,20];

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
    for (let i=0; i<mapDimensions[1]; i++) {
        let thisRow = [];
        for (let j=0; j<mapDimensions[0]; j++) {
            const tile = getTile();
            thisRow.push(tile);
        }
        mapArr.push(thisRow);
    };
}

const drawMap = () => {
    for (i=0; i<mapDimensions[1]; i++) {
        let row = document.createElement("div");
        //row.setAttribute("class", "mx-auto");
        row.setAttribute("style", "display: flex");
        row.setAttribute("id", "r"+i);
        gameContainer.append(row);
    
        for (j=0; j<mapDimensions[0]; j++) {
          let col = document.createElement("div");
          col.setAttribute("id", "r"+i+"c"+j);
          row.append(col);
        }
    };
};


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
            thisTile.setAttribute("style", `height:20px; width:16px; background:black; color: ${tileColor};)`)
        };
    };
};