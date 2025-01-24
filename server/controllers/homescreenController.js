exports.homescreen = async (req, res) => {
    
    const locals = {
        title: 'home screen',
        description: 'our website homepage',
    };
    res.render('homescreen/index', {
        userName: req.user.firstName,
        locals,
        layout: '../views/layouts/homescreen',
        
    });}