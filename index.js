"use strict";

(function() {
    const output = document.getElementById("output");

    const address = "http://localhost:8081";

    async function getDucks() {
        try {
            output.innerHTML = "";
            const res = await axios.get(`${address}/duck/getAll`);
            res.data.forEach(duck => renderDuck(duck));
        } catch (e) {
            console.error(e);
        }
    }

    function renderDuck({name, age, colour, habitat, id}) {
        const duck = document.createElement("div");
        duck.classList.add("col");
        const duckCard = document.createElement("div");
        duckCard.classList.add("card");

        const duckBody = document.createElement("div");
        duckBody.classList.add("card-body");
        const duckName = document.createElement("p");
        duckName.innerText = `Name: ${name}`;
        duckName.classList.add("card-text");
        duckBody.appendChild(duckName);

        const duckAge = document.createElement("p");
        duckAge.innerText = `Age: ${age}`;
        duckAge.classList.add("card-text");
        duckBody.appendChild(duckAge);

        const duckColour = document.createElement("p");
        duckColour.innerText = `Colour: ${colour}`;
        duckColour.classList.add("card-text");
        duckBody.appendChild(duckColour);

        const duckHabitat = document.createElement("p");
        duckHabitat.innerText = `Habitat: ${habitat}`;
        duckHabitat.classList.add("card-text");
        duckBody.appendChild(duckHabitat);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = 'DELETE';
        deleteBtn.classList.add("btn", "btn-danger");
        deleteBtn.addEventListener('click', () => deleteDuck(id));
        duckBody.appendChild(deleteBtn);
        duckCard.appendChild(duckBody);
        duck.appendChild(duckCard);

        output.appendChild(duck);
    }

    async function deleteDuck(id) {
        const res = await axios.delete(`${address}/duck/deleteDuck/${id}`);
        getDucks();
    }

    document.getElementById("duckForm").addEventListener("submit", async function(e) {
        e.preventDefault();
        const {dName, age, colour, habitat} = this;
        
        const newDuck = {
            name: dName.value,
            age: age.value,
            colour: colour.value,
            habitat: habitat.value
        }
        this.reset();
        dName.focus();
        try {
            const res = await axios.post(`${address}/duck/createDuck`, newDuck);
            getDucks();
        } catch(error) {
            console.error(error);
        }
    });

    getDucks();
    
})();