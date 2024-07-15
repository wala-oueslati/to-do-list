document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('input');
    const newTaskList = document.getElementById('new');
    const doingTaskList = document.getElementById('doing');
    const doneTaskList = document.getElementById('done');
    const highPriorityCheckbox = document.getElementById('high_priority');
    const mediumPriorityCheckbox = document.getElementById('medium_priority');
    const lowPriorityCheckbox = document.getElementById('low_priority');
    const highColorPicker = document.getElementById('high');
    const mediumColorPicker = document.getElementById('medium');
    const lowColorPicker = document.getElementById('low');
    const errorMessage = document.getElementById('error-message');
    const clearButton = document.getElementById('clear');
    const modeButton = document.getElementById('mode');

    let highPriorityColor = highColorPicker.value;
    let mediumPriorityColor = mediumColorPicker.value;
    let lowPriorityColor = lowColorPicker.value;

    highColorPicker.addEventListener('input', function() {
        highPriorityColor = highColorPicker.value;
        updateTaskColors('high', highPriorityColor);
        updateCheckboxColors();
    });

    mediumColorPicker.addEventListener('input', function() {
        mediumPriorityColor = mediumColorPicker.value;
        updateTaskColors('medium', mediumPriorityColor);
        updateCheckboxColors();
    });

    lowColorPicker.addEventListener('input', function() {
        lowPriorityColor = lowColorPicker.value;
        updateTaskColors('low', lowPriorityColor);
        updateCheckboxColors();
    });

    function updateTaskColors(priority, color) {
        const lists = [newTaskList, doingTaskList, doneTaskList];
        lists.forEach(list => {
            list.querySelectorAll('li').forEach(task => {
                if (task.dataset.priority === priority) {
                    task.style.backgroundColor = color;
                    task.style.color = (color === '#FFFFFF' || color.toLowerCase() === 'white') ? 'black' : 'white';
                }
            });
        });
    }

    function addTask(taskText, priority, priorityColor) {
        const taskItem = document.createElement('li');
        const taskId = 'checkbox-' + Math.random().toString(36).substr(2, 9); 
        taskItem.innerHTML = `
            <input class="checkbox" type="checkbox" id="${taskId}">
            <label for="${taskId}"></label>
            ${taskText}
            <i>X</i>
        `;
        taskItem.style.backgroundColor = priorityColor;
        taskItem.style.color = (priorityColor === '#FFFFFF' || priorityColor.toLowerCase() === 'white') ? 'black' : 'white';
        taskItem.dataset.priority = priority;
        newTaskList.appendChild(taskItem);

        attachTaskEvents(taskItem);
    }

    function attachTaskEvents(taskItem) {
        const checkbox = taskItem.querySelector('.checkbox');
        checkbox.addEventListener('change', function() {
            if (checkbox.checked) {
                if (taskItem.parentNode === newTaskList) {
                    doingTaskList.appendChild(taskItem);
                } else if (taskItem.parentNode === doingTaskList) {
                    doneTaskList.appendChild(taskItem);
                }
            }
        });
    
        const deleteIcon = taskItem.querySelector('i');
        deleteIcon.addEventListener('click', function(event) {
            event.stopPropagation();
            const taskItem = deleteIcon.parentElement;
            if (taskItem.parentNode !== doneTaskList) {
                doneTaskList.appendChild(taskItem);
            } else {
                taskItem.remove();
            }
        });
    }
    

    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const taskText = input.value.trim();
            if (taskText) {
                let priority = '';
                let priorityColor = '#FFFFFF'; 
                if (highPriorityCheckbox.checked) {
                    priority = 'high';
                    priorityColor = highPriorityColor;
                } else if (mediumPriorityCheckbox.checked) {
                    priority = 'medium';
                    priorityColor = mediumPriorityColor;
                } else if (lowPriorityCheckbox.checked) {
                    priority = 'low';
                    priorityColor = lowPriorityColor;
                }

                if (priority) {
                    addTask(taskText, priority, priorityColor);
                    input.value = '';
                    errorMessage.style.display = 'none';
                } else {
                    errorMessage.textContent = 'Please select a priority level.';
                    errorMessage.style.display = 'block';
                }
            } else {
                errorMessage.textContent = 'Task description cannot be empty.';
                errorMessage.style.display = 'block';
            }
        }
    });

    clearButton.addEventListener('click', function() {
        while (doneTaskList.firstChild) {
            doneTaskList.removeChild(doneTaskList.firstChild);
        }
    });

    modeButton.addEventListener('click', function() {
        toggleModes();
    });

    highPriorityCheckbox.addEventListener('change', function() {
        if (this.checked) {
            mediumPriorityCheckbox.checked = false;
            lowPriorityCheckbox.checked = false;
        }
    });

    mediumPriorityCheckbox.addEventListener('change', function() {
        if (this.checked) {
            highPriorityCheckbox.checked = false;
            lowPriorityCheckbox.checked = false;
        }
    });

    lowPriorityCheckbox.addEventListener('change', function() {
        if (this.checked) {
            highPriorityCheckbox.checked = false;
            mediumPriorityCheckbox.checked = false;
        }
    });

    updateCheckboxColors();

    function updateCheckboxColors() {
        highPriorityCheckbox.style.accentColor = highPriorityColor;
        mediumPriorityCheckbox.style.accentColor = mediumPriorityColor;
        lowPriorityCheckbox.style.accentColor = lowPriorityColor;
    }

    function toggleModes() {
        const body = document.body;
        if (body.classList.contains('pinkMode')) {
            body.classList.remove('pinkMode');
            body.classList.add('greenMode');
        } else if (body.classList.contains('greenMode')) {
            body.classList.remove('greenMode');
        } else {
            body.classList.add('pinkMode');
        }
    }
});
