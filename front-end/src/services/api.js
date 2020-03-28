import axios from 'axios';

// O cliente cria as rotas e requisições
const api = axios.create({
    // URL que aparece sempre. Nesse caso é o server local, mas seria o domínio
    baseURL: 'http://localhost:3333/'
})

export default api;

