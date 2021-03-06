// create an object to store a data
var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
    todo: [],
    completed: []
};




// Remove and complete icons svg format
var removeSVG = '<svg class="fill" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="22px" height="22px" viewBox="0 0 774.266 774.266" style="enable-background:new 0 0 774.266 774.266;" xml:space="preserve"><g><g><path class="fill" d="M640.35,91.169H536.971V23.991C536.971,10.469,526.064,0,512.543,0c-1.312,0-2.187,0.438-2.614,0.875C509.491,0.438,508.616,0,508.179,0H265.212h-1.74h-1.75c-13.521,0-23.99,10.469-23.99,23.991v67.179H133.916c-29.667,0-52.783,23.116-52.783,52.783v38.387v47.981h45.803v491.6c0,29.668,22.679,52.346,52.346,52.346h415.703c29.667,0,52.782-22.678,52.782-52.346v-491.6h45.366v-47.981v-38.387C693.133,114.286,670.008,91.169,640.35,91.169z M285.713,47.981h202.84v43.188h-202.84V47.981z M599.349,721.922c0,3.061-1.312,4.363-4.364,4.363H179.282c-3.052,0-4.364-1.303-4.364-4.363V230.32h424.431V721.922z M644.715,182.339H129.551v-38.387c0-3.053,1.312-4.802,4.364-4.802H640.35c3.053,0,4.365,1.749,4.365,4.802V182.339z"/><rect x="475.031" y="286.593" width="48.418" height="396.942"/><rect x="363.361" y="286.593" width="48.418" height="396.942"/><rect x="251.69" y="286.593" width="48.418" height="396.942"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>' +
    '                    ';
var completeSVG = '<svg class="svg-icon" viewBox="0 0 20 20">\n' +
    '                                             \t\t\t\t\t\t\t<path d="M10.219,1.688c-4.471,0-8.094,3.623-8.094,8.094s3.623,8.094,8.094,8.094s8.094-3.623,8.094-8.094S14.689,1.688,10.219,1.688 M10.219,17.022c-3.994,0-7.242-3.247-7.242-7.241c0-3.994,3.248-7.242,7.242-7.242c3.994,0,7.241,3.248,7.241,7.242C17.46,13.775,14.213,17.022,10.219,17.022 M15.099,7.03c-0.167-0.167-0.438-0.167-0.604,0.002L9.062,12.48l-2.269-2.277c-0.166-0.167-0.437-0.167-0.603,0c-0.166,0.166-0.168,0.437-0.002,0.603l2.573,2.578c0.079,0.08,0.188,0.125,0.3,0.125s0.222-0.045,0.303-0.125l5.736-5.751C15.268,7.466,15.265,7.196,15.099,7.03"></path>\n' +
    '                                             \t\t\t\t\t\t</svg>';


renderTodoList();

// when we click "add" button , we want to grab the input field

// User clicked on the add button
// If there is any text inside the item field, add that text to the todo list
    

document.getElementById('add').addEventListener('click', function () {
    var value = document.getElementById('item').value;
    if (value) {
        addItem(value);


    }

});

document.getElementById('item').addEventListener('keydown', function (e) {
    var value = this.value;
    if (e.code === 'Enter' && value) {
    addItem(value);
    }

});

function addItem(value) {
    addItemToDOM(value);
    document.getElementById('item').value = '';

    data.todo.push(value);
    dataObjectUpdated();

}

function renderTodoList() {
    if (data.todo.length && !data.completed.length) return;

    for (var i=0; i < data.todo.length; i++) {
        var value= data.todo[i];
        addItemToDOM(value);
    }

    for (var j = 0; j < data.completed.length; j++) {
        var value = data.completed[i];
        addItemToDOM(value, true);
    }
}

function dataObjectUpdated() {
    localStorage.setItem('todoList', JSON.stringify(data))
}

function removeItem() {
    // grab the list item
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerText;

    if (id === 'todo') {
        data.todo.splice(data.todo.indexOf(value), 1);

    } else {
        data.completed.splice(data.todo.indexOf(value), 1);

    }

    dataObjectUpdated();


    parent.removeChild(item);
}

function completeItem() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerText;

    if (id === 'todo') {
        data.todo.splice(data.todo.indexOf(value), 1);
        data.completed.push(value);
    } else {
        data.completed.splice(data.todo.indexOf(value), 1);
        data.todo.push(value);
    }
    dataObjectUpdated();





    // Check if the item shoul be added to
    var target = (id === 'todo') ? document.getElementById('completed'):document.getElementById('todo');

    // if (id === 'todo') {
    //     // It's a todo item to be completed
    //     target = document.getElementById('completed');
    // } else {
    //     // It's completed item to be "re-done"
    //     target = document.getElementById('todo');
    // }

    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);
}
// Add a new item to the todo list
function addItemToDOM(text, completed) {
    var list = (completed) ? document.getElementById('completed'): document.getElementById('todo');
    var item = document.createElement('li');
    item.innerHTML = text;

    var buttons = document.createElement('div');
    buttons.classList.add('buttons');

    var remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = removeSVG;

    // Add click event for remove an item
        remove.addEventListener('click', removeItem);

    var complete = document.createElement('button');
    complete.classList.add('complete');
    complete.innerHTML = completeSVG;



    // Add click event for completing the item
    complete.addEventListener('click', completeItem);

    buttons.appendChild(remove);
    buttons.appendChild(complete);
    item.appendChild(buttons);

    list.insertBefore(item, list.childNodes[0]);
}