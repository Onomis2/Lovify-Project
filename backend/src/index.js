// Initialize variables from dotenv
require('dotenv').config({ path: 'src/.env' });

// Import dependencies
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import Routes
const auth = require('./routes/auth');

// Initialize Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

//
// Initialize endpoints
//

app.use('/api/auth', auth);

// Example future endpoints:

//app.use('/api/songs', songs);
//app.use('/api/playlists', playlists);
//app.use('/api/search', search);
//app.use('/api/userProfile', userProfile);
//app.use('/api/history', history);

//app.use('/api/admin'. admin);

app.get('/', (req, res) => res.send('OK'));

//
// Open server
//

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Backend listening on ${port}`));