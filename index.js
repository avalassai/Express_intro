const { json } = require('express');
const express = require('express');
const app = express();

var todos = [];


app.use(express.json())

function getnextId(){
    return todos.length == 0? 1 : todos[todos.length - 1].id + 1;
}


app.get('/api/todos' ,function(req,res){

    // res.json('Get method is called Successfull');
    res.json(todos);

});

app.post('/api/todos' ,function(req,res){

      var todo = {...req.body, id : getnextId()};
      todos.push(todo);
      res.json(todo)
});

app.put('/api/todos/:id' ,function(req,res){
    var { id } = req.params;
    var updatedobj = req.body;
    var idx = todos.findIndex(todo => todo.id == id);
    if(idx != -1){
        todos[idx] = {...updatedobj, id : id};
        res.send({...updatedobj, id : id});
    }
    else{
        return json({msg: "todos dont exist"});
    } 

});
app.patch('/api/todos/:id' ,function(req,res){

    var { id }  = req.params;
    var updatedobj = req.body;
    var idx = todos.findIndex(todo => todo.id == id);
    console.log(id);
    console.log(idx);
    if(idx != -1){
        todos[idx] = {...todos[idx],...updatedobj,id:id};
        res.send({...todos[idx],...updatedobj,id:id});
    }
    else{
        return json[{msg:"Mentioned ID is not present"}];
    }

});
app.delete('/api/todos/:id' ,function(req,res){
    var { id } = req.params;
    todos = todos.filter(todo => todo.id != id);
    res.json(todos);

});
app.listen(3000,function(){

    console.log("Server started successfully!");

});