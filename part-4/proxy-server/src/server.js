import createFastifyServer from "fastify";
import fastifyHttpProxy from "fastify-http-proxy";

const fastify = createFastifyServer({
	logger: true
});

fastify.register(fastifyHttpProxy, {
	upstream: "http://example-weather-api.com",
	undici: true,
	replyOptions: {
		rewriteRequestHeaders: (originalRequest, headers) => {
			return {
				...headers,
				"X-Api-Key": process.env.API_KEY
			};
		}
	}
});

try {
	await fastify.listen(3000);
} catch (error) {
	fastify.log.error(error);
	process.exit(1);
}
