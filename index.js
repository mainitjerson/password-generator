const characters =["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

let passwordHolder = document.getElementById("firstStorage");
let secondPasswordHolder = document.getElementById("secondStorage");
let button  = document.querySelector("#generate")
let slide = document.querySelector('#slider');
let target = document.querySelector('#value');
let maxValue = 20;
let numberCheck = document.querySelector("#number");
let symbolCheck = document.querySelector("#symbols");


let rangeValue = function(){
    let newValue = slide.value;
    target.value = newValue;
}
slide.addEventListener("input", rangeValue);

let generate = function generateRandomLetters() { 
    let passwordGenerated = "";
    let newValue = slide.value;
    let passwordLength = parseInt(slide.value, 10)
    
    // Base characters (letters)
    let selectedCharacters = [];

    // Always include letters
    selectedCharacters = characters.filter(char => {
        return /^[A-Za-z]+$/.test(char); // Only letters
    });

    // Include numbers if the checkbox is checked
    if (numberCheck.checked) {
        selectedCharacters = selectedCharacters.concat(
            characters.filter(char => "0123456789".includes(char))
        );
    }

    // Include symbols if the checkbox is checked
    if (symbolCheck.checked) {
        selectedCharacters = selectedCharacters.concat(
            characters.filter(char => "~`!@#$%^&*()_-+=[]{},|:;<>./?".includes(char))
        );
    }

    for(let i = 0; i <  passwordLength; i++){ 
        let randomIndex = Math.floor(Math.random() * selectedCharacters.length );
        passwordGenerated += selectedCharacters[randomIndex];
    }
    
    if(!passwordHolder.value){
        passwordHolder.value = passwordGenerated;
    }else if(!secondPasswordHolder.value){
        secondPasswordHolder.value = passwordGenerated
    }else{
        passwordHolder.value = passwordGenerated;
        secondPasswordHolder.value = "";
    }   
}

const copyToClipboard = (element) => {
    element.select();
    document.execCommand('copy'); // Copy the selected text
}

// Highlight the password on click
const highlightPassword = (element) => {
    element.select();
    element.setSelectionRange(0, 99999); // For mobile devices
}

button.addEventListener("click", generate);
passwordHolder.addEventListener('click', () => {
    highlightPassword(passwordHolder);
    copyToClipboard(passwordHolder);
});
secondPasswordHolder.addEventListener('click', () => {
    highlightPassword(secondPasswordHolder);
    copyToClipboard(secondPasswordHolder);
});

const checkbox = document.getElementById("checkbox")
const container = document.querySelector(".container")
checkbox.addEventListener("change", () => {
    container.classList.toggle("dark-mode")
})