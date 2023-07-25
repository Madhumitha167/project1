const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 1000;

http.createServer((req, res) => {
  const { url } = req;
  const filePath = path.join(__dirname, url === '/' ? 'index.html' : url);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      return res.end('File not found.');
    }

    let contentType = 'text/html';
    if (url.endsWith('.css')) {
      contentType = 'text/css';
    } else if (url.endsWith('.jpg') || url.endsWith('.jpeg')) {
      contentType = 'image/jpeg';
    } else if (url.endsWith('.png')) {
      contentType = 'image/png';
    }

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
}).listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
