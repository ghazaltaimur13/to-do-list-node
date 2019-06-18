var Login = require('../controllers/Login');
var ToDoList = require('../controllers/ToDoList');

module.exports = function (app) {
    app.post('/api/login', Login.checkUser);
    app.post('/api/addUser', Login.addUser);

    app.post('/api/addToDoList', ToDoList.addList);
    app.get('/api/getList', ToDoList.getList);
    app.post('/api/deleteItem', ToDoList.deleteItem);
}