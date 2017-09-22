var cells = ["topLft", "topMid", "topRgt", "midLft", "midMid", "midRgt", "botLft", "botMid", "botRgt"];     //array of cells' ids in tictactoe board
var tictactoe = ["", "", "", "", "", "", "", "", ""];       //empty array to hold X's and O's as the cells are clicked
var maxcell = cells.length;
var tictac = ["X", "O"];
var x = 0;      //loop tracker
var index;      //to hold index of cell's id from cells array
var gameNum = 0;        //denotes the number of games played
var current;      //to hold the div holding the board
var clicks = 0;     //number of clicks per game
var notify;

$(function() {
    current = document.getElementById("game" + gameNum);        //gets the div holding the current board
    
    //changes the cell's background color to yellow when the mouse hovers over it
    $("td").mouseenter(
        function() {
            var active;
            active = $(this).parent().parent().parent().parent();     //gets div of cell

            if(current && active) {
                if ($(active).attr("id") === $(current).attr("id")) {       //determines if mouse is hovering over active board
                    $(this).css("background-color", "#FFFFCC");
                }
            }
        }
    );
    
    //changes the cell's background color back to white when the mouse moves away from it
    $("td").mouseleave(
        function() {
            var active;
            active = $(this).parent().parent().parent().parent();     //gets div of cell

            if(current && active) {
                if ($(active).attr("id") === $(current).attr("id")) {       //detemines is mouse is moving away from active board
                    $(this).css("background-color", "#FFFFFF");
                }
            }
        }
    );
});

$(function() {
    current = document.getElementById("game" + gameNum);        //gets the div holding the current board
    
    //determines whether an X or an O should be entered when cell is clicked.
    $("td").click(
        function() {
            var active, activepar, cellval, clicked, index, i, cell, cellstart;
            active = $(this).parent().parent().parent().parent();     //gets div of cell
            activepar = "#game" + gameNum + " p";
            cellval = $(this).text();      //gets the value in the cell clicked
            clicked = $(this).attr("class");      //gets and holds the class(es) of the cell clicked
            
            if (clicked) {
                //finds a section of the class string that matches one of the values within the cells array
                for (i = 0; i < maxcell; i++) {
                    cellstart = clicked.indexOf(cells[i]);
                    if (cellstart !== (-1)) {
                        cell = clicked.substring(cellstart);
                    }
                }
                index = cells.indexOf(cell);     //find the index of the class in the cells array
            }
            
            //determines if cell clicked is in active board
            if (current && active && activepar && clicked) {
                if ($(active).attr("id") === $(current).attr("id")) {
                    //enters an X in the cell if the cell is empty, as long as it's the first click or the last click was an O and the game isn't finished
                    //changes text above board to let players know whose turn it's supposed to be
                    //adds an X to the empty array to help determine who will win
                    if (cellval === "" && x === 0) {
                        $(this).append(tictac[0]);
                        x++;
                        clicks++;
                        $(activepar).empty();
                        $(activepar).append("Player Two's turn!");
                        tictactoe[index] = tictac[0];
                        winning("Player One won!");
                    }
                    //enters an O in the cell if the cell is empty, as long as the last click was an X and the game isn't finished
                    //changes text above board to let players know whose turn it's supposed to be
                    //adds an O to the empty array to help determine who will win
                    else if (cellval === "" && x === 1) {
                        $(this).append(tictac[1]);
                        x--;
                        clicks++;
                        $(activepar).empty();
                        $(activepar).append("Player One's turn!");
                        tictactoe[index] = tictac[1];
                        winning("Player Two won!");
                    }
                }
                if (clicks === 9) {     //game is a draw and there is no winner
                    notify = document.getElementById("draw");
                    $(notify).css("visibility", "visible");
                    newGame("Draw Game");
                }
            }
        }
    )
});

