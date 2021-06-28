module.exports.getDependencyVersions = async function (moduleType) {
	let devDependencies = {
		eslint: '^7.19.0',
		'@prettier/plugin-xml': '^0.13.0',
		'@ui5/cli': '^2.9.1',
		commitlint: '^11.0.0',
		editorconfig: '^0.15.3',
		'eslint-config-prettier': '^7.2.0',
		'eslint-plugin-prettier': '^3.3.1',
		husky: '^4.3.8',
		prettier: '^2.2.1'
	};

	switch (moduleType) {
		case 'ui5Module':
			Object.assign(devDependencies, {
				'ui5-middleware-index': '^0.2.2',
				'ui5-middleware-livereload': '^0.5.1',
				'ui5-middleware-livetranspile': '^0.3.0',
				'ui5-middleware-simpleproxy': '^0.7.0',
				'ui5-task-transpile': '^0.3.0'
			});
			break;
		default:
			break;
	}

	return devDependencies;
};
