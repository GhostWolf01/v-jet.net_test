import axios from 'axios'

const http = axios.create({
  baseURL: 'https://cinema-api-test.y-media.io/v1'
    // baseURL: 'http://localhost:3000/'
})

export default http