let baseUrl = 'https://web-polls-07.herokuapp.com/'
if(process.env.NODE_ENV === "development"){
    baseUrl = 'http://localhost:3000/'
}

export default baseUrl