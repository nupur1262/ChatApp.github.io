const socket=io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
const head_el=document.querySelector(".heading");



const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}


//sending message
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';
})


//giving a prompt to enter the name of the user before joining the chat
const namep = prompt("Enter your name to join the chat");
//emitting the event to ad a new user
socket.emit('new-user-joined', namep)
head_el.append(document.createTextNode(`Hi ${namep} you are online!`));


//appending the name of the new user joined in the list and broadcasting it
socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'left')
})

//showing the message
socket.on('receive',data=>{
    append(`${data.name} : ${data.message}`,'left');
})

socket.on('left',name=>{
    append(`${name} left the chat` , 'left');
})