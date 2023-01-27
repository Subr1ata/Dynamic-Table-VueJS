import express from "express";
import mssql from 'mssql';

const router = express.Router();

var config = {
    user: 'ETest',
    password: 'Power@123',
    server: '103.131.93.13',
    port: 1433,
    database: 'ETest' ,
    options: {
        trustServerCertificate: true,
      }
};

router.get('/party', function(req,res) {

    // connect to your database
    mssql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new mssql.Request();
           
        // query to the database and get the records
        request.query('select * from dbo.PARTY_MASTER', function (err, recordset) {
            
            if (err) res.send(err)

            // send records as a response
            res.json(recordset.recordsets[0]);
        });
    });
})

router.get('/item', function(req,res) {

    // connect to your database
    mssql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new mssql.Request();
           
        // query to the database and get the records
        request.query('select * from dbo.ITEM_MASTER', function (err, recordset) {
            
            if (err) res.send(err)

            // send records as a response
            res.json(recordset.recordsets[0]);
        });
    });
})

router.get('/uom', function(req,res) {

    // connect to your database
    mssql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new mssql.Request();
           
        // query to the database and get the records
        request.query('select * from dbo.UOM', function (err, recordset) {
            
            if (err) res.send(err)

            // send records as a response
            res.json(recordset.recordsets[0]);
        });
    });
})

export default router;