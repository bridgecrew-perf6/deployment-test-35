const shell = require("shelljs");
const kill = require('kill-port')

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

module.exports = {
  loginSFDX,
};
