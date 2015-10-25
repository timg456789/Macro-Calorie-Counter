exports.index = function(req, res) {
    res.render('deploy', { title: 'Deploy Resources' } );
};

exports.deploy_db_ui = function(req, res) {
    res.render('deploy', { title: 'Deploy Resources' } );
};

exports.deploy_db_start = function(req, res) {
    var dbMgr = new DatabaseManager(res);
    dbMgr.rebuild();
};

function DatabaseManager(res) {

    var AWS = require('aws-sdk');
    var config = {
        region: 'us-east-1',
        endpoint: 'http://localhost:8000'
    };
    var dynamodb = new AWS.DynamoDB(config);
    var docClient = new AWS.DynamoDB.DocumentClient(config);
    var FOOD = 'Food';
    var PK = 'consumer';

    var FOOD_CONFIG = {
        TableName : FOOD,
        KeySchema: [
            { AttributeName: PK, KeyType: "HASH"},
            { AttributeName: "date", KeyType: "RANGE" }
        ],
        AttributeDefinitions: [
            { AttributeName: PK, AttributeType: "S" },
            { AttributeName: "date", AttributeType: "N" }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
        }
    };

    function deployComplete() {
        res.status(200);
        res.render('deploy', { title: 'Deploy Resources' } );
    }

    function createFoodModel(name) {
        return {
            TableName: FOOD,
            Item: {
                'consumer': 'timothy-s-gonzalez',
                'date': 1445729294,
                "food": name
            }
        };
    }

    function loadFood() {
        console.log('loading food');

        var query = {
            TableName : FOOD,
            KeyConditionExpression: "#cc = :cf",
            ExpressionAttributeNames:{
                "#cc": PK
            },
            ExpressionAttributeValues: {
                ":cf": 'timothy-s-gonzalez'
            }
        };

        docClient.query(query, function(err, data) {
            if (err) {
                console.log('Fail querying' + JSON.stringify(err));
            } else {
                console.log(JSON.stringify(data));
                deployComplete();
            }
        })

    }

    function insert() {
        var food = createFoodModel('banana');

        docClient.put(food, function(err, data) {
            if (err) {
                console.log('Fail inserting: ' + err);
            } else {
                loadFood();
            }
        });
    }

    this.rebuild = function () {

        dynamodb.listTables(function(err, data) {
            if (err) {
                console.log("Error listing tables: ", err);
            } else {

                if (data.TableNames.indexOf('Food') > -1) {

                    var params = {
                        TableName: FOOD
                    };

                    dynamodb.deleteTable(params, function(err, data) {
                        if (err) {
                            console.log('Error deleting table: ', err);
                        } else {
                            dynamodb.createTable(FOOD_CONFIG, function(err, data) {
                                if (err) {
                                    console.log('Error creating table: ' + err);
                                } else {
                                    insert();
                                }
                            });
                        }
                    });

                } else {
                    dynamodb.createTable(FOOD_CONFIG, function(err, data) {
                        if (err) {
                            console.log('Error creating table: ' + err);
                        } else {
                            insert();
                        }
                    });

                }
            }
        });

    }

}