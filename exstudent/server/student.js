const express=require('express')
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express()
const port=3000

let students=[{
    "studid":"4081",
    "studentName":"Pranesh Rahul",
    "studentGrade":"8",
    "course":"cse",
    "Address":"Chennai",
    "phone":"9677685045",
},
{
    "studid":"4119",
    "studentName":"Vignesh",
    "studentGrade":"9",
    "course":"ECE",
    "Address":"Delhi",
    "phone":"6379150644",
},

{
    "studid":"4122",
    "studentName":"Balaji",
    "studentGrade":"7",
    "course":"Mech",
    "Address":"Mumbai",
    "phone":"274509324055",
}
]

app.use(cors());

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.post('/student', (req,res)=> {
    const student=req.body;
    
    //output the student to the console for debugging
    console.log(student);
    students.push(student);
    
    res.send('Student is added to the Database');
});


app.get('/student',(req,res)=> {
    res.json(students);
});

app.get('/student/:studid',(req,res)=> {
    //reading id from the the URL
    const studid=req.params.studid;

    //Searching student for the id
    for(let student of students){
         if(student.studid === studid){
            res.json(student);
            return;
        }

        }
        // sending 404 when something is not found
        res.status(404).send('Student not found');
});



app.put('/student/:studid',(req,res) => {
    const studid= req.params.studid;
    const newStudent =req.body;

    
    for(let i=0;i<students.length;i++){
        let student = students[i]

        if(student.studid === studid){
            students[i]=newStudent;
        }
    }
    //sending 404 when something is not found
    res.send('Student is edited');
});


app.delete('/student/:studid',(req,res) => {
    //reading id from thr URL
    const studid= req.params.studid;
    

    // remove item from the Students array
   students= students.filter(i=> {
       if(i.studid!==studid){
           return true;
       }
       return false;
   });
    //sending 404 when something is not found
    res.send('Student is Deleted');
});



app.listen(port,()=>console.log(`Hello World listening on port ${port}!`));
