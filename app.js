function getip(reponse) {
    const currentIP = reponse.ip;
    xhr(currentIP);
}

document.querySelector('.ip-tracker__form').addEventListener('submit', function(e) {
    const ipField = document.querySelector('#ip').value;
    let search = defineSearch();
    xhr(ipField, search);
    e.preventDefault();
})

function xhr(ip, urlAppend) {
    let url = '';
    const api_key = 'at_1Pokw2l7ogfzCbZ9GY9j4uRsfpolD';
    if(urlAppend) {
        url = `https://geo.ipify.org/api/v1?apiKey=${api_key}${urlAppend}`;
    } else {
        url = `https://geo.ipify.org/api/v1?apiKey=${api_key}`;
    }

    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.onload = function() {
        if(this.status === 200) {
            const data = JSON.parse(xhr.responseText)
            // console.table(data);
            ipData(data);

            // to initialize the map again
            initializingMap();
            displayMap(data);
        }
    }
    xhr.send();
}

function ipData(data) {
    const ipData = document.querySelector('.ip_data');
    const locationData = document.querySelector('.location_data');
    const timezoneData = document.querySelector('.timezone_data');
    const ispData = document.querySelector('.isp_data');
    let stateAbbrev = '';

    ipData.innerHTML = data.ip;
    states.forEach(state => {
        // console.log(state.name);
        if(data.location.region === state.name) {
            stateAbbrev = state.abbreviation;
        }
    });
    locationData.innerHTML = `${data.location.city}, ${stateAbbrev} ${data.location.postalCode}`;
    timezoneData.innerHTML = `UTC${data.location.timezone}`;
    ispData.innerHTML = `${data.isp}`;
}

function displayMap(data) {
    var mymap = L.map('map').setView([`${data.location.lat}`, `${data.location.lng}`], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYW5kcmVzLWd1ZXJyZXJvIiwiYSI6ImNraHYyazluYTB6a28yem4zZHQ5Yjd0aDYifQ.1wjPg4323HXwnB9EbuwguQ'
    }).addTo(mymap);

    var myIcon = L.icon({
        iconUrl: 'images/pointer@2x.png',
        iconSize: [68, 64],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        shadowSize: [50, 52],
        shadowAnchor: [22, 94]
    });
    
    L.marker([`${data.location.lat}`, `${data.location.lng}`], {icon: myIcon}).addTo(mymap);
}

function initializingMap() {
    var container = L.DomUtil.get('map');
    if(container != null){
        container._leaflet_id = null;
    }
}

function validateEmail(email) {
    let re = /\S+@\S+\.\S+/;
    if (re.test(email)) {
        return email;
    }
}

function validateDomain(domain) {
    let regExp = /^(?:(?:(?:[a-zA-z\-]+)\:\/{1,3})?(?:[a-zA-Z0-9])(?:[a-zA-Z0-9\-\.]){1,61}(?:\.[a-zA-Z]{2,})+|\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)\]|(?:(?:[0-9]{1,3})(?:\.[0-9]{1,3}){3}))(?:\:[0-9]{1,5})?$/;
    if(regExp.test(domain)) {
        return domain;
    }
}

function validateIP(ip) {
    let regExp = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if(regExp.test(ip)) {
        return ip;
    }
}

function defineSearch() {
    const search = document.querySelector('#ip').value;
    let urlAppend = '';
    if(validateEmail(search)) {
        urlAppend = `&email=${search}`;
    } else if(validateDomain(search)) {
        urlAppend = `&domain=${search}`;
    } else if(validateIP(search)) {
        urlAppend = `&ipAddress=${search}`;
    } else {
        errorMessage()
    }
    return urlAppend;
}

function errorMessage() {
    const container = document.querySelector('.ip-tracker-wrapper');
    const formContainer = document.querySelector('.ip-tracker');
    const div = document.createElement('div');
    div.classList = 'error';
    div.appendChild(document.createTextNode('Input correct search term'));
    container.insertBefore(div, formContainer);

    setTimeout(clearError, 3000);
}

function clearError() {
    const error = document.querySelector('.error');
    if(error) {
        document.querySelector('.error').remove();
    }
}

