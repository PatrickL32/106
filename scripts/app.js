function saveTask(){

    console.log("button clicked");

    //get values from form fields
    const title= $("#txtTitle").val();
    const description= $("#txtDescription").val();
    const color= $("#selColor").val();
    const date=$("#selDate").val();
    const status=$("#selStatus").val();
    const budget=$("#numBudget").val();
    //create a new task
    let taskInstance=new Task( title,description,color,date,status,budget);
    console.log(task);
    let taskObject = {
        title: $("#title").val(),
        description: $("#description").val(), // Correct spelling
        color: $("#colorPicker").val(),
        date: $("#date").val(),
        status: "New",
        budget: $("#budget").val()
    };
        $.ajax({
            type: "POST",
            url: "https://fsdiapi.azurewebsites.net/api/tasks/",
            data: JSON.stringify(taskInstance),
            contentType: "application/json",
            success: function(response) {
                console.log("Server Response:", response); // Log response from server
        
                // Ensure data exists before passing to displayTask
                let data;
                try {
                    data = typeof response === "string" ? JSON.parse(response) : response;
                    console.log("Parsed Data:", data); // confirm parsing success
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                    return;
                }
                if(Array.isArray(data)){
                    data.forEach(displayTask);//Loop through array if needed
                }else{
                    displayTask(data);
                }
                console.log("Data sent to displayTask:",data);//log final data
            },
            error: function (error) {
                console.error("AJAX Request Failed:", error);
                if (error.responseText) {
                    console.log("Error details:", error.responseText);
                }
            }
    });
    displayTask(task)
}
function loadtasks(){
    $.ajax({
        type: "GET",
        url: "https://fsdiapi.azurewebsites.net/api/tasks", // Correct API endpoint
        success: function(response) {
            console.log("Raw Response:", response); // Log before parsing
    
            let data;
            try {
                data = typeof response === "string" ? JSON.parse(response) : response;
                console.log("Parsed Data:", data); // Verify structure
            } catch (error) {
                console.error("Error parsing JSON:", error);
                return;
            }
    
            if (Array.isArray(data)) {
                data.forEach(displayTask); // Loop through array if needed
            } else {
                displayTask(data);
            }
    
            console.log("Data sent to displayTask:", data); // Log final data
        },
        error: function(error) {
            console.error("AJAX Request Failed:", error);
            if (error.responseText) {
                console.log("Error details:", error.responseText);
            }
        }
    });
}
function testRequest(){
    $.ajax({
        type:"GET",
        url:"https://fsdiapi.azurewebsites.net",
        success:function(response){console.log(response);},
        error:function(error) {console.log("Error",error);}
    });
}
function displayTask(task) {
    // Check if task and task.color are defined
    const borderColor = task?.color || '#000'; 
    const title = task?.title || 'Untitled';


    let syntax = `
        <div class="task-container" style="border-color:${borderColor}">
            <div class="task">
                <div class="task-information">
                    <h5>${task?.title || ''}</h5>
                    <p>${task?.description || ''}</p>
                </div>
                <div class="task-status">${task?.status || ''}</div>
                <div class="task-date-budget">
                    <span>${task?.date || ''}</span>
                    <span>${task?.budget || ''}</span>
                </div>
            </div>
        </div>
    `;

    let newElement = $(syntax); // Ensure jQuery object creation
    $("#list").append(newElement);
}
function init(){

    //load data
    
    // hook events
$("#btnSave").click( saveTask);
}

window.onload=init;
//
