const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url, true);
  if (reqUrl.pathname === '/api/convertCase' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const data = JSON.parse(body);
      const inputText = data.inputText;
      const outputText = convertCase(inputText);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write(outputText);
      res.end();
    });
  } else {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('404 Not Found');
        return res.end();
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    });
  }
});

function convertCase(text) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const char = text.charAt(i);
    if (char === char.toUpperCase()) {
      result += char.toLowerCase();
    } else {
      result += char.toUpperCase();
    }
  }
  return result;
}

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
