let validator = require('./validator');

/**
 * @param {import('yeoman-generator')} generator
 * @param {Object} moduleConfig
 */
exports.askForModuleDisplayName = (generator, moduleConfig) => {
	let moduleDisplayName = generator.options['moduleDisplayName'];
	if (moduleDisplayName) {
		moduleConfig.displayName = moduleDisplayName;
		return Promise.resolve();
	}
	if (generator.options['quick'] && moduleConfig.moduleNameFromCLI) {
		moduleConfig.displayName = moduleConfig.moduleNameFromCLI;
		return Promise.resolve();
	}

	return generator
		.prompt({
			type: 'input',
			name: 'displayName',
			message: '¿Cual es el nombre del módulo nuevo?',
			default: moduleConfig.moduleNameFromCLI || '',
			validate: validator.validateNonEmpty
		})
		.then((displayNameAnswer) => {
			moduleConfig.displayName = displayNameAnswer.displayName;
			moduleConfig.name = moduleConfig.displayName.toLowerCase();
		});
};

/**
 * Ask for module id ("name" in package.json)
 * @param {import('yeoman-generator')} generator
 * @param {Object} moduleConfig
 */
exports.askForModuleId = (generator, moduleConfig) => {
	let moduleName = generator.options['moduleId'];
	if (moduleName) {
		moduleConfig.name = moduleName;
		return Promise.resolve();
	}
	let def = moduleConfig.name;
	if (!def && moduleConfig.displayName) {
		def = moduleConfig.displayName.toLowerCase().replace(/[^a-z0-9]/g, '-');
	}
	if (def && generator.options['quick']) {
		moduleConfig.name = def;
		return Promise.resolve();
	}

	return generator
		.prompt({
			type: 'input',
			name: 'name',
			message: '¿Cual es el id de tu módulo?',
			default: def || '',
			validate: validator.validateModuleId
		})
		.then((nameAnswer) => {
			moduleConfig.name = nameAnswer.name;
		});
};

/**
 * Ask for module description
 * @param {import('yeoman-generator')} generator
 * @param {Object} moduleConfig
 */
exports.askForModuleDescription = (generator, moduleConfig) => {
	let moduleDescription = generator.options['moduleDescription'];
	if (moduleDescription) {
		moduleConfig.description = moduleDescription;
		return Promise.resolve();
	}
	if (generator.options['quick']) {
		moduleConfig.description = '';
		return Promise.resolve();
	}

	return generator
		.prompt({
			type: 'input',
			name: 'description',
			message: '¿Cuál es la descripción de este módulo?',
			default: ''
		})
		.then((descriptionAnswer) => {
			moduleConfig.description = descriptionAnswer.description;
		});
};

/**
 * @param {import('yeoman-generator')} generator
 * @param {Object} moduleConfig
 */
exports.askForModuleNamespace = (generator, moduleConfig) => {
	let moduleNamespace = generator.options['moduleNamespace'];
	if (moduleNamespace) {
		moduleConfig.namespace = moduleNamespace;
		return Promise.resolve();
	}
	if (generator.options['quick']) {
		moduleConfig.namespace = 'com.generator.namespace';
		return Promise.resolve();
	}

	return generator
		.prompt({
			type: 'input',
			name: 'namespace',
			message: '¿Cuál es el namespace de este módulo?',
			default: '',
			validate: validator.validateModuleNamespace
		})
		.then((namespaceAnswer) => {
			moduleConfig.namespace = namespaceAnswer.namespace;
		});
};

/**
 * @param {import('yeoman-generator')} generator
 * @param {Object} moduleConfig
 */
exports.askForGit = (generator, moduleConfig) => {
	let gitInit = generator.options['gitInit'];
	if (typeof gitInit === 'boolean') {
		moduleConfig.gitInit = Boolean(gitInit);
		return Promise.resolve();
	}
	if (generator.options['quick']) {
		moduleConfig.gitInit = false;
		return Promise.resolve();
	}

	return generator
		.prompt({
			type: 'confirm',
			name: 'gitInit',
			message: '¿Inicializar un repositorio en git?',
			default: false
		})
		.then((gitAnswer) => {
			moduleConfig.gitInit = gitAnswer.gitInit;
		});
};

/**
 * @param {import('yeoman-generator')} generator
 * @param {Object} moduleConfig
 */
exports.askForInstallDependencies = (generator, moduleConfig) => {
	let moduleInstallDependencies = generator.options['installDependencies'];

	if (typeof moduleInstallDependencies === 'boolean') {
		moduleConfig.installDependencies = Boolean(moduleInstallDependencies);
		return Promise.resolve();
	}

	if (generator.options['quick']) {
		moduleConfig.installDependencies = true;
		return Promise.resolve();
	}

	return generator
		.prompt({
			type: 'confirm',
			name: 'installDependencies',
			message: '¿Instalar dependencias del módulo?',
			default: true
		})
		.then((installDependenciesAnswer) => {
			moduleConfig.installDependencies = installDependenciesAnswer.installDependencies;
		});
};

/**
 * @param {import('yeoman-generator')} generator
 * @param {Object} moduleConfig
 */
exports.askForPackageManager = (generator, moduleConfig) => {
	let pkgManager = generator.options['pkgManager'];
	if (pkgManager === 'npm' || pkgManager === 'yarn') {
		moduleConfig.pkgManager = pkgManager;
		return Promise.resolve();
	}

	moduleConfig.pkgManager = 'npm';
	if (generator.options['quick']) {
		return Promise.resolve();
	}

	return generator
		.prompt({
			type: 'list',
			name: 'pkgManager',
			message: '¿Cuál gestor de paquetes usar?',
			choices: [
				{
					name: 'npm',
					value: 'npm'
				},
				{
					name: 'yarn',
					value: 'yarn'
				}
			]
		})
		.then((pckgManagerAnswer) => {
			moduleConfig.pkgManager = pckgManagerAnswer.pkgManager;
		});
};
