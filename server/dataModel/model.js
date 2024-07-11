const mysql = require("../databaseConnection/db.connection.js")


const Employee = function(employee){
    this.id = employee.id,
    this.email = employe.email,
    this.employee_name = employee.name,
    this.age = employee.age,
    this.birthday = employee.birthday
}

Employee.create = (newEmployee, result) => {
    mysql.query("INSERT INTO employees SET ?", newEmployee, (err, res) => {
        if(err){
            console.log("error: " + err);
            result(err, null);
            return;
        }
        console.log("Created the new employee: ", { id: res.insertId, ...newEmployee});
        result(null, {id: res.insertId, ...newEmployee})
    })
}

Employee.delete = (employeeId, result) => {
    mysql.query("DELETE FROM employees WHERE id = ?", employeeId, (err, res) => {
        if(err){
            console.log("error: " + err);
            result(err, null)
            return;
        }
        console.log("Deleted the employee ", {id: res.insertId, ...employeeId})
        result(null, {id: res.insertId, ...employeeId})
    })
}

//function still needed
Employee.search = (employeeId, result) => {
    mysql.query("SELECT * FROM employees where id = ?", employeeId, (err, res) => {
        if(err){
            console.log("error: " + err);
            result(err, null)
            return;
        }

        console.log("Found the employee ", {id: resinsertId, ...employeeId})
        result(null, {id: resinsertId, ...employeeId})
    })
}

module.exports = Employee;