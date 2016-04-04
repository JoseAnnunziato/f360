module.exports = function (app, spotDao, userDao, mongoose) {
    app.post("/f360/api/user/:userId/spot", createSpot);
    app.get("/f360/api/user/:userId/spot", findAllSpotsByUser);
    app.get("/f360/api/spot/:spotId", findSpotById);
    app.put("/f360/api/user/:userId/spot", updateSpot);
    app.delete("/f360/api/spot/:spotId", deleteSpot);


    function createSpot(req, res) {
        var spot = req.body;
        spot["userId"] = mongoose.Types.ObjectId(req.params.userId);
        spotDao.createSpot(spot)
            .then(
                function (response) {
                    findAllSpotsByUser(req, res);
                }, function (err) {
                    error(res, err);
                }
            );
    }

    function findAllSpotsByUser(req, res) {
        spotDao.findAllSpotsByUser(req.params.userId)
            .then(function (response) {
                success(res, response);
            }, function (err) {
                error(res, err);
            })
    }

    function findSpotById(req, res) {
        spotDao.findSpotById(req.params.spotId)
            .then(function (response) {
                success(res, response);
            }, function (err) {
                error(res, err);
            })
    }

    function updateSpot(req, res) {
        var spot = req.body;
        spotDao.updateSpot(spot)
            .then(function (response) {
                findAllSpotsByUser(req, res);
            }, function (err) {
                error(res, err);
            })
    }

    function deleteSpot(req, res) {
        var spotId = req.params.spotId;
        spotDao.deleteFish(spotId)
            .then(function (response) {
                findAllSpotsByUser(req, res);
            }, function (err) {
                error(res, err);
            })
    }

    function success(res, data) {
        res.json(data);
    }

    function error(res, err) {
        res.json(err);
    }
};
