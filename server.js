var xlsxtojson = require("xlsx-to-json");
var fs = require("fs");
var json2xls = require("json2xls");

mergeFiles();
function mergeFiles() {
    excelToJson(__dirname+"\\file1.xlsx",function(result1) {
        excelToJson(__dirname+"\\file2.xlsx",function(result2) {
            // console.log("result1",result1);
            // console.log("result2",result2);
            // console.log("merged",[...result1,...result2]);
            let mergedArray = result1.map(x=> {
                let matchedEle = result2.find(y=>y.Email==x.email);
                // console.log("x",x);
                // console.log("match",matchedEle);
                // console.log("merge",{...x,...matchedEle});
                x = {...x,...matchedEle};
                delete x.Email;
                delete x[''];
                return x;
            })
            // console.log("mergedArray",mergedArray);
            var xls = json2xls(mergedArray);
            fs.writeFileSync("output.xlsx",xls,'binary');
        })
    })
}

function excelToJson(filepath,callback) {
    console.log("filepath",filepath);
    xlsxtojson({
        input: filepath,
        output: null
    }, function(err,result) {
        // console.log("result",result);
        callback(result);
    })
}