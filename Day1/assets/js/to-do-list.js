function addTodo() {
    $("#todoOrderedList").append($("<li></il>").attr({
        "class": "to-do-list-item",
        "id": $("#things_todo_input").val(),
    }).text($("#things_todo_input").val()));
    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "delete-button");
    deleteButton.setAttribute("id", "db" + $("#things_todo_input").val());
    deleteButton.innerText = "delete";
    let finishButton = document.createElement("button");
    finishButton.setAttribute("class", "finish-button");
    finishButton.setAttribute("id", "fb" + $("#things_todo_input").val());
    finishButton.innerText = "finish";
    document.getElementById($("#things_todo_input").val()).appendChild(deleteButton)
    document.getElementById($("#things_todo_input").val()).appendChild(finishButton)
};

function addFinish(val) {
    $("#finishOrderedList").append($("<li></il>").attr({
        "class": "finish-list-item",
        "id": "finished" + val,
    }).text(val));
    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "delete-button");
    deleteButton.setAttribute("id", "fdb" + $("#things_todo_input").val());
    deleteButton.innerText = "delete";
    document.getElementById("finished" + val).appendChild(deleteButton)
};

$("#things_todo_add_button").on("click", function() {
    addTodo()
});

$("#todoOrderedList").on("click", ".delete-button", function(evt) {
    let currentItemID = evt.currentTarget.id.substring(2);
    $("#" + currentItemID).remove();
});

$("#todoOrderedList").on("click", ".finish-button", function(evt) {
    let currentItemID = evt.currentTarget.id.substring(2);
    addFinish($("#" + currentItemID).text().substring(0, currentItemID.length));
    $("#" + currentItemID).remove();
});

$("#finishOrderedList").on("click", ".delete-button", function(evt) {
    let currentItemID = evt.currentTarget.id.substring(3);
    $("#finished" + currentItemID).remove();
});