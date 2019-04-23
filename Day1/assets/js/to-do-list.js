var counter = 0;

function addingZeros(num, n) {
    return (Array(n).join(0) + num).slice(-n);
}

function addTodo() {
    $("#todoOrderedList").append($("<li></il>").attr({
        "class": "to-do-list-item",
        "id": $("#things_todo_input").val() + addingZeros(counter,20),
    }).text($("#things_todo_input").val()));
    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "delete-button");
    deleteButton.setAttribute("id", "db" + $("#things_todo_input").val() + addingZeros(counter,20));
    deleteButton.innerText = "delete";
    let finishButton = document.createElement("button");
    finishButton.setAttribute("class", "finish-button");
    finishButton.setAttribute("id", "fb" + $("#things_todo_input").val() + addingZeros(counter,20));
    finishButton.innerText = "finish";
    document.getElementById($("#things_todo_input").val() + addingZeros(counter,20)).appendChild(deleteButton);
    document.getElementById($("#things_todo_input").val() + addingZeros(counter,20)).appendChild(finishButton);
    counter++;
};

function addFinish(val) {
    $("#finishOrderedList").append($("<li></il>").attr({
        "class": "finish-list-item",
        "id": "finished" + val + addingZeros(counter,20),
    }).text(val));
    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "delete-button-finish");
    deleteButton.setAttribute("id", "fdb" + val + addingZeros(counter,20));
    deleteButton.innerText = "delete";
    document.getElementById("finished" + val + addingZeros(counter,20)).appendChild(deleteButton)
    counter++;
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
    addFinish($("#" + currentItemID).text().substring(0, currentItemID.length - 20));
    $("#" + currentItemID).remove();
});

$("#finishOrderedList").on("click", ".delete-button-finish", function(evt) {
    let currentItemID = evt.currentTarget.id.substring(3);
    $("#finished" + currentItemID).remove();
});