const shell = require("shelljs");
const kill = require('kill-port')
var jsforce = require('jsforce');
var conn = new jsforce.Connection();
const fs = require('fs');

async function loginSFDX(context) {
  console.log(context)
  if (!context) {
    return;
  }
  if (context == `login`) {
    let res = shell.exec(
      `sfdx auth:web:login -a scratchOrg -r https://test.salesforce.com`
    ,{ timeout: 90000 });
    if(res.code == 1){
      kill(1717,`tcp`);
    }
    return res;
  }
  if (context == `logout`) {
    let res = shell.exec(`sfdx force:auth:logout -u scratchOrg -p`);
    return res;
  }
}

async function loginUsingSFDXAuthUrl(sfdxAuthUrl) {
  fs.writeFileSync('./sfdxAuthUrl.txt', sfdxAuthUrl);
  let res = shell.exec(`sfdx force:auth:sfdxurl:store -f ./sfdxAuthUrl.txt -a scratchOrg`)
  return res;
}

module.exports = {
  loginSFDX,loginUsingSFDXAuthUrl
};
