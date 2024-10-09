const express = require('express');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const PORT = 4000;

// Hardcoded versions (current and expected)
const currentVersion = "1.0.0";
const expectedVersion = "1.2.0";

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/version', (req, res) => {
  console.log("get man");
  res.render('version', { currentVersion, expectedVersion });
});

app.post('/pull', (req, res) => {
  // Execute shell commands to pull and run Docker
  const appPath = "/Users/harshilsoni/Desktop/work/github-repos/phone-spam-authentication-prod-compose"; // Replace with actual path

  exec(`cd ${appPath} && docker-compose -f docker-compose.prod.yaml down && git pull && docker-compose -f docker-compose.prod.yaml up -d`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).send('Failed to pull and start the app');
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
    }
    console.log(`Stdout: ${stdout}`);
    res.redirect('/');
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
