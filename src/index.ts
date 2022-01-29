import server from './server';

const port = Number(process.env.PORT || 5000);
server.listen(port, () => {
	console.log(`Express server listening on ${port}`);
});
