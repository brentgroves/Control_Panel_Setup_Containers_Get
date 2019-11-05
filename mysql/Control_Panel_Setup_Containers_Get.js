var mysql = require('mysql');
var ObjectToMySQL = require('./ObjectToMySQL');

module.exports.insert = function insert(plexRec) {
    // console.log(p);
    // return;
    var p = ObjectToMySQL.ObjectToMySQL(plexRec);
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
`TransDate,PCN,ProdServer,Part_No,Name,Multiple, ` +
`Container_Note,Cavity_Status_Key,Container_Status, ` +
`Defect_Type,Serial_No,Setup_Container_Key,Count, ` +
`Part_Count,Part_Key,Part_Operation_Key,Standard_Container_Type,Container_Type_Key, ` +
`Parent_Part,Parent,Cavity_No,Master_Unit_Key,Workcenter_Printer_Key, ` +
`Master_Unit_No,Physical_Printer_Name,Container_Count,Container_Quantity, ` +
`Default_Printer,Default_Printer_Key,Class_Key,Quantity,Companion, ` +
`Container_Type,Container_Type_Description,Sort_Order ` +
`) values ( ` +
`"${p.TransDate}","${p.PCN}",${p.ProdServer},"${p.Part_No}","${p.Name}", ${p.Multiple},` +
`"${p.Container_Note}",${p.Cavity_Status_Key},"${p.Container_Status}", ` +
`"${p.Defect_Type}","${p.Serial_No}",${p.Setup_Container_Key},${p.Count}, ` +
`"${p.Part_Count}",${p.Part_Key},${p.Part_Operation_Key},"${p.Standard_Container_Type}",${p.Container_Type_Key}, ` +
`"${p.Parent_Part}","${p.Parent}","${p.Cavity_No}",${p.Master_Unit_Key},${p.Workcenter_Printer_Key}, ` +
`"${p.Master_Unit_No}","${p.Physical_Printer_Name}",${p.Container_Count},${p.Container_Quantity}, ` +
`"${p.Default_Printer}",${p.Default_Printer_Key},${p.Class_Key},${p.Quantity},${p.Companion}, ` +
`"${p.Container_Type}","${p.Container_Type_Description}",${p.Sort_Order} ` +
`)`
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
