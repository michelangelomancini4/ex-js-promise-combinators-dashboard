async function fetchJson(url) {
    const response = await fetch(url);
    const obj = await response.json();
    return obj;
}


async function getDashboardData(query) {


    // Create promises for all fetch requests (destinations, weather, airports)

    const destinationsPromise = fetchJson(`http://localhost:3333/destinations?search=${query}`);
    const weathersPromise = fetchJson(`http://localhost:3333/weathers?search=${query}`);
    const airportsPromise = fetchJson(`http://localhost:3333/airports?search=${query}`);


    // Run all promises  using Promise.all
    const promises = [destinationsPromise, weathersPromise, airportsPromise];
    const [destinations, weathers, airports] = await Promise.all(promises);

    const destination = destinations[0]
    const weather = weathers[0]
    const airport = airports[0]



    return {
        city: destination?.name || null,
        country: destination?.country || null,
        temperature: weather?.temperature || null,
        weather: weather?.weather_description || null,
        airport: airport?.name || null
    }

}
getDashboardData('vienna')
    .then(data => {
        console.log('Dasboard data:', data);
        let frase = '';
        if (data.city !== null && data.country !== null) {
            frase += `${data.city} is in ${data.country}.\n`

        }

        if (data.temperature !== null && data.weather !== null) {
            frase += `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`
        }

        if (data.airport !== null) {
            frase += `The main airport is ${data.airport}.\n`
        }

        console.log(frase);
    })
    .catch(error => console.error(error));
