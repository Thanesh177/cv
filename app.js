const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 3001;

const server = http.createServer(function(req, res) {
    let filePath = '.' + req.url;

    // Check if the requested URL is for a directory, if so, redirect to index.html
    if (fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
    }

    // Determine the content type based on the file extension
    const extname = path.extname(filePath);
    let contentType = 'text/html';

    switch (extname) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
    }

    // Read the file and serve it with appropriate content type
    fs.readFile(filePath, function(error, content) {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end('File not found');
            } else {
                res.writeHead(500);
                res.end('Server Error: ' + error.code);
            }
        } else {
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content, 'utf-8');
        }
    });
});

server.listen(port, function(error) {
    if (error) {
        console.error('Something went wrong:', error);
    } else {
        console.log('Server is listening on port ' + port);
    }
});
