// Your code here
document.addEventListener('DOMContentLoaded',main)

const topDiv = document.getElementById("character-bar")
function fetchNames (){
    return fetch("https://code-challenge-2-server.vercel.app/characters")
    .then((res)=> res.json())
    .then(theNames)
    
    .catch(error => console.error("Error fetching character names:", error))
}
function theNames(characters){
    characters.forEach(character => {
        const nameSpan = document.createElement("span")
        nameSpan.innerHTML = character.name
        topDiv.appendChild(nameSpan)

        nameSpan.addEventListener("click", ()=>HandleCharClick(character))
    });
}


const charInfo = document.getElementById("detailed-info")
function fetchDetails (){
    return fetch(`https://code-challenge-2-server.vercel.app/characters/${character.id}`)
    .then((res)=>res.json())
    .then(HandleCharClick)
    .catch(error => console.error("Error fetching character details:", error))
}
function HandleCharClick(character){
console.log('character clicked')
 const charName = document.getElementById("name")
 console.log('charName defined')
 charName.innerHTML = character.name

 const charImg = document.querySelector("#detailed-info img")
 charImg.src = character.image
 charImg.alt = character.name
 
 const charVotes = document.getElementById("vote-count")
 charVotes.textContent = character.votes
}
console.log("happy")

function addSubmitListener(){
    const form = document.getElementById("votes-form")
    form.addEventListener("submit", handleFormSubmission)
}

function handleFormSubmission(event){
    event.preventDefault();

    const inputedVotes = document.getElementById("votes")
    const charVotes = document.getElementById("vote-count")

    votesToAdd = parseInt(inputedVotes.value,10)
    if (isNaN(votesToAdd) || votesToAdd < 0) {
        alert("Please enter a valid number");
        return;}

    const currentVotes = parseInt(charVotes.textContent,10)
    let updatedVotes = currentVotes + votesToAdd
    charVotes.textContent = updatedVotes
    console.log("votes tallied")


    inputedVotes.value= ""
}

function resetListener(){
    const resetBtn = document.getElementById("reset-btn")
    resetBtn.addEventListener("click",resetVotes)

    function resetVotes(){
        let charVotes = document.getElementById("vote-count")
        charVotes.textContent = 0
        console.log("votes has been reset")
    }
}

function addCharSubmitListener(){
    const addCharForm = document.getElementById("character-form")
    addCharForm.addEventListener("submit",handleAddingChar)
    console.log("new char details have been submitted")
}
function handleAddingChar(event){
    event.preventDefault()
    
    const newCharName = document.querySelector("#character-form input[name='name']").value
    const newCharImage = document.getElementById("image-url").value
    console.log("User Input - Name:", newCharName);
    console.log("User Input - Image URL:", newCharImage);

    if (!newCharName || !newCharImage) {
        alert("Please enter both a name and an image URL.");
        return;}

        addNewChar(newCharName, newCharImage); 
        event.target.reset()
        console.log("the newChar details have been added ✅")
}

function addNewChar(newCharName, newCharImage){
    const newChar ={
        name : newCharName,
        image : newCharImage,
        votes : 0
    }
    fetch (`https://code-challenge-2-server.vercel.app/characters`,{
        method:"POST",
        headers : {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newChar)
    })
    .then(res=>res.json())
    .then(newChar=>{
    const nameSpan = document.createElement("span")
    nameSpan.textContent = newChar.name
    nameSpan.addEventListener("click", () =>HandleCharClick(newChar))
    topDiv.appendChild(nameSpan)
        
    HandleCharClick(newChar)
    })
    .catch(err=>console.log(err))
    
}


function main (){
    fetchNames()
    addSubmitListener()
    resetListener()
    addCharSubmitListener()
}

