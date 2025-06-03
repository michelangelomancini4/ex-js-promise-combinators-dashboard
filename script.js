

async function getDashboardData(query) {

    // chiamate per dati generali città

    const destinations = await fetch(`http://localhost:3333/destinations?search=${query}`)
    const city = await destinations.json();

    console.log('Città:', city[0].name);
    console.log("Nazione: ", city[0].country);


    // chiamate per reperire info meteo

    const weathers = await fetch(`http://localhost:3333/weathers?search=${query}`)
    const weather = await weathers.json();

    console.log('La temperatura è di :', weather[0].temperature, "°");
    console.log("Descrizione meteo:", weather[0].weather_description);


    //  chiamate per reperire nome aereporto principale

    const airports = await fetch(`http://localhost:3333/airports?search=${query}`)
    const airport = await airports.json();

    console.log("Nome aereporto principale:", airport[0].name);




}

getDashboardData('paris')
