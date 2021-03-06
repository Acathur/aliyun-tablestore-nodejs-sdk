var TableStore = require('../index.js');
var Long = TableStore.Long;
var client = require('./client');

var tableName = "autoIncTable";
var pk1 = "stringPK";
var pk2 = "autoIncPK";

//创建一个带自增主键的表
function createTableWithAutoIncrementPk() {
    var createParams = {
        tableMeta: {
            tableName: tableName,
            primaryKey: [
                {
                    name: pk1,
                    type: 'STRING'
                },
                {
                    name: pk2,
                    type: 'INTEGER',
                    option: 'AUTO_INCREMENT'//自增列，指定otpion为AUTO_INCREMENT
                },
            ]
        }
    };

    client.createTable(createParams, function (err, data) {
        if (err) {
            console.log('error:', err);
            return;
        }
        console.log('create table success');
    });
}

//插入数据，自增列的值指定为：TableStore.PK_AUTO_INCR 即可
function putRow() {
    var putParams = {
        tableName: tableName,
        condition: new TableStore.Condition(TableStore.RowExistenceExpectation.IGNORE, null),
        primaryKey: [
            { pk1: 'pk1' },
            { pk2: TableStore.PK_AUTO_INCR }
        ],
        attributeColumns: [
            { 'col1': 'col1val' }
        ],
        returnContent: { returnType: TableStore.ReturnType.Primarykey }
    };

    client.putRow(putParams, function (err, data) {
        if (err) {
            console.log('error:', err);
            return;
        }

        console.log('put row success,autoIncrement pk value:' + JSON.stringify(data.row.primaryKey));
    });

}




