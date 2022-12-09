
var animalContainer = document.getElementById("animal-info");
var btn = document.getElementById("btn");

btn.addEventListener("click", function () {
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://restcountries.com/v2/all?fields=name,nativeName,borders,flag.json');
    ourRequest.onload = function () {
        if (ourRequest.status >= 200 && ourRequest.status < 400) {
            var ourData = JSON.parse(ourRequest.responseText);
            renderHTML(ourData);
        } else {
            console.log("We connected to the server, but it returned an error.");
        }

    };

    ourRequest.onerror = function () {
        console.log("Connection error");
    };

    ourRequest.send();

});

function renderHTML(data) {
    var htmlString = "";

    for (i = 0; i < data.length; i++) {
        htmlString += "<p> name" + data[i].name + "<br> with native name " + data[i].nativeName + "<br>";
        htmlString += "and borders: <br>"
        htmlString += data[i].borders + "<br>";

        htmlString += data[i].borders[0];
        htmlString += "<br>"


        // for (let j = 0; j < data[i].borders.length; i++) {

        //     htmlString += data[i].borders[j][1];
        //     htmlString += "<br>"
        // }




        // for (ii = 0; ii < data[i].borders.length; ii++) {
        //     htmlString += data[i].borders[ii] + "<br>";
        // }
        // for (ii = 0; ii < data[i].foods.likes.length; ii++) {
        //     if (ii == 0) {
        //         htmlString += data[i].foods.likes[ii];
        //     } else {
        //         htmlString += " and " + data[i].foods.likes[ii];
        //     }
        // }



        // for (ii = 0; ii < data[i].foods.dislikes.length; ii++) {
        //     if (ii == 0) {
        //         htmlString += data[i].foods.dislikes[ii];
        //     } else {
        //         htmlString += " and " + data[i].foods.dislikes[ii];
        //     }
        // }

        htmlString += '.</p>';

    }

    animalContainer.insertAdjacentHTML('beforeend', htmlString);
}