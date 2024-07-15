const express = require("express")
const { createServer } = require("http")
const { Server } = require("socket.io")
const path = require("path")
const employees = require("./dataModel/model.js")
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const { emit } = require("process")


const app = express();
const server = createServer(app);
const io = new Server(server)


app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "..", "views", "clientScripts")))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => 
    // res.sendFile("index.html", {root: path.join(__dirname, "..", "views")})
    res.render("index")
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

app.get("/employeeSearch", (req, res) => {
    console.log(req.query.employeeId)
    // res.sendFile("testing.html", {root: path.join(__dirname, "..", "views")})
    employees.search(req.query.employeeId, (err, data) => {
        if(err){console.log(err)}
        else{console.log("Employee: " + data.id + " is found")}
        // res.sendFile("testing.html", {root: path.join(__dirname, "..", "views")})
        res.render("testing", {
            employeeId: data.id,
            employeeGmail: data.email,
            employeeName: data.employee_name,
            employeeAge: data.age,
            employeeBirthDay: JSON.stringify(data.birthday)
        })
        console.log(JSON.stringify(data.birthday))
    })
    
    // next()
    
})

app.put("/employeeUpdate", (req, res) => {
    console.log("this is clicked - employeeUpdate")
    const employee = {
        id: req.body.employeeId,
        email: req.body.employeeGmail,
        employee_name: req.body.employeeName,
        age: req.body.employeeAge,
        birthday: req.body.employeeBirthDay
    }
    employees.update(employee, (err, data) => {
        if(err){
            console.log(err)
        }
        else{
            console.log(data)
        }
    })
       
    // res.send("Updated Successfuly")
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