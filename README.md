# Simple Open EtherCAT Master for Node.js

## Installation

`npm install node-soem`

Make sure to have `git` and `cmake` installed on you system. The installation process builds a shared library from the [Simple Open EtherCAT Master](https://github.com/openethercatsociety/soem).

## API

Basically following the C API.

### Creating a master.

    var soem = require('node-soem').NodeSoemMaster,
        master = soem(); // uses eth0 initially

### Example

    // initiate socket and stuff
    if (master.init()) {
    
        // send out some ethercat frames to configure slaves
        master.configInit();

        // map the slave pdos to the internal ioMap
        master.configMap();
    
        // configure distributed clocks
        master.configDC();

        // take a look at the bus configuration
        var slaves = master.getSlaves();

        console.log(slaves);

        // get ready to send some initial data befor going to operational state
        master.sendProcessdata();
        maste.receiveProcessdata();

        // go to operational state
        master.writeState(0, 4); // 0=all slaves, 4=operational state

        // wait for the master to reach operational state

        var waitForOp = function () {
        
            var intv = setInterval(function () {
            
                master.sendProcessdata();
                master.receiveProcessdata();
                
                var state = master.statecheck(0, 4);
                
                // operational state reached
                if (state === 4) {
                    clearInterval(intv);
                    loop();    
                } 
                
            }, 50);    
            
        }

        var loop = function () {
       
            var counter = 0,
                slaves = master.getSlaves(),
                dv = new DataView(slaves[0].outputs);
        
            var intv = setInterval(function () {
     
                master.sendProcessdata();
                master.receiveProcessdata();
               
                dv.setUint16(0, counter++); 
                           
                
            }, 50);   
            
        }
    
        waitForOp();

    }

## License


Copyright (C) 2016 Stefan Poeter (Stefan.Poeter[at]cloud-automation.de)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
