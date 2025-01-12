const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 9000;
const PUBLIC_DIR = path.join(__dirname, 'out/renderer');

const server = http.createServer((req, res) => {
    let filePath = path.join(PUBLIC_DIR, req.url === '/' ? 'index.html' : req.url);
    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.woff2': 'application/font-woff2',
        '.ttf': 'font/ttf',
        '.otf': 'font/otf',
        '.eot': 'application/vnd.ms-fontobject'
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if(err.code == 'ENOENT'){
                // 如果文件不存在，尝试返回 index.html
                fs.readFile(path.join(PUBLIC_DIR,'index.html'),(err, content)=>{
                  if (err) {
                    res.writeHead(404);
                    res.end('404 Not Found: '+ filePath);
                    return;
                  }

                  res.writeHead(200, { 'Content-Type': 'text/html' });
                  res.end(content, 'utf-8');
              });
            }
             else {
                res.writeHead(500);
                res.end('Sorry, check with the site admin for error: ' + err.code + ' ..\n');
            }
             return;
        }

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}/`);
});
