const DrugQueryOracle = require("./drugQueryOracle.js");

const main = async () => {
	const drugQueryOracle = new DrugQueryOracle();
	await drugQueryOracle.init();
	await drugQueryOracle.register();
	await drugQueryOracle.startPolling();
};

main();
