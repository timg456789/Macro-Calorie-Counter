exports.index = function(req, res) {
    res.render('deploy', { title: 'Deploy Resources' } );
};

exports.deploy_db_ui = function(req, res) {
    res.render('deploy', { title: 'Deploy Resources' } );
};

exports.deploy_db_start = function(req, res) {
    res.status(500);
    res.render('deploy', { title: 'Deploy Resources' } );
};