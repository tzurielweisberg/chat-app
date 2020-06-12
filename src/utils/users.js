const users =[];

const addUser = ({id, username, room}) => {
  //clean the data
  username = username.trim().toLowerCase()
  room = room.trim().toLowerCase()

  //validate the data
  if (!username || !room){
    return {
      error: 'Username and Room are required'
    }
  }

  //check for existing user
  const existingUser = users.find((user)=>{
    return user.room === room && user.username === username
  })

  //validate user name
  if (existingUser){
    return {
      error: 'Username is in use!'
    }
  }

  //run only when everythig is fine
  //store user
  const user = {id, username, room}
  users.push(user);
  return {
    user
  }
}


const removeUser = (id) => {
  const index = users.findIndex((user)=> user.id === id)
  if (index !== -1){
    return users.splice(index, 1)[0]
  }
}


const getUser = (id) => {
  return users.find((user)=>  user.id === id )
}

const getUsersInRoom = (room) => {
  room = room.trim().toLowerCase()
  return users.filter(user => user.room === room)
}

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
}

// addUser({
//   id: 22,
//   username: 'Tzur',
//   room: 'jerusalem'
// })

// addUser({
//   id: 32,
//   username: 'Tzuriel',
//   room: 'jerusalem'
// })

// addUser({
//   id: 33,
//   username: 'tzur',
//   room: 'jerus'
// })

// console.log(getUser(33));
// console.log(getUsersInRoom('jerusalem'));



// console.log(users);

// const removed = removeUser(22)
// console.log(removed);
// console.log(users);