const states = [
    {
        "name": "Alabama",
        "abbreviation": "AL"
    },
    {
        "name": "Alaska",
        "abbreviation": "AK"
    },
    {
        "name": "American Samoa",
        "abbreviation": "AS"
    },
    {
        "name": "Arizona",
        "abbreviation": "AZ"
    },
    {
        "name": "Arkansas",
        "abbreviation": "AR"
    },
    {
        "name": "California",
        "abbreviation": "CA"
    },
    {
        "name": "Colorado",
        "abbreviation": "CO"
    },
    {
        "name": "Connecticut",
        "abbreviation": "CT"
    },
    {
        "name": "Delaware",
        "abbreviation": "DE"
    },
    {
        "name": "District Of Columbia",
        "abbreviation": "DC"
    },
    {
        "name": "Federated States Of Micronesia",
        "abbreviation": "FM"
    },
    {
        "name": "Florida",
        "abbreviation": "FL"
    },
    {
        "name": "Georgia",
        "abbreviation": "GA"
    },
    {
        "name": "Guam",
        "abbreviation": "GU"
    },
    {
        "name": "Hawaii",
        "abbreviation": "HI"
    },
    {
        "name": "Idaho",
        "abbreviation": "ID"
    },
    {
        "name": "Illinois",
        "abbreviation": "IL"
    },
    {
        "name": "Indiana",
        "abbreviation": "IN"
    },
    {
        "name": "Iowa",
        "abbreviation": "IA"
    },
    {
        "name": "Kansas",
        "abbreviation": "KS"
    },
    {
        "name": "Kentucky",
        "abbreviation": "KY"
    },
    {
        "name": "Louisiana",
        "abbreviation": "LA"
    },
    {
        "name": "Maine",
        "abbreviation": "ME"
    },
    {
        "name": "Marshall Islands",
        "abbreviation": "MH"
    },
    {
        "name": "Maryland",
        "abbreviation": "MD"
    },
    {
        "name": "Massachusetts",
        "abbreviation": "MA"
    },
    {
        "name": "Michigan",
        "abbreviation": "MI"
    },
    {
        "name": "Minnesota",
        "abbreviation": "MN"
    },
    {
        "name": "Mississippi",
        "abbreviation": "MS"
    },
    {
        "name": "Missouri",
        "abbreviation": "MO"
    },
    {
        "name": "Montana",
        "abbreviation": "MT"
    },
    {
        "name": "Nebraska",
        "abbreviation": "NE"
    },
    {
        "name": "Nevada",
        "abbreviation": "NV"
    },
    {
        "name": "New Hampshire",
        "abbreviation": "NH"
    },
    {
        "name": "New Jersey",
        "abbreviation": "NJ"
    },
    {
        "name": "New Mexico",
        "abbreviation": "NM"
    },
    {
        "name": "New York",
        "abbreviation": "NY"
    },
    {
        "name": "North Carolina",
        "abbreviation": "NC"
    },
    {
        "name": "North Dakota",
        "abbreviation": "ND"
    },
    {
        "name": "Northern Mariana Islands",
        "abbreviation": "MP"
    },
    {
        "name": "Ohio",
        "abbreviation": "OH"
    },
    {
        "name": "Oklahoma",
        "abbreviation": "OK"
    },
    {
        "name": "Oregon",
        "abbreviation": "OR"
    },
    {
        "name": "Palau",
        "abbreviation": "PW"
    },
    {
        "name": "Pennsylvania",
        "abbreviation": "PA"
    },
    {
        "name": "Puerto Rico",
        "abbreviation": "PR"
    },
    {
        "name": "Rhode Island",
        "abbreviation": "RI"
    },
    {
        "name": "South Carolina",
        "abbreviation": "SC"
    },
    {
        "name": "South Dakota",
        "abbreviation": "SD"
    },
    {
        "name": "Tennessee",
        "abbreviation": "TN"
    },
    {
        "name": "Texas",
        "abbreviation": "TX"
    },
    {
        "name": "Utah",
        "abbreviation": "UT"
    },
    {
        "name": "Vermont",
        "abbreviation": "VT"
    },
    {
        "name": "Virgin Islands",
        "abbreviation": "VI"
    },
    {
        "name": "Virginia",
        "abbreviation": "VA"
    },
    {
        "name": "Washington",
        "abbreviation": "WA"
    },
    {
        "name": "West Virginia",
        "abbreviation": "WV"
    },
    {
        "name": "Wisconsin",
        "abbreviation": "WI"
    },
    {
        "name": "Wyoming",
        "abbreviation": "WY"
    }
]