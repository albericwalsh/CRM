// server.js
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`✅ CRM Server running at http://localhost:${PORT}`);
});


app.get('/mock-login', (req, res) => {
    req.session.user = {
        id: 1,
        email: 'test@crm.com',
        name: 'Test User'
    };
    res.send('Connecté en session !');
});
