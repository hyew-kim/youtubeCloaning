//require('dotenv').config();
import 'dotenv/config';
import './db';
import './models/Video';
import './models/User';
import app from './server';

const PORT = 4000;

// application starts to listen request
const handleListening = () => console.log(`✅ server listening on port http://localhost:${PORT}`);
app.listen(PORT, handleListening);
