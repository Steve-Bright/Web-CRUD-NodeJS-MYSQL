const express = require("express")
const { createServer } = require("http")
const { Server } = require("socket.io")
const path = require("path")
const employees = require("./dataModel/model.js")
const bodyParser = require("body-parser");
const methodOverride = require("method-override");


const app = express();
const server = createServer(app);
const io = new Server(server)



app.use(express.static(path.join(__dirname, "..", "views", "clientScripts")))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => 
    res.sendFile("index.html", {root: path.join(__dirname, "..", "views")})
)

app.post("/formSubmission", (req, res, next) => {
    console.log(req.body.employeeId)
    const employee = {
        id: req.body.employeeId,
        email: req.body.employeeGmail,
        employee_name: req.body.employeeName,
        age: req.body.employeeAge,
        birthday: req.body.employeeBirthDay
    }
    employees.create(employee, (err, data) => {
        if(err){console.log(err)}
        else{console.log("new employee created: " + data)}
    })
    next()
})

app.delete("/employeeDeletion", (req, res, next) => {
    // console.log("Delete method triggered")
    employees.delete(req.body.employeeId, (err, data) => {
        if(err){console.log(err)}
        else{console.log("Employee id: " + data + "is deleted")}
    })
    res.send("Deleted Successfully")
    next()
})

server.listen(3000);