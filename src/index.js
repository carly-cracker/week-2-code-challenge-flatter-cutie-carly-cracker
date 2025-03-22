// Your code here
document.addEventListener('DOMContentLoaded',main)

const topDiv = document.getElementById("character-bar")
let charactersData = []
function fetchNames (){
    return fetch("http://localhost:3000/characters")
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
    return fetch(`http://localhost:3000/characters/${character.id}`)
    .then((res)=>res.json())
    .then(HandleCharClick)
    .catch(error => console.error("Error fetching character details:", error))
}
function HandleCharClick(character){
console.log('next step')
 const charName = document.getElementById("name")
 console.log('best')
 charName.innerHTML = character.name

 const charImg = document.querySelector("#detailed-info img")
 charImg.src = character.image
 charImg.alt = character.name
 
 const charVotes = document.getElementById("vote-count")
 charVotes.textContent = character.votes
}
console.log("happy")

function main (){
    fetchNames()
}