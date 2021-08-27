// ==UserScript==
// @name         Hängagubbe hack
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  I'M TAKING OVER THE WORLD!
// @author       You
// @match        https://www.elevspel.se/amnen/svenska/hanga-gubbe.html
// @match        https://www.helpfulgames.com/subjects/english/hangman.html
// @icon         https://www.google.com/s2/favicons?domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let enterLevel = setTimeout(() => {
        let done = document.getElementsByClassName("done");
        for (let i = 0; i < done.length; i++) {
            let btn = done[i];
            let kids = btn.children[1].children;
            for (let j = 0; j < kids.length; j++) {
                let classes = kids[j].className.split(" ");
                if (classes[classes.length - 1] == "noShowMedal") {
                    var clickBtn = true;
                }
            }
            if (clickBtn != undefined && clickBtn) {
                btn.click();
            }
        }
        let undone = document.getElementsByClassName("undone")[0];
        if (undone != undefined) {
            undone.click();
        } else {
            // Wait 1 second
            let startWait = setInterval(() => {
                // Get all of the squares
                let squares = document.getElementsByClassName("square");
                // Get all of the buttons
                let buttons = document.getElementsByClassName("newLetter");
                // Loop through all of the squares
                if (squares.length != 0) {
                    for (let i = 0; i < squares.length; i++) {
                        // Make a unicode from the squares classname
                        let character = squares[i].className.split(" ")[0];
                        let unicode = character.substring(5, character.length);
                        // Make the unicode a letter
                        let letter = String.fromCharCode(unicode);
                        // Loop through all of the buttons
                        for (let j = 0; j < buttons.length; j++) {
                            // If the buttons textContent is the same as the current letter and we haven't clicked the button
                            if (buttons[j].textContent === letter && buttons[j].disabled != "disabled") {
                                // Wait 50 milliseconds
                                setTimeout(() => {
                                    // And click
                                    buttons[j].click();
                                }, i * 25);
                            }
                        }
                    }
                }
                // Get the big button
                let bigBtn = document.getElementsByClassName("bigBtn")[0];
                // Wait until we've finished our game
                let finishedGame = setInterval(() => {
                    // If there is a bigBtn
                    if (bigBtn != undefined) {
                        // A boolean if we've completed the level
                        var completedLevel = bigBtn.className.split(" ")[1] == "grayBtn";
                        // Click it
                        bigBtn.click();
                    }
                    if (completedLevel != undefined) {
                        // If we've completed the level
                        if (completedLevel) {
                            // Get the goagain button
                            let btnGoagain = document.getElementsByClassName("btnGoagain")[0];
                            // If there's a goagain button
                            if (btnGoagain != undefined) {
                                // Then click it
                                btnGoagain.click();
                            }
                        }
                    }
                    // Clear the timeout
                    clearInterval(finishedGame);
                }, 25);
                // Clear the timeout
                clearInterval(startWait)
            }, 25);
        }
        clearInterval(enterLevel);
    }, 25);
})();