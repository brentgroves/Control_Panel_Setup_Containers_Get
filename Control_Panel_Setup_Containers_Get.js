var mysql = require('mysql');

module.exports.insert = function insert(p) {
    // console.log(p.ProdServer);
    // return;
    var con = mysql.createConnection({
    // host: 'ec2-3-14-133-181.us-east-2.compute.amazonaws.com',
    host: 'localhost',
    user: 'brent',
    password: 'JesusLives1!',
    insecureAuth: true,
    database: 'mach2',
  });

  // con.connect(function(err){
  //     if(err) throw err;
  //     console.log("Connected");
  // })

  con.connect(function(err) {
    // let sql =
    //       `insert into ProdVrsTest `
    //       + `(TransDate,p1ProdQuantity,p1TestQuantity,p2ProdQuantity,p2TestQuantity) values ("${dateTime}",12,12,14,14)`;
let sql =`insert into Control_Panel_Setup_Containers_Get (` +
`TransDate,ProdServer, Part_No, Multiple, ` +
`Container_Note,Cavity_Status_Key,Container_Status ` +
`) values ( ` +
`"${p.TransDate}",${p.ProdServer},"${p.PartNumber}", ${p.Multiple},` +
`"${p.Container_Note}",${p.Cavity_Status_Key},"${p.Container_Status}" ` +
`)`
    //   Name varchar(50) NULL,
//   Multiple bool NULL,
//   Container_Note varchar(50) NULL,
//   Cavity_Status_Key MEDIUMINT NULL,
//   Container_Status varchar(50) NULL,
//   Defect_Type varchar(50) NULL,
//   Serial_No varchar(50) NULL,
//   Setup_Container_Key MEDIUMINT NULL,
//   Count MEDIUMINT NULL,
//   Part_Count MEDIUMINT NULL,
//   Part_Key MEDIUMINT NULL,
//   Part_Operation_Key MEDIUMINT NULL,
//   Standard_Container_Type varchar(50) NULL,
//   Container_Type_Key MEDIUMINT NULL,
//   Parent_Part varchar(50) NULL,
//   Parent varchar(50) NULL,
//   Cavity_No varchar(50) NULL,
//   Master_Unit_Key MEDIUMINT NULL,
//   Workcenter_Printer_Key MEDIUMINT NULL,
//   Master_Unit_No varchar(50) NULL,
//   Physical_Printer_Name varchar(50) NULL,
//   Container_Count MEDIUMINT NULL,
//   Container_Quantity MEDIUMINT NULL,
//   Default_Printer varchar(50) NULL,
//   Default_Printer_Key MEDIUMINT NULL,
//   Class_Key MEDIUMINT NULL,
//   Quantity MEDIUMINT NULL,
//   Companion Bool NULL,
//   Container_Type varchar(50) NULL,
//   Container_Type_Description varchar(50) NULL,
//   Sort_Order MEDIUMINT NULL,

    console.log(sql);
    // let sql = 'select * from test';
    if (err) throw err;
    console.log('Connected!');
    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log('Result: ' + result);
    });
    //con.close();
  });
}
