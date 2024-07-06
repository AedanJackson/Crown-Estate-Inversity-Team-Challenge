var map = L.map('map').setView([54.010351, -3.515625], 5);

// Load and display tile layer on the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Function to create marker with specified icon

// Function to create marker with specified icon
function createMarker(latitude, longitude, iconUrl, windFarm, proposed) {
    var customIcon = L.icon({
        iconUrl: iconUrl,
        iconSize: [25, 41], // Size of the icon
        iconAnchor: [12, 41], // Point of the icon which corresponds to marker's location
        popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
    });

    var marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(map);
    
    marker.on('click', function() {
        var infoDiv = document.getElementById('info');
        infoDiv.innerHTML = `
            <h3 class="navy-text">${windFarm.name}</h3>

            <h4>Energy output</h4>
            <div class="data-point">
                <img src="static/img/icon-windmill.svg" classname="data-point-icon"></img>
                <div class="data-point-text">
                    <p><b>Number of turbines</b></p>
                    <p>There are <b>${windFarm.num_turbines} turbines</b> on this wind farm</p>
                </div>
            </div>
            <div class="data-point">
                <img src="static/img/icon-energy.svg" classname="data-point-icon"></img>
                <div class="data-point-text">
                    <p><b>Energy generated per hour (J)</b></p>
                    <p>This generates <b>${windFarm.capacity_mw}MW</b></p>
                </div>
            </div>
            <div class="data-point">
                <img src="static/img/icon-homes.svg" classname="data-point-icon"></img>
                <div class="data-point-text">
                    <p><b>Number of homes powered</b></p>
                    <p>${windFarm.houses_powered}</p>
                </div>
            </div>

            <h4>Environmental factors</h4>
            <div class="data-point">
                <img src="static/img/icon-wind.svg" classname="data-point-icon"></img>
                <div class="data-point-text">
                    <p><b>Wind speed (m/s)</b></p>
                    <p>This wind farm has an average wind speed of <b>${windFarm.wind_speed_mps}</b></p>
                </div>
            </div>
            <div class="data-point">
                <img src="static/img/icon-animals.svg" classname="data-point-icon"></img>
                <div class="data-point-text">
                    <p><b>Nearby wildlife species</b></p>
                    <p>${windFarm.wildlife_info}</p>
                </div>
            </div>
            <div class="data-point">
                <img src="static/img/icon-noise.svg" classname="data-point-icon"></img>
                <div class="data-point-text">
                    <p><b>Noise (db)</b></p>
                    <p>This wind farm generates <b>${windFarm.noise_dba} decibels of sound</b></p>
                </div>
            </div>

            ${proposed ? `
                <form id="feedbackForm">
                    <input type="text" id="feedback" placeholder="Enter feedback">
                    <button type="submit">Submit</button>
                </form>
            ` : ''}
        `;
    });
}

// Fetch actual wind farm data
fetch('/get_wind_farms')
    .then(response => response.json())
    .then(data => {
        data.forEach(windFarm => {
            createMarker(windFarm.latitude, windFarm.longitude, '/static/img/green-location-marker.svg', windFarm, false);
        });
    })
    .catch(error => console.error('Error fetching wind farm data:', error));

// Fetch proposed wind farm data
fetch('/get_proposed_wind_farms')
    .then(response => response.json())
    .then(data => {
        data.forEach(windFarm => {
            createMarker(windFarm.latitude, windFarm.longitude, '/static/img/orange-location-marker.svg', windFarm, true);
        });
    })
    .catch(error => console.error('Error fetching proposed wind farm data:', error));