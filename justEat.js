

function fetchResturantsService(outcode) {

    return new Promise((resolve, reject) => {
        if (!outcode) {
            return reject(Error('outcode not provided'));
        }
        let xhttp = new XMLHttpRequest();
        xhttp.onerror = () => {
            reject(Error('It broke'));
        }
        xhttp.onload = () => {
            if (xhttp.readyState == XMLHttpRequest.DONE) {
                if (xhttp.status == 400) {
                    return reject(Error('400'));
                }
                if (xhttp.responseText) {
                    resolve(JSON.parse(xhttp.responseText).Restaurants);
                }
                else {
                    reject(Error('nothing to show'));
                }
            }
        }
        xhttp.open('GET', `https://public.je-apis.com/restaurants?q=${outcode}`, true);
        xhttp.setRequestHeader('Authorization', 'Basic VGVjaFRlc3RBUEk6dXNlcjI=');
        xhttp.setRequestHeader('Accept-Tenant', 'uk');
        xhttp.setRequestHeader('Accept-Language', 'en-GB');
        xhttp.send();
    });

}

function getRestaurants() {

    let outcode = document.getElementById('outcode').value;
    fetchResturantsService(outcode).then((result) => {
        createList(result);
    }).catch(error => {
        console.log(error);
    })
    
}

function createList(restaurants) {

    let ul = document.getElementById('restaurants');
    let innerHtml = '';
    for (let i = 0; i < restaurants.length; i++) {
        let restaurant = '';
        restaurant += `
        <ul>
        <li>Name: ${restaurants[i].Name}</li>
        <li>Rate: ${restaurants[i].RatingAverage}</li>`
        let types = restaurants[i].CuisineTypes;
        let typesHtml = '<ul>'
        console.log(types.length);
        for (let j = 0; j < types.length; j++) {
            typesHtml += `<li>${types[j].Name}</li>`
        }
        typesHtml += '</ul>'
        restaurant += `<li>Cuisine Types: ${typesHtml}</li>`
        innerHtml += '<li>' + restaurant + '</li>'
        innerHtml += '</ul>';
    }
    ul.innerHTML = innerHtml;

}

