// Import express package
const express = require('express');
const fs = require('fs');
// REST ARCHITECTURE  [31-10-2024]

let app = express();
let movies = JSON.parse(fs.readFileSync('./data/movies.json'));
 
app.use(express.json());

// Route Handler Functions

// Function to get all movies
const getAllMovies = (req,res) => { 
    //v1 stands for the version. Advantage is if you modify the v1[an already existing api] it may break down so you will create a modified one v2.
   res.status(200).json({
    status: "success",
    count: movies.length,
    data: {
       movies: movies
    }
   })
}

// To get movie by id
const getMovieById = (req, res) => {
    const userId = req.params.id * 1; // Parsing string id to value
 
    let movie = movies.find(el => { // Finding id in array that matches id in the parameter
     return el.id === userId
    });
 
    if(!movie){
     return res.status(404).json({
         status: "fail",
         message: "Movie not found"
         });
    }
 
    res.status(200).json({
     status: "success",
     data: {
         movie: movie
         }
    });
    
     // console.log(req.params);
     // res.send(`The id parameter is ${userId}`);
     
 }

// To post new movie record

const postMovie = (req, res) => {
    // console.log(req.body); // request can no give a body( it does not have a body)
    const newId = movies[movies.length - 1].id + 1;

    const newMovie = Object.assign({id: newId}, req.body);
    movies.push(newMovie);

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) =>{ // enveloping the new Movie
        res.status(201).json({
            status: "success",
            data: {
                movies: newMovie
            }
        })
    })
    // res.send('Created');
    
}

// To update single record

const updateMovieById = (req, res) => {
    const Id = req.params.id * 1; // Parsing string id to value

    let movieToUpdate = movies.find(el => el.id === Id);

    if(!movieToUpdate){
        return res.status(404).json({
            status: "error",
            message: "No movie object with " + Id + " is not found"
        })
        // console.log('vcnvdwhvc');
        
    }

    let index = movies.indexOf(movieToUpdate);

    Object.assign(movieToUpdate, req.body);

    movies[index] = movieToUpdate;

   

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(200).json({
            status: "success",
            data: {
                movie: movieToUpdate
                }
        });
    });
}


// To delete movie by id

const deleteMovieById = (req, res) => {
    const id = req.params.id * 1;

    movieToDelete = movies.find(el => el.id === id);

    if(!movieToDelete){
        return res.status(404).json({
            status: "fail",
            message: "No movie object with " + id + " is found to delete"
        })
        
    }

    const index = movies.indexOf(movieToDelete);

    movies.splice(index, 1);

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(204).json({
            status: "success",
            data: {
                movie: movieToDelete
                }
        });
    });
}

//GET METHOD - api/movies [for making get request]
app.get('/api/v1/movies', getAllMovies);

//Get - api/v1/movies/:id
app.get('/api/v1/movies/:id', getMovieById);

//POST - api/v1/movies
app.post('/api/v1/movies', postMovie);

app.patch('/api/vi/movies/:id', updateMovieById);

app.delete('/api/vi/movies/:id', deleteMovieById);


// Chaining endpoints using route

app.route('/api/v1/movies').get(getAllMovies).post(postMovie);

app.route('/api/v1/movies/:id').get(getMovieById).patch(updateMovieById).delete(deleteMovieById);



//create a server
const port = 3000;
app.listen(port, () => {
    console.log('Server has started');
})