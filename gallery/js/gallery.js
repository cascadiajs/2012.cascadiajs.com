$(function () {    
    "use strict";
    var CLIENTID = "000000004C0D630A", // client_id needed for the SkyDrive API
        REDIRECT_URL = "http://cascadiajs.com/gallery/", // redirect_url for the SkyDrive API 
        directoryName = "CascadiaJsPhotos", //directory in which we are going to search for photos
        photosArray = new Array(10), // 10 x n bidimensional array to reference every photo taken from SkyDrive (within tiles: 5 for front ones, 5 for back ones)
        currentPhotosArray = 0, // photosArray index where to add new incoming photos
        lastDate, // last date we look for new photos
        fotosdirectory, // fotosdirectory id
        loginControl;

    init();

    /**
    * Initializes the SkyDrive API
    **/
    function init() {
        WL.Event.subscribe("auth.login", onLogin);
        WL.Event.subscribe("auth.logout", onLogout);
        // imgsArray.push(document.getElementById("img1"));
        // imgsArray.push(document.getElementById("img2"));
        WL.init({
            client_id: CLIENTID,
            redirect_uri: REDIRECT_URL,
            scope: "wl.signin",
            response_type: "token"
        });      
    }
   

    $('#logintext').click(function () {
        loginControl = document.getElementById("logintext");
        if (loginControl.innerText === "Sign in") {           
            WL.login({
                scope: ["wl.signin", "wl.basic","wl.photos", "wl.skydrive"]
            });
            
        }
        else {
            WL.logout();
            
        }
    });

    /**
    * Gets all files images in full size and add the urls to the photosArray
    **/
    function getFiles(response) {
        var items = response.data,
            i;

        // photosArray initialization
        for ( i = 0; i < photosArray.length; i++) {
            photosArray[i] =[];
        }

        // photosArray initial filling with full-size photos received from SkyDrive
        for ( i = 0; i < items.length; i++) {
            photosArray[i % 10].push({src: items[i].images[3].source});
        }

        // Current date in order to check for new photos in a future
        lastDate = new Date();

        // Live tiles set-up
        $("#tile1").liveTile({
            mode: 'flip',
            frontImages: photosArray[0],
            backImages: photosArray[1],
            // do *not* choose images in sequence from the array
            frontIsRandom: true,
            backIsRandom: true
        });
        $("#tile2").liveTile({
            mode: 'flip',
            frontImages: photosArray[2],
            backImages: photosArray[3],
            frontIsRandom: true,
            backIsRandom: true
        });
        $("#tile3").liveTile({
            mode: 'flip',
            frontImages: photosArray[4],
            backImages: photosArray[5],
            frontIsRandom: true,
            backIsRandom: true
        });
        $("#tile4").liveTile({
            mode: 'flip',
            frontImages: photosArray[6],
            backImages: photosArray[7],
            frontIsRandom: true,
            backIsRandom: true
        });
        $("#tile5").liveTile({
            mode: 'flip',
            frontImages: photosArray[8],
            backImages: photosArray[9],
            frontIsRandom: true,
            backIsRandom: true
        });

        $(".live-tile, .flip-list").not(".exclude").liveTile();
    }

    /**
    * Search for the directory and gets all photos
    **/
    function getDirectory(response) {
        var items = response.data,
            i;
        for (i = 0; i < items.length; i++) {
            if (items[i].name === directoryName) {
                fotosdirectory = items[i].id;
            }
        }

        WL.api({
            path: fotosdirectory + "/files",
            method: "GET"
        }).then(
            getFiles,
            function (responseFailed) {
                console.log("Error reading folder properties: " + responseFailed.error.message);
            }
        );
    }

    /**
    * When we log, we gets all photos
    **/
    function onLogin(session) {
        document.getElementById("logintext").innerText = "Sign Out";
        document.getElementById("mySign").className = "signout";
        if (!session.error) {
            WL.api({
                path: "me",
                method: "GET"
            });
            WL.api({ path: "/me/albums/", method: "GET" }).then(
                getDirectory,
               function (response) {
                   console.log("Could not access albums, status = " +
                       JSON.stringify(response.error).replace(/,/g, ",\n"));
               });
        }
        else {
            console.log("Error signing in: " + session.error_description);
        }
        //Sets the chekNewPhotos every 30 seconds
        setInterval(checkNewPhotos, 30000);
    }

    function onLogout(session) {
        loginControl.innerText = "Sign in";
        document.getElementById("mySign").className = "signin";
        setTimeout(function () { window.location.href = 'index.html'; }, 1000);
        
        clearInterval(checkNewPhotos);
    }



    /**
    * Checks for new fotos in the directory
    **/
    function checkNewPhotos() {
        WL.api({
            path: fotosdirectory + "/files",
            method: "GET"
        }).then(function (response) {
            var itemDate,
            items = response.data,
            i;

            for ( i = 0; i < items.length; i++) {
                itemDate = parseISO8601(items[i].updated_time);

                if (itemDate >= lastDate) {
                    photosArray[currentPhotosArray].push({src: items[i].images[3].source});

                    if (++currentPhotosArray >= photosArray.length) {
                        currentPhotosArray = 0;
                    }
                }
            }

            lastDate = new Date();
        }, function (responseFailed) {
            console.log("Error reading folder properties: " + responseFailed.error.message);
        });
    }

    

    /**
    * Converts a ISO8601 date string and returns a Date object
    **/
    function parseISO8601(str) {
        // we assume str is a UTC date ending in 'Z'

        var parts = str.split('T'),
            dateParts = parts[0].split('-'),
            timeParts = parts[1].split('Z'),
            timeSubParts = timeParts[0].split(':'),
            timeSecParts = timeSubParts[2].split('.'),
            timeHours = Number(timeSubParts[0]),
            _date = new Date();

        _date.setUTCFullYear(Number(dateParts[0]));
        _date.setUTCMonth(Number(dateParts[1]) - 1);
        _date.setUTCDate(Number(dateParts[2]));
        _date.setUTCHours(Number(timeHours));
        _date.setUTCMinutes(Number(timeSubParts[1]));
        _date.setUTCSeconds(Number(timeSecParts[0].split('+')[0]));
        if (timeSecParts[1]) {
            _date.setUTCMilliseconds(Number(timeSecParts[1]));
        }

        // by using setUTC methods the date has already been converted to local time(?)
        return _date;
    }

    
});



