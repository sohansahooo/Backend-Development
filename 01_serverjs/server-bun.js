import {serve} from 'bun';

const server = serve({
    fetch(req){
        const url = new URL(req.url);
        if (url.pathname === '/') {
            return new Response('Hello World', {status: 200});
        } else if (url.pathname === '/users') {
            return new Response('List of Users', {status: 200});
        } else {
            return new Response('Not Found', {status: 404});
        }
    },
    port: 3000,
    hostname: '127.0.0.1'
})

console.log(`Server running at http://${server.hostname}:${server.port}/`);
