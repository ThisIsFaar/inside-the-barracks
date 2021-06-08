var isFlipped = false;
var firstCard;
var secondCard;
var pair = 0;

//selecting card 
const cards = document.querySelectorAll(".card")
cards.forEach( (card) => card.addEventListener( 'click', flip) )

//function for flipping the card
function flip() {
    this.classList.add("flip")
    document.getElementById("flip_sound").play()
    if ( !isFlipped ) {
        isFlipped  = true;
        firstCard = this;
    } else {
        secondCard = this;
        checkIt()
    }
}

function checkIt() {
    if (firstCard.dataset.image === secondCard.dataset.image ) {
        success()
    } else {
        fail()
    }
}

//function for right cards pair found
function success() {

    //removing flip fx from pair founded cards
    firstCard.removeEventListener( "click", flip )
    secondCard.removeEventListener( "click", flip )

    //playing found pair sound
    document.getElementById("pair_found").play()
    
    //displaying found pair result gif for 3 seconds
    document.getElementById("img_reaction").setAttribute("src", "img/pair_found.gif")
    document.getElementById("card_result_div").style.display = "block"
    setTimeout(() => {
        document.getElementById("card_result_div").style.display = "none"
    }, 3000);

    //counting pair number value
    pair++;

    //increasing and adding founded troops to progress bar
    document.getElementById("progress_bar").style.width = `${pair*12.5}%`
    document.querySelector(`.troops_bar_${pair}`).setAttribute("src", `img/${firstCard.dataset.image}.png`)

    //When all troops found. 
    if (pair ===8) {

        //displaying won modal in 3 seconds
        setTimeout(() => {

            var modal = document.getElementById("myModal");
            modal.style.display = "block";
            
            //remove bg sound and playing won sound
            document.getElementById("bgm").remove()
            document.getElementById("won").play()
            
            // When the user clicks anywhere outside of the moda? close it!
            window.onclick = function(event) {
                if (event.target == modal) {
                modal.style.display = "none";
                window.location.reload()
                }
            }

            // adding onclick fx on play again button
            document.getElementById('restart_button').addEventListener('click', (e) => {
                document.getElementById('myModal').style.display = "none";
                window.location.reload();
            });
        },3000)
    }
    reset()
}

//function for wrong card pair found
function fail() {
    
    //playing wrong pair sound
    document.getElementById("wrong_pair").play();

    //displaying wrong pair result gif for 3 seconds
    document.getElementById("img_reaction").setAttribute("src", "img/wrong_pair.gif")
    document.getElementById("card_result_div").style.display = "block"
    setTimeout(() => {
        document.getElementById("card_result_div").style.display = "none"
    }, 3000);

    //flipping card back to normal again in 1 seconds
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        reset();
    }, 1000);
}

//reseting value of flipped cards
function reset() {
    isFlipped = false;
    firstCard = null;
    secondCard = null;
}

//shuffling card autocall fx on page load
(function suffle() {
    cards.forEach( card => {
        var index = Math.floor(Math.random() * 16)
        card.style.order = index;
    } )
})();