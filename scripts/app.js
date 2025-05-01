
function sayHello(){
    console.log("hello world");
}

function init(){
    console.log("hello im the init function");
    sayHello();
}

window.onload=init;//this will run when the page 
//is loaded- when the html and the
//css is loaded and the logic will run


