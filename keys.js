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