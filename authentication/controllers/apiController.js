const fetch = require('node-fetch');
const apiController = {};

apiController.googleBooks = (req, res, next) => {
    const urlPartOne = 'https://www.googleapis.com/books/v1/volumes?q='
    const urlPartTwo = req.body.updatedString
    const urlPartThree = '&key=AIzaSyCKP8TdjmMKlVeQFAh7oITw8OdUBBID2VU'
    const finalUrl = urlPartOne + urlPartTwo + urlPartThree;
    // const finalUrl = 'https://www.googleapis.com/books/v1/volumes?q=Moby+Dick&key=AIzaSyCKP8TdjmMKlVeQFAh7oITw8OdUBBID2VU'
    console.log('in api controller')
    res.locals.data = [];
    fetch(finalUrl)
    .then(response => {
        return response.json()
    })
    .then(data => {
        for (let i = 0; i < 4 && i < data.items.length; i++) {
            if (data.items[i].volumeInfo.authors === undefined) data.items[i].volumeInfo.authors = ['No Author Listed']
            let bookInfo = {
                title: data.items[i].volumeInfo.title,  
                selfLink: data.items[i].selfLink,     
                author: data.items[i].volumeInfo.authors[0],   
              }
            res.locals.data.push({
                api: 'Google Books',
                apiData: data.items[i],
                formattedData: bookInfo});
        }

        return next();
    })
    .catch(err => console.log(err))
} 

apiController.newYorkTimes = (req, res, next) => {
    const urlPartOne = 'https://api.nytimes.com/svc/books/v3/reviews.json?title=';
    const urlPartTwo = req.body.updatedString;
    const urlPartThree = '&api-key=sdYVGp8NDwS0Q6WjF3uj6A3YxsYinxtX';
    const finalUrl = urlPartOne + urlPartTwo + urlPartThree;
    // const finalUrl = 'https://api.nytimes.com/svc/books/v3/reviews.json?title=Dune&api-key=sdYVGp8NDwS0Q6WjF3uj6A3YxsYinxtX';
    // test URL = http://openlibrary.org/search.json?q=moby+dick
    
    // const finalUrl = 'https://www.googleapis.com/books/v1/volumes?q=Moby+Dick&key=AIzaSyCKP8TdjmMKlVeQFAh7oITw8OdUBBID2VU'
    fetch(finalUrl)
    .then(response => {        
        // return JSON.parse(response); 
         return response.json(); 
    })
    .then(data => {
        for (let i = 0; i < 4 && i < data.results.length; i++) {
            let selfLink = data.results[i].url
            let bookInfo = {
                title: data.results[i].book_title,  
                selfLink: selfLink,     
                author: data.results[i].book_author,   
              }
            res.locals.data.push({
                api: 'New York Times Books',
                apiData: data.results[i],
                formattedData: bookInfo});
        }
        return next();
    })
    .catch(err => console.log(err))
} 

module.exports = apiController