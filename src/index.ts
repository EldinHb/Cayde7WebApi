import { app, server } from './server';

const port = Number(process.env.PORT || 3000);

if (process.env.NODE_ENV === 'development') {
	server.listen(port, () => {
		console.log(`Express server listening on ${port} with self signed https`);
	});
} else {
	app.listen(port, () => {
		console.log(`Express server listening on ${port}`);
	});
}
