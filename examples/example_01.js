var soem = require('../build/Release/node-soem');
    master = soem.NodeSoemMaster("enp0s0");
        
console.log('Initiating.', master.getInterfaceName());

console.log(master.init(), 'on interface', master.getInterfaceName());

console.log(master.configInit(), 'working counter on config_init call.');
console.log(master.configMap(), 'config map completed.');
console.log(master.configDC(), 'configuring dc.');

console.log(master.getSlaves());


console.log('Sending initial data.');

// intial send
master.sendProcessdata();
master.receiveProcessdata();

console.log('Going to Operational State.');

master.writeState(0, 4);

var setupLoop = function () {

    var setupInt = setInterval(function () {

        master.sendProcessdata();
        master.receiveProcessdata();
        var state = master.statecheck(0, 4, 50);

        console.log('Found state', state);

        if (state === 4) {
            clearInterval(setupInt);
            startLoop();
        }

    }, 50);
};

var startLoop = function () {

    var slaves = master.getSlaves(),
        counter = 0;

    var int = setInterval(function () {

        master.sendProcessdata();
        var expectedWkc = master.getExpectedWC(), 
            wkc = master.receiveProcessdata();

        var dvo = new DataView(slaves[0].outputs),
            dvi = new DataView(slaves[0].inputs);

        var str = '';
        for (var i = 0; i < slaves[0].inputs.byteLength; i += 1) {
        
            str += dvi.getUint8(i).toString(16) + ' ';
        
        }

        console.log(str);

        if (expectedWkc !== wkc) {
        
            console.log('Working counter error.');

            clearInterval(startLoop);

            setupLoop();
            return;

        }

        dvo.setUint16(0, counter++);

    }, 50);

};

setupLoop();