//determines if game is won and which player won
function winning (winner) {
    if (winner) {
        if (tictactoe[0] === tictactoe[1] && tictactoe[1] === tictactoe[2] && tictactoe[0] !== "" ||        //top row matches and isn't blank
            tictactoe[0] === tictactoe[3] && tictactoe[3] === tictactoe[6] && tictactoe[0] !== "" ||        //left column matches and isn't blank
            tictactoe[0] === tictactoe[4] && tictactoe[4] === tictactoe[8] && tictactoe[0] !== "" ||        //diagonal top-left to bottom-right matches and isn't blank
            tictactoe[1] === tictactoe[4] && tictactoe[4] === tictactoe[7] && tictactoe[1] !== "" ||        //middle column matches and isn't blank
            tictactoe[2] === tictactoe[5] && tictactoe[5] === tictactoe[8] && tictactoe[2] !== "" ||        //right column matches and isn't blank
            tictactoe[2] === tictactoe[4] && tictactoe[4] === tictactoe[6] && tictactoe[2] !== "" ||        //diagonal top-right to bottom-left matches and isn't blank
            tictactoe[3] === tictactoe[4] && tictactoe[4] === tictactoe[5] && tictactoe[3] !== "" ||        //middle row matches and isn't blank
            tictactoe[6] === tictactoe[7] && tictactoe[7] === tictactoe[8] && tictactoe[6] !== "") {        //bottom row matches and isn't blank
            if(winner == "Player One won!") {
                notify = document.getElementById("one");
                $(notify).css("visibility", "visible");
            }
            else if(winner == "Player Two won!") {
                notify = document.getElementById("two");
                $(notify).css("visibility", "visible");
            }
            newGame(winner);
        }
    }
}


function newGame (finale) {
    var previous, prevpar, prevtd,      //variables related to the previously played board
        finished, finpar, fintable, fintd,      //variables related the just finished board
        next, nextpar, nexttd;      //variables related to the next board to be played
        
    previous = "#game" + (gameNum -1);
    if (previous) {
        prevpar = previous + " p";
        prevtd = previous + " td";
    }
    finished = "#game" + gameNum;
    next = "#game" + (gameNum + 1);
    if(finished) {
        finpar = finished + " p";
        fintable = finished + " table";
        fintd = finished + " td";
    }
    if (next) {
        nextpar = next + " p";
        nexttd = next + " td";
    }
    
    if (finale && prevpar && finpar && fintd && nextpar && nexttd) {
        x = 0;
        $(prevpar).empty();
        $(prevpar).append("<br />");
        $(prevtd).empty();
        $(previous).attr({class: "next board",
                         id: "game" + (gameNum + 2)});
        $(finpar).empty();
        $(finpar).append(finale);
        $(fintd).css("background-color", "#CCCCCC");
        $(fintable).css({border: "1px solid #000000"});
        $(finished).attr("class", "done board");
        $(finished).css({opacity: "100"});
        $(nextpar).empty();
        $(nextpar).append("Player One's turn!");
        $(nexttd).css("background-color", "#FFFFFF");
        $(next).attr("class", "current board");
        gameNum++;
        current = document.getElementById("game" + gameNum);
        emptyboard();
        clicks = 0;
    }
}

//resets game - clears board and array of X's and O's and changes text above board
$(function() {
    $("#clear").click(
        function() {
            var activepar = $(".current p");        //paragraph from current board
            var activetd = $(".current td");        //cell from current board
            x = 0;
            
            activepar.empty();
            activepar.append("Player One's turn!");
            activetd.empty();
            emptyboard();
            clicks = 0;
        }
    )
});

function emptyboard () {
    var i;
    
    for (var i = 0; i < maxcell; i++) {
        tictactoe[i] = "";
    }
}

function clearNotify(num) {
     if(num == 1) {
         notify = document.getElementById("one");
     }
    else if (num == 2) {
        notify = document.getElementById("two");
    }
    else if (num == 3) { 
        notify = document.getElementById("draw");
    }
    $(notify).css("visibility", "hidden");
}