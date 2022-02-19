const BITBUCKET_TOKEN = process.env.BITBUCKET_TOKEN;
const BITBUCKET_USER = process.env.BITBUCKET_USER;

const shell = require('shelljs');

async function gitClone(repo = 'practifi-integration-config'){ 
    try {
        const res = shell.exec(`git clone https://${BITBUCKET_USER}:${BITBUCKET_TOKEN}@bitbucket.org/practifi-eng/${repo}.git`)
        return res.code;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    gitClone
}
