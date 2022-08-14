const socket = io();


document.addEventListener('DOMContentLoaded', () => {
    const chat = document.getElementById('chat');
    const message = document.getElementById('message');
    const sendBtn = document.getElementById('send');

    socket.on('message', message => {
        chat.innerHTML += message + '<br>';
    });

    sendBtn.addEventListener('click', (e) => {
        e.preventDefault();
        socket.emit('message', 'Anonymous > ' + message.value);
        message.value = '';
    });

})
