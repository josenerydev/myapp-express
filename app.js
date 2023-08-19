const express = require('express')
const AWS = require('aws-sdk')

const app = express()
const port = 3000

// Initialize the Secrets Manager client
const secretsManager = new AWS.SecretsManager({
    region: 'us-east-1' // Change this to your region
})

// Retrieve secrets from AWS Secrets Manager
let mySecrets = {}

secretsManager.getSecretValue({ SecretId: 'MyExpressAppSecret' }, (err, data) => {
    if (err) {
        console.error("Error retrieving secrets:", err)
        return
    }
    
    if (data.SecretString) {
        mySecrets = JSON.parse(data.SecretString)
    }
})

app.get('/', (req, res) => {
  res.send(`Hello World! Using secret: ${mySecrets.username}`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
