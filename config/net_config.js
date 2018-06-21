const os = require('os')
const defaultJson = require('./default.json')
let serviceIp
for (let i = 0; i < os.networkInterfaces().en0.length; i++) {
  if (os.networkInterfaces().en0[i].family == 'IPv4') {
    serviceIp = os.networkInterfaces().en0[i].address;
  }
}
console.log('----------local IP: ' + serviceIp);
const servicePort = process.env.PORT || defaultJson.port

module.exports = {serviceIp, servicePort}