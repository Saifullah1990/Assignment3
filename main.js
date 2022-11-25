var mongoClient = require('mongodb').MongoClient;

var url = "mongodb+srv://saifDBDemo:104386@cluster0.jjlvkpt.mongodb.net";

var config = {UseUnifiedTopology: true}; 

mongoClient.connect(url,config,function (error,myMongoClient) {
    if(error){
        console.log('Connection failed');
    }
    else{
        console.log('Connection success');
        createData(myMongoClient); //Change the function as per the CRUD operation
    }
})

// CRUD (Create, Read, Update, Delete) Script 

// CREATE DATA
function createData(myMongoClient){
    var myDataBase = myMongoClient.db('sep_project');
    var myCollection = myDataBase.collection('employees') 

    myData=[{Name:"Saif", Designation: "Procurement Specialist", Dept: "Procurement", Floor: 09}, 
            {Name:"Morshed", Designation: "SPO", Dept: "ICT", Floor: 12},
            {Name:"Alal", Designation: "PO", Dept: "Communication", Floor: 5},
            {Name:"Shofiul", Designation: "APO", Dept: "Environment", Floor: 2},
            {Name:"Zahir", Designation: "PC", Dept: "Project", Floor: 2}]

    myCollection.insertMany(myData,function(error){
        if (error){
            console.log('Data insert failed');
        }
        else{
            console.log('Data insert success');
        }
    })
}


// READ DATA 
function readData(myMongoClient){
    myDataBase = myMongoClient.db("sep_project")
    myCollection = myDataBase.collection("employees")

    myCollection.find().toArray(function(error, result){ 

        console.log(result);
    })
} 


// UPDATE DATA 
function updateData(myMongoClient){
    myDataBase = myMongoClient.db("sep_project")
    myCollection = myDataBase.collection("employees") 

    myQuery = {Floor: 9} 
    newValue = { $set: {Name: "Saifullah"} }
    
    myCollection.updateOne(myQuery, newValue, function(error, result){
        console.log(result);
    })
}


//DELETE DATA 
function deleteData(myMongoClient){
    myDataBase = myMongoClient.db("sep_project")
    myCollection = myDataBase.collection("employees") 

    myCollection.deleteOne({Floor: 2}, function(error){
        if (error){
            console.log("Data delete failed")
        } 
        else{
            console.log("Data delete success")
        }
    })
}