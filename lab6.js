async function createMap(){
    var map = L.map('map').setView([39.8283, -90.5795], 3);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    n = 1


    while (n <=3){
        latitude = getRandomInRange(30,35,3)
        longitude = getRandomInRange(-90,-100,3)
        const localityData = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
            .then((res)=>res.json())
            .then((resJson) => {
            const locality = resJson.locality
            document.getElementById(`marker${n}Locality`).innerHTML = (`Locality: ${locality}`)

        })
        console.log(latitude, longitude)
        var marker = L.marker([latitude, longitude]).addTo(map);
        document.getElementById(`marker${n}Location`).innerHTML = `Marker${n}: Latitude: ${latitude}, Longitude: ${longitude}`
        n = n +1

    }
}


function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}
        

window.onload = createMap()