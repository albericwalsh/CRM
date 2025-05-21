exports.getProfile = (req, res) => {
    // Exemple simple, à remplacer par une vraie logique avec sessions ou JWT
    if (req.session && req.session.user) {
        res.json({
            id: req.session.user.id,
            email: req.session.user.email,
            name: req.session.user.name
        });
    } else {
        res.status(401).json({ message: 'Non authentifié' });
    }
};
