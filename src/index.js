// Your code here
document.addEventListener('DOMContentLoaded',main)

const topDiv = document.getElementById("character-bar")

function fetchNames (){
    return fetch("http://localhost:3000/characters")
    .then((res)=> res.json())
    .then(theNames)
}
function theNames(characters){
    characters.forEach(character => {
        const nameSpan = document.createElement("span")
        nameSpan.innerHTML = character.name
        topDiv.appendChild(nameSpan)
    });
}
function main (){
    fetchNames()
}