var Express = require("express");
var Mongoclient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");

var app = Express();
app.use(cors());

var CONNECTION_STRING = "mongodb+srv://chriswang429:WebDevFinal@cluster0.tmmrbd3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

var DATABASENAME = "ToDoAppDB";
var database;

app.listen(5038, ()=>{
    Mongoclient.connect(CONNECTION_STRING,(error,client)=>{
        database = client.db(DATABASENAME);
        console.log("Mongo DC Connection Successful");
    })
})

app.get('/api/todoapp/GetNotes',(request,response)=>{
    database.collection("ToDoAppCollection").find({}).toArray((error,result)=>{
        response.send(result);
    })
})

app.post('/api/todoapp/AddNotes',multer().none(),(request,response)=>{
    database.collection("ToDoAppCollection").count({}, function(error,numOfDocs){
        database.collection("ToDoAppCollection").insertOne({
            id:(numOfDocs+1).toString(),
            description:request.body.newNotes
        });
        response.json("Added Successfully");
    })
})

app.delete('/api/todoapp/DeleteNotes',(request,response)=>{
    database.collection("ToDoAppCollection").deleteOne({
        id:request.query.id
    });
    response.json("Delete Successfully");
})