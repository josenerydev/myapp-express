const AWS = require('aws-sdk');

const secretsManager = new AWS.SecretsManager({
    region: 'us-east-1'
});

function getSecrets() {
    return new Promise((resolve, reject) => {
        secretsManager.getSecretValue({ SecretId: 'MyExpressAppSecret' }, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            if (data.SecretString) {
                resolve(JSON.parse(data.SecretString));
            } else {
                reject(new Error("No secrets found"));
            }
        });
    });
}

module.exports = getSecrets;
