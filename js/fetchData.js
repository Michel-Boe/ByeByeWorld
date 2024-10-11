var memory = 0;

function getRandomCountry(){
    const randomCountry = document.getElementById("randomCountry");
    fetch("Data/country.json")
        .then(response => response.json())
        .then(data => {
            let randomNumber = getRandomNumber(data.length);
            randomCountry.innerHTML = data[randomNumber].name.common;
        })
        .then(data =>{             
            setupFlags();
        })
    .catch(error => console.log('error', error)) 
    var correct = document.getElementById("check"); 
    var correcter = document.getElementById("checkFlag");

    correct.innerHTML = "";
    correcter.innerHTML = "";

}

function getRandomNumber (maxLength){
    let min = 0;
    let max = maxLength;
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}

function checkIfCorrect(){

    // var counter = document.getElementById("inARow").innerText;
    const capitalGuess = document.getElementById("capitalGuess").value;
    const checkAnswer = document.getElementById("check");
    const countryToCheck = document.getElementById("randomCountry").innerText;

    getAnythingWithCountry(countryToCheck,"capital").then(capital => {
        if (capitalGuess.toLowerCase() == capital.toLowerCase()) {
            checkAnswer.innerHTML = "correct";
            // counter ++;
            // document.getElementById("inARow").innerHTML = counter;

        }
        else{
            checkAnswer.innerHTML = `Wrong: The correct answer is: ${capital}`
            // counter = 0;
            // document.getElementById("inARow").innerHTML = counter;

        }
    });  
    // getRandomCountry();
}

async function getCapitalWithCountry(country){
    var capital;

    let response = fetch("Data/country.json");
    let data = await (await response).json();

    for (let i = 0; i <= data.length; i++){
        let countryOutput = data[i].name.common;
        if (country == countryOutput){
            capital = data[i].capital[0];
            break;
        }     
    }

    return capital;
}

async function getAnythingWithCountry(country, type){
    var specificAnswer;

    let response = fetch("Data/country.json");
    let data = await (await response).json();

    
    for (let i = 0; i <= data.length; i++){
        let countryOutput = data[i].name.common;
        if (country == countryOutput){
            if (type == "capital"){
                specificAnswer = data[i].capital[0];
                break;
            }
            if (type == "flag"){
                specificAnswer = data[i].flags.png;
                break
            }
            else{
                specificAnswer = data[i].borders;
                break
            }
        }     
    }

    return specificAnswer;
}


function setupFlags() {
    var flagIdArray = ["firstFlag","secondFlag","thirdFlag","fourthFlag"];
    var correctFlagIndex = getRandomNumber(3);
    memory = correctFlagIndex;
    
    var correctId = flagIdArray.splice(correctFlagIndex,1);

    getCorrectFlag(correctId);
    for (let i = 0; i <= 2; i++ ){
        getRandomFlag(flagIdArray[i]);
    };
}

function getCorrectFlag(id) {
    var flagURL = document.getElementById(id);
    const countryToCheck = document.getElementById("randomCountry").innerText;

    getAnythingWithCountry(countryToCheck,"flag").then(flag => {
        flagURL.src = flag;
    });  
}

function getRandomFlag(id){
    var flagURL = document.getElementById(id);
    fetch("Data/country.json")
        .then(response => response.json())
        .then(data => {
            let randomNumber = getRandomNumber(data.length);
            flagURL.src = data[randomNumber].flags.png;
        })
    .catch(error => console.log('error', error)) 
}


const firstFlag = document.getElementById('firstFlag');
const firstCheck = document.getElementById('firstCheck');
const secondFlag = document.getElementById('secondFlag');
const secondCheck = document.getElementById('secondCheck');
const thirdFlag = document.getElementById('thirdFlag');
const thirdCheck = document.getElementById('thirdCheck');
const fourthFlag = document.getElementById('fourthFlag');
const fourthCheck = document.getElementById('fourthCheck');

firstFlag.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent image form submission

    // Toggle the checkbox state
    firstCheck.checked = !firstCheck.checked;
});

secondFlag.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent image form submission

    // Toggle the checkbox state
    secondCheck.checked = !secondCheck.checked;
});

thirdFlag.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent image form submission

    // Toggle the checkbox state
    thirdCheck.checked = !thirdCheck.checked;
});

fourthFlag.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent image form submission

    // Toggle the checkbox state
    fourthCheck.checked = !fourthCheck.checked;
});

document.querySelectorAll('input[name="switch-two"]').forEach((radio) => {
    radio.addEventListener('change', displayRadioValue);
  });

function displayRadioValue()  {
    var ele = document.getElementsByName('switch-two');

    for (i=0; i < ele.length; i++) {
        if (ele[i].checked) {
            document.getElementById('Headline').innerHTML = `World by ${ele[i].value}`;
        }

    }
}

function checkIfFlagCorrect() {
    var flagIdArrayHelp = ["firstCheck","secondCheck","thirdCheck","fourthCheck"];
    var correctId = flagIdArrayHelp[memory];
    var correctFlag = document.getElementById(correctId);
    const checkFlagAnswer = document.getElementById("checkFlag");

    if (correctFlag.checked == true){
        checkFlagAnswer.innerHTML = "correct";
    }
    else {
        checkFlagAnswer.innerHTML = "incorrect";

    }


}