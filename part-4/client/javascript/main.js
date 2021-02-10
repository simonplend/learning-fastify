function displayApiResponse(response) {
	const apiResponseElement = document.getElementById("api-response");
	apiResponseElement.innerText = response;
}

async function makeApiRequest(apiUrl) {
	let apiResponse;

	try {
		apiResponse = await fetch(apiUrl);

		if (apiResponse.ok) {
			const weatherData = await apiResponse.json();

			let formattedWeatherData = "The current weather in London is:\n\n";
			formattedWeatherData += JSON.stringify(weatherData, null, 2);

			displayApiResponse(formattedWeatherData);
		} else {
			throw new Error("Error loading weather data:");
		}
	} catch (error) {
		console.error(error);

		let errorMessage = `${error.message}\n\n`;

		try {
			const parsedJson = await apiResponse.json();
			errorMessage += JSON.stringify(parsedJson, null, 2);
		} catch (error) {
			errorMessage += await apiResponse.text();
		}

		displayApiResponse(errorMessage);
	}
}

const apiUrl = "http://example-weather-api.com/cities/london";

makeApiRequest(apiUrl);
