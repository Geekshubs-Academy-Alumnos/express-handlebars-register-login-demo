const user = { id: 100, name: 'Howard Moon'}
const userWithPass = { ...user, password: 'Password!' }

user //=> { id: 100, name: 'Howard Moon' }
userWithPass //=> { id: 100, name: 'Howard Moon', password: 'Password!' }