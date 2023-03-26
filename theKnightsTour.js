reset();

function assign(inputArray) {
            for (j = 0; j <= 7; j++)
                for (i = 0; i <= 7; i++) {
                    indexValue = indexes[i][j];
                    if (indexValue == 0) indexValue = "";
                    cellName = "C" + (i + 1) + "" + (j + 1);
                    document.getElementById(cellName).innerHTML = indexValue;
                }
            cellName = "C" + currentX + "" + currentY;
            document.getElementById(cellName).innerHTML = "<strong>&#9822;</strong>";
}

function next() {
            document.getElementById("aut").setAttribute("disabled", "disabled");
            pt = potentialMoves();
            if (pt.length == 0) {
                gameover();
            } else {
                ch = chooseOne(pt);
                indexes[ch[0] - 1][ch[1] - 1] = ++currentTurn;
            }
            assign(indexes);
}

function auto() {
            document.getElementById("btn").setAttribute("disabled", "disabled");
            myInt = setInterval(next, 400);
}

function reset() {
            document.getElementById("btn").removeAttribute("disabled");
            document.getElementById("aut").removeAttribute("disabled");
            for (i = 1; i <= 8; i++)
                for (j = 1; j <= 8; j++) {
                    tdId = "C" + i + "" + j;
                    document.getElementById(tdId).setAttribute("onclick", "manual(" + i + ", " + j + ")");
                }

            indexes = [
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 0, 0, 0]
            ];
            myInt = 0;
            currentTurn = 1;
            currentX = 7;
            currentY = 8;

            assign(indexes);
}

function potentialMoves() {
            const potentials = [[0, 0]];
            test = potentials;
            tempNewX = currentX + 2;
            tempNewY = currentY + 1;
            addElement(tempNewX, tempNewY);
            tempNewX = currentX + 2;
            tempNewY = currentY - 1;
            addElement(tempNewX, tempNewY);
            tempNewX = currentX + 1;
            tempNewY = currentY + 2;
            addElement(tempNewX, tempNewY);
            tempNewX = currentX + 1;
            tempNewY = currentY - 2;
            addElement(tempNewX, tempNewY);
            tempNewX = currentX - 1;
            tempNewY = currentY + 2;
            addElement(tempNewX, tempNewY);
            tempNewX = currentX - 1;
            tempNewY = currentY - 2;
            addElement(tempNewX, tempNewY);
            tempNewX = currentX - 2;
            tempNewY = currentY + 1;
            addElement(tempNewX, tempNewY);
            tempNewX = currentX - 2;
            tempNewY = currentY - 1;
            addElement(tempNewX, tempNewY);
            potentials.shift();
            return potentials;

            function addElement(x, y) {
                if (x > 0 && x <= 8 && y > 0 && y <= 8)
                    if (indexes[x - 1][y - 1] == 0) potentials.push([x, y]);
            }
}

// Chooses one pairs of potential options
function chooseOne(inputPot) {
            rnd = Math.round(Math.random() * (inputPot.length - 1));
            ret = inputPot[rnd];
            currentX = ret[0];
            currentY = ret[1];
            return ret;
}

function manual(tdX, tdY) {
            document.getElementById("aut").setAttribute("disabled", "disabled");
            pt = potentialMoves();
            if (pt.length == 0) {
                gameover();
            } else {
                for (j = 0; j < pt.length; j++) {
                    if (pt[j][0] == tdX && pt[j][1] == tdY) {
                        indexes[tdX - 1][tdY - 1] = ++currentTurn;
                        currentX = tdX;
                        currentY = tdY;
                    }
                }
            }
            assign(indexes);
}

function gameover() {
            w = document.getElementsByTagName('td');
            for (i = 0; i < w.length; i++) {
                w[i].removeAttribute("onclick");
            }
            document.getElementById("btn").setAttribute("disabled", "disabled");
            if (myInt > 0) clearInterval(myInt);
            console.log("Last turn was ", currentTurn);
}
