let baseUrl = 'https://web-poll-07.herokuapp.com/'
if(process.env.NODE_ENV === "development"){
    baseUrl = 'http://localhost:3000/'
}

export default baseUrl