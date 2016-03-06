var mysql = require("mysql");

// First you need to create a connection to the db
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "211201",
  database: "sitepoint"
});

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
  
});
//console.log('Connection established');
con.query('SELECT * FROM employees',function(err,rows){
 	 if(err) throw err;
  	//console.log('Data received from Db:\n');
  	//console.log(rows);
	for (var i = 0; i < rows.length; i++) {
    	console.log(rows[i].name,rows[i].location);
	};
});
// inserimento ----------------------

var employee = { name: 'Winnie', location: 'Australia' };
con.query('INSERT INTO employees SET ?', employee, function(err,res){
  if(err) throw err;

  console.log('Last insert ID:', res.insertId);
});
// update -------------------------
con.query(
  'UPDATE employees SET location = ? Where ID = ?',
  ["South Africa", 5],
  function (err, result) {
    if (err) throw err;

    console.log('Changed ' + result.changedRows + ' rows');
  }
);

con.end(function(err) {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
});