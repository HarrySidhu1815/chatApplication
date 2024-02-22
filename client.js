const socket = io('http://localhost:8000', { transports : ['websocket'] });

const messageInput = document.getElementById('message-input');
const messageConatiner = document.querySelector('.container');
const form = document.getElementById('send-message');

var audio = new Audio('../ting.mp3')

const append = (message, position)=>{
    const newMessage = document.createElement('div');
    newMessage.innerText = message;
    newMessage.classList.add('message');
    newMessage.classList.add(position);
    messageConatiner.append(newMessage);
    if(position == 'left'){
        audio.play();
    }
}

const userName = prompt('Enter your name to chat');

socket.emit('new-user-joined', userName);
socket.on('user-joined', userName =>{
    append(`${userName} joined the chat`, "right")
})
socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, "left");
})
socket.on('left', user =>{
    append(`${user} left the chat`, "left");
})

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    textMessage = messageInput.value;
    append(`You: ${textMessage}`, "right")
    messageInput.value = '';
    socket.emit('send', textMessage);
})