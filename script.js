let input = document.querySelector('#input');
let newlist = document.querySelector('#new');
let doinglist = document.querySelector('#doing');
let donelist = document.querySelector('#done');
let clearButton = document.querySelector('#clear');
let errorMessage = document.querySelector('#error-message');

input.addEventListener("keyup", function(event){
    if(event.key === "Enter"){
        if(this.value.trim() === "") {
            showError("Task is empty");
        } else {
            addItem(this.value);
            this.value = "";
            hideError();
        }
    }
});

let addItem = (input) => {
    let newItem = document.createElement("li");
    newItem.innerHTML = `<input class="checkbox" type="checkbox" id="checkbox"></input>
    <label for="checkbox"> </label>
    &#160&#160&#160
    ${input} 
    <i>X</i>`;
    attachItemEvents(newItem);
    newlist.appendChild(newItem);
};

let attachItemEvents = (item) => {
    const checkbox = item.querySelector('input[type="checkbox"]');
    checkbox.addEventListener("change", function(){
        if (this.checked && item.parentElement===newlist) {
            doinglist.appendChild(this.parentElement);
        }
    });

    const deleteIcon = item.querySelector("i");
    deleteIcon.addEventListener("click", function(event){
        event.stopPropagation();
        let taskItem = this.parentElement;
        if (taskItem.parentElement === newlist || taskItem.parentElement === doinglist) {
            donelist.appendChild(taskItem);
        } else if (taskItem.parentElement === donelist) {
            taskItem.remove();
        }
    });
};

clearButton.addEventListener("click", function(){
    donelist.innerHTML = '';
});

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

function hideError() {
    errorMessage.style.display = 'none';
}

function modeFunction() {
    document.body.classList.toggle('pinkMode');
}
