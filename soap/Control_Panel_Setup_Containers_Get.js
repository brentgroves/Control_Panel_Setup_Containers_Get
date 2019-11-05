var soap = require('soap');
const mqtt = require('mqtt');
var cpscg = require('../mysql/Control_Panel_Setup_Containers_Get');

// At the bottom of the wsdl file you will find the http address of the service
var prodURL = '/plex-pro.wsdl';
var testURL = '/plex-test.wsdl';

// CNC422
// WorkcenterGroup/WorkCenter
// GA FWD Knuckle/FWD BE 517
// Serial_No:BV066669
// Workcenter: 61420
//
// 61314 Honda Civic Knuckle LH
var request_data = {
  ExecuteDataSourceRequest: {
    DataSourceKey: '13318',
    InputParameters: {
      InputParameter: {
        Name: 'Workcenter_Key',
        Value: '61420',
        Required: 'true',
        Output: 'false',
      },
    },
  },
};

var plexWSDL = __dirname + prodURL;
// var plexWSDL = __dirname + testURL;

async function getSetupContainers(TransDate,ProdServer) {
  soap.createClient(plexWSDL, function(err, client) {
    debugger;
    // we now have a soapClient - we also need to make sure there's no `err` here.
    if (err) {
      return res.status(500).json(err);
    }
    debugger;
    client.setSecurity(
      new soap.BasicAuthSecurity(
        'BuscheAvillaKorsws@plex.com',
        '5b11b45-f59f-',
      ),
    );
    debugger;
    client.ExecuteDataSource(request_data, function(err, result) {
      // we now have a soapClient - we also need to make sure there's no `err` here.
      if (err) {
        return res.status(500).json(err);
      }

      // console.log(
      //   result.ExecuteDataSourceResult.ResultSets.ResultSet[0].Rows.Row[0]
      //     .Columns,
      // );
      debugger;
      console.log(
        result.ExecuteDataSourceResult.ResultSets.ResultSet[0].Rows.Row[0]
          .Columns.Column[0].Name,
      );

      var res = result.ExecuteDataSourceResult.ResultSets.ResultSet[0].Rows.Row;
      var setupContainer = {};
      for (let i = 0; i < res.length; i++) {
        let container = res[i].Columns.Column;
        // console.log(res[i].Columns.Column[7].Name + ": " + res[i].Columns.Column[7].Value);
        for (let j = 0; j < container.length; j++) {
          // console.log(container[j].Name + ': ' + container[j].Value);
          let name = container[j].Name;
          setupContainer[name] = container[j].Value;
          //            console.log(setupContainer);
        }
        debugger;
        setupContainer['TransDate'] = TransDate;
        setupContainer['ProdServer'] = ProdServer;
        console.log(setupContainer.Part_No);
        cpscg.insert(setupContainer);
        setupContainer={};
      }
    });
  });
}

function main() {
  // var client  = mqtt.connect('mqtt://ec2-18-218-2-29.us-east-2.compute.amazonaws.com')
  var client = mqtt.connect('mqtt://localhost');
  // var client  = mqtt.connect('mqtt://test.mosquitto.org')

  client.on('connect', function() {
    client.subscribe('CNC422/Cycle_Counter_Shift_SL', function(err) {
      if (!err) {
        console.log('subscribed to: CNC422/Cycle_Counter_Shift_SL');
        // client.publish('house/bulb1', 'Hello mqtt')
      }
    });
  });

  client.on('message', function(topic, message) {
    // message is Buffer
    console.log(message.toString());
    //  getContainer();
    //  client.end()
  });
}
// main();

let date_ob = new Date();
let date = ('0' + date_ob.getDate()).slice(-2);
let month = ('0' + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();
let TransDate = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
// prints date & time in YYYY-MM-DD HH:MM:SS format
console.log(TransDate);
getSetupContainers(TransDate,true);
