let taskArray=[]; //Array declared for my List, so that it can be stored.

//I point to my HTML-elements and store them as constants.  
const completedCount= document.querySelector("#completedCount");
const pendingCount= document.querySelector("#pendingCount"); 
const totalTasks= document.querySelector("#totalTasks");
const taskList=document.querySelector("#theList");
let completedTasksCount=0;


let inputValue=document.querySelector("#textInput");

function addTask(){
    addBtn.addEventListener("click", function(){
    const taskText=inputValue.value.trim();//If input is done with unneccesary tabs, the trim-method TRIMS the string.
        
        if (taskText===""){
            exception.style.display="block"; //A block with an error message
            return; //Getting out of the function
            
        } else{
            exception.style.display="none"; //Clearing the error message 
            }

        
        const li= document.createElement("li"); //Creating a li-element for the task
        li.classList.add("everySpecificTask"); //Making it a class for later styling
        li.textContent=taskText;//Placing both on the same place

        const deleteBtn=document.createElement("button");
        deleteBtn.textContent="🗑️";
        deleteBtn.classList.add("delete-btn");//adding a class for styling


        deleteBtn.addEventListener("click", function(){
            li.remove(); //Removing the task
            taskArray=taskArray.filter(task=>task.text !==taskText);/*Updating the taskArray that holds information in the form of objects.
            Every element has a string property to them. The filter method creates a new array based on a specific condition. 
            an Iteration process starts and the first array is basically compared to the new array. 
            If the function returns TRUE= the task is included in the array.
            If the function returns FALSE= the task will be deleted and the deleteBtn will do its work :-) */

            updateCounters();
         });

        li.appendChild(deleteBtn);//Deletebutton for every specific Task
        taskList.appendChild(li);

        const taskCount = taskList.children.length;
        li.style.marginLeft=`${taskCount * 20}px` //Increasing margin left and right for every new task
        li.style.marginRight=`${taskCount * 20}px` 
        taskArray.push({text:taskText,completed:false});

        //Adding a listener to this function and CSS styling to make it work
        li.addEventListener("click", function(){
            li.classList.toggle("completed") //Toggle makes it possible to switch between two different conditions. The listener gets the click and the "toggle" happens. 
            const taskIndex=taskArray.findIndex(task=>task.text===taskText);
            if (taskIndex!==-1){
                taskArray[taskIndex].completed=!taskArray[taskIndex].completed;
            }
            updateCounters();

        });

        taskArray.push({text:taskText, completed: false}); //Pushing the Tasks to my Array
        
        taskList.appendChild(li); //Putting the Task to the list
        inputValue.value=""; //Emptying the input
        updateCounters(); 
        
    });

}

function clearAll(){
clearBtn.addEventListener("click", function (){
    
    const confirmChoise=confirm("Do you want to delete everything?");
    if (confirmChoise){
        taskArray=[];
        taskList.innerHTML="";
        updateCounters();
    }
    
});    

}

function updateCounters(){
   
    completedTasksCount= taskArray.filter(task=>task.completed).length;//All completed tasks
    const totalTasksInList=taskArray.length;// The whole array with all the tasks
   

    completedCount.textContent=completedTasksCount;
    /*pendingCount.textContent=pendingTasks;
    totalTasks.textContent=totalTasksInList;*/
    //Instead of adding strings and variables to a "long string", I Choose to work with Tempelate Literals with `bakfnuttar`
    console.log(`completed: ${completedTasksCount}, Total: ${totalTasksInList}`);


}

function completedTasks(){
    completedTasks++;
    document.querySelector('.completedCount').textContent=completedTasks;
}


updateCounters();
addTask();
clearAll();

