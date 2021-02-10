// api/src/server.js

import createFastifyServer from "fastify";
import Cors from "fastify-cors";
import Sensible from "fastify-sensible";

const fastify = createFastifyServer({
	logger: true,
});

fastify.register(Cors, {
	origin: true
});

fastify.register(Sensible);

const routeOptions = {
	schema: {
		headers: {
			type: "object",
			required: ["x-api-key"],
			properties: {
				"x-api-key": { type: "string" }
			}
		}
	}
};

fastify.get("/cities/london", routeOptions, async (request, reply) => {
	const apiKeyisValid = request.headers["x-api-key"] === process.env.EXPECTED_API_KEY;
	if (!apiKeyisValid) {
		throw fastify.httpErrors.unauthorized("Invalid API key");
	}

	return {
		description: "light snow",
		temperatureActual: 1,
		temperatureFeelsLike: -3
	};
});

try {
	await fastify.listen(80);
} catch (error) {
	fastify.log.error(error);
	process.exit(1);
}
