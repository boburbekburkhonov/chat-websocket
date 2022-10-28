const socket = io()

const showModal = document.querySelector('.show-modal');
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');

function close() {
  overlay.classList.add("hidden");
  modal.classList.add("d-none");
}

let userName

btnName.disabled = true;

btnName.addEventListener("click", () => {
  const item = document.createElement('li')
  item.textContent = 'You joined'
  item.style.fontSize = '15px'
  item.style.color = '#343434'
  chatLists.appendChild(item)

  userName = input.value

  close()
  socket.emit('user-name', input.value)
});

input.addEventListener('keyup', () => {
  btnName.disabled = false;
})

socket.on('new-user-name', data => {
  const item = document.createElement('li')
  item.textContent = `${data} joined`
  item.style.fontSize = '15px'
  item.style.color = '#343434'
  chatLists.appendChild(item)
})

messageBtn.disabled = true

messageBtn.addEventListener('click', () => {
  const item = document.createElement('li')
  item.textContent = messageInput.value;
  chatListsMessage.appendChild(item)
  item.classList.add('chat-message-item')

  socket.emit('user-message', {userName, message: messageInput.value})

  messageInput.value = null
  messageBtn.disabled = true
})

socket.on('new-user-message', data => {
  const item = document.createElement('li')
  item.textContent = `${data.userName}: ${data.message}`;
  chatListsMessage.appendChild(item)
  item.classList.add('chat-message-item-friend')
  item.style.marginRight = 'auto'
})


messageInput.addEventListener('keyup', () => {
  messageBtn.disabled = false

  socket.emit('user-typing', userName)
})

const h4_typing = document.createElement('p')

socket.on('typing', name => {
  h4_typing.textContent = name  + ' typing...'
  typing.appendChild(h4_typing)

  setTimeout(() => {
    h4_typing.remove()
  }, 2000)
})