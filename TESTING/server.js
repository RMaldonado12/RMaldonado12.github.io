let http = require('http');
let url = require('url');
let fs = require('fs');
let path = require('path');


const fileTypes = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'text/javascript',
    'png': 'image/png',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpg'
};

function getIP() {
  let interfaces = require('os').networkInterfaces();
  for (let devName in interfaces) {
    let iface = interfaces[devName];

    for (let i=0; i<iface.length; i++) {
      let alias = iface[i];

      if( alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        console.log("The alias is:");
        console.log(alias);
        return alias.address;
      }
    }
  }
  return '0.0.0.0';
}

let portIP = getIP();
let port = '8080';

http.createServer((req, res) => {
    let myuri = url.parse(req.url).pathname;
    let filename = path.join(process.cwd(), unescape(myuri));
    console.log('File you are looking for is:' + filename);
    let loadFile;

    try {
        loadFile = fs.lstatSync(filename);
    } catch (error) {
        res.writeHead(404, {
            "Content-Type": 'text/plain'
        });
        res.write('404 Internal Error');
        res.end();
        return;
    }

    if (loadFile.isFile()) {
        let fileType = fileTypes[path.extname(filename).split('.').reverse()[0]];
        res.writeHead(200, {
            "Content-Type": fileType
        });
        let filestream = fs.createReadStream(filename);
        filestream.pipe(res);
    } else if (loadFile.isDirectory()) {
        res.writeHead(302, {
            'Location': 'index.html'
        });
        res.end();
    } else {
        res.writeHead(500, {
            "Content-Type": 'text/plain'
        });
        res.write('500 Internal Error');
        res.end();
    }

}).listen(port, portIP, () => {
    console.log(`Server is running on server http://${portIP}:${port}`);
});