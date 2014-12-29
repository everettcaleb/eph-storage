var Service = require('node-windows').Service;
var path = require('path');

// Create a new service object
var svc = new Service({
  name:'eph-storage',
  description: 'Ephemeral Storage Engine',
  script: path.resolve('.', 'eph-storage.js')
});

svc.install();
