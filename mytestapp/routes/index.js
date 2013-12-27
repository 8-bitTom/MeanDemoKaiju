
/*
 * GET home page.
 */

exports.index = function(req, res){
    res.render('index', { title: 'Express' });
};

exports.error = function(req, res){
    res.render('404', { title: '404 Error' });
};

/** serve jade enabled partials */
exports.partials = function(req, res) {
    var path = 'partials/' + req.params.name + '.jade';
    res.render(path, {}, function(err, html) {
        if(err){
            res.json({'error' : "try searching by id nor name"})
        } else {
            res.end(html);
        }
    });
};

/** serve jade enabled directive snippets */
exports.directiveSnippet = function(req, res) {
//    res.render('directiveSnippets/' + req.params.name + '.jade');
    var path = 'directiveSnippets/' + req.params.name + '.jade';
    res.render(path, {}, function(err, html) {
        if(err){
            res.json({'error' : "try searching by id nor name"})
        } else {
            res.end(html);
        }
    });
};

exports.getKaijus = function(kaijuMod){
    return function(req, res){
        kaijuMod.find({}, function(error, kaijus) {
            res.json(kaijus);
        });
    }
}

exports.getKaiju = function(kaijuMod){
    return function(req, res){
        if(req.query.name){
            kaijuMod.findOne({'name' : req.query.name}, function(error, kaiju) {
                if(error || kaiju.length === 0){
                   res.json({'error': 'could not find that name'})
                }else res.json(kaiju);
            });
        }else if(req.query.id){
            kaijuMod.findOne({'_id' : req.query.id}, function(error, kaiju) {
                if(error ||  kaiju.length === 0){
                    res.json({'error': 'could not find that id'})
                }else res.json(kaiju);
            });
        }else{
            res.json({'error' : "try searching by id nor name"})
        }

    }
}

exports.addKaiju = function(kaijuMod){
    return function(req, res){
        var kaiju = new kaijuMod(req.body);

        var imagesWithPath = [];

        if(kaiju.images.length > 0){
            for(var i = 0; i < kaiju.images.length; i++){
                var img = '/images/' + kaiju.images[i];
                imagesWithPath.push(img);
            }
        }

        if(kaiju.hasSVG){
           kaiju.svg = '/images/svg/' + kaiju.svg;
        }

        kaiju.images = imagesWithPath;

        kaiju.save(function(error, kaiju) {
            if(error || !kaiju){
                res.json({
                    error : error
                });
            } else {
                res.json({kaiju : kaiju});
            }
        })
    };
}

exports.addImage = function(fs){
    return function(req, res){
        // get the temporary location of the file
        var tmp_path = req.files.file.path;
        // set where the file should actually exists - in this case it is in the "images" directory
        var target_path = './public/images/' + req.files.file.originalFilename;
        console.log(target_path);
        // move the file from the temporary location to the intended location
        fs.rename(tmp_path, target_path, function(err) {
            if (err) throw err;
            // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
            fs.unlink(tmp_path, function() {
                if (err) throw err;
                res.send('File uploaded to: ' + target_path + ' - ' + req.files.file.size + ' bytes');
            });
        });
    }
}

exports.addSVG = function(fs){
    return function(req, res){
        // get the temporary location of the file
        var tmp_path = req.files.file.path;
        // set where the file should actually exists - in this case it is in the "images" directory
        var target_path = './public/images/svg/' + req.files.file.originalFilename;
        console.log(target_path);
        // move the file from the temporary location to the intended location
        fs.rename(tmp_path, target_path, function(err) {
            if (err) throw err;
            // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
            fs.unlink(tmp_path, function() {
                if (err) throw err;
                res.send('File uploaded to: ' + target_path + ' - ' + req.files.file.size + ' bytes');
            });
        });
    }
}