var cpscg = require('./Control_Panel_Setup_Containers_Get');
function main(){
    
    let date_ob = new Date();
    let date = ('0' + date_ob.getDate()).slice(-2);
    let month = ('0' + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    let TransDate = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    let params = {
        TransDate: TransDate,
        ProdServer:true,
        PartNumber:"12345",
        Multiple:false,
        Container_Note:"Note",
        Cavity_Status_Key: 123,
        Container_Status:"status"
    };
cpscg.insert(params);
}

main();


// `"${p.TransDate}",${p.ProdServer},"${p.PartNumber}", ${p.Multiple}` +
// `"${p.Container_Note}",${p.Cavity_Status_Key},"${p.Container_Status}" ` +
