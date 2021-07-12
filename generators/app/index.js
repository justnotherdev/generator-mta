const Generator = require('yeoman-generator');
const yosay = require('yosay');
const yodasay = require('yodasay');
const remote = require('yeoman-remote');
const fs = require('fs');

const path = require('path');
const env = require('./env');

const execSync = require('child_process').execSync;

const ui5Module = require('./generate-ui5-module');
const nodejsModule = require('./generate-nodejs-module');
const reactModule = require('./generate-react-module');

const moduleGenerators = [ui5Module, nodejsModule];

module.exports = class extends Generator {
	constructor(args, opts) {
		super(args, opts);
		this.description = 'Genera un módulo MTA estructurado listo para iniciar desarrollo.';
		this.devName = execSync('id -F', {encoding: 'utf-8'}).split(' ')[0];

		this.option('moduleType', {
			type: String,
			alias: 't',
			description:
				moduleGenerators
					.slice(0, 6)
					.map((e) => e.aliases[0])
					.join(', ') + '...'
		});
		this.option('moduleDisplayName', {
			type: String,
			alias: 'n',
			description: 'Display name of the module'
		});
		this.option('moduleId', {
			type: String,
			alias: 'n',
			description: 'Id of the  module'
		});
		this.option('moduleDescription', {
			type: String,
			description: 'Description of the module'
		});
		this.option('pkgManager', {type: String, description: "'npm' or 'yarn'"});
		this.option('gitInit', {type: Boolean, description: `Initialize a git repo`});
		this.option('installDependencies', {type: Boolean, description: `Install dependencies of the project`});

		this.moduleConfig = Object.create(null);
		//this.moduleConfig.installDependencies = false;

		this.moduleGenerator = undefined;

		this.abort = false;
	}

	async initializing() {
		// Welcome
		this.log(yosay(`Buenos días ${this.devName || 'Astete'}, Bienvenido al generador de módulos MTA`));
		// evaluateEngineVersion
		//const dependencyVersions = await env.getDependencyVersions();
		//this.moduleConfig.dependencyVersions = dependencyVersions;
		/*this.moduleConfig.dep = function (name) {
			const version = dependencyVersions[name];
			if (typeof version === 'undefined') {
				throw new Error(`Module ${name} is not listed in env.js`);
			}
			return `${JSON.stringify(name)}: ${JSON.stringify(version)}`;
		};*/
	}

	async prompting() {
		// Ask for module type
		const moduleType = this.options['moduleType'];
		if (moduleType) {
			// const moduleTypeId = `mod-${moduleType}`;
			const moduleGenerator = moduleGenerators.find((g) => g.aliases.indexOf(moduleType) !== -1);
			if (moduleGenerator) {
				this.moduleConfig.type = moduleGenerator.id;
			} else {
				this.log(`No encontré el tipo de módulo ${moduleType} \nLos tipos de modulos que conozco son: ${moduleGenerators.map((g) => g.aliases.join(', ')).join(', ')}`);
				this.abort = true;
			}
		} else {
			const choices = [];
			for (const modeGen of moduleGenerators) {
				const name = modeGen.name;
				if (name) {
					choices.push({name, value: modeGen.id});
				}
			}
			this.moduleConfig.type = (
				await this.prompt({
					type: 'list',
					name: 'type',
					message: '¿Que tipo de módulo deseas crear?',
					pageSize: choices.length,
					choices
				})
			).type;
		}

		this.moduleGenerator = moduleGenerators.find((g) => g.id === this.moduleConfig.type);
		try {
			await this.moduleGenerator.prompting(this, this.moduleConfig);
		} catch (e) {
			this.abort = true;
		}
	}

	// Write files
	writing() {
		if (this.abort) {
			return;
		}
		if (!this.options['destination']) {
			this.destinationRoot(this.destinationPath(this.moduleConfig.name));
		}

		this.log();
		this.log(`Conectando con repositorio remoto...`);
		this.log(`Obteniendo plantilla elegida del servidor...`);

		// @ts-ignore
		const done = this.async();
		let repoName = `${this.moduleGenerator.aliases[0]}-boilerplate`;
		console.log(repoName);
		remote('justnotherdev', repoName, 'template', (err, cachePath) => {
			if (err != null) {
				this.log('Hubo un error al conectar con el repositorio');
				this.log(err);
				this.abort = true;
				return this.end();
			}
			// Set Template Path (Temporal Cache Folder)
			this.sourceRoot(cachePath);
			this.log(`Escribiendo en ${this.destinationPath()}...`);
			this.moduleGenerator.writing(this, this.moduleConfig);
			done();
			return;
		});
	}

	// Installation
	install() {
		if (this.abort) {
			return;
		}
		if (this.moduleConfig.installDependencies) {
			this.installDependencies({
				yarn: true,
				npm: false,
				bower: false
			});
		}
	}

	end() {
		if (this.abort) {
			return this.log('Hubo un error inesperado!');
		}

		this.log('');
		this.log(`¡Su módulo ${this.moduleConfig.displayName} fue creado correctamente!`);
		this.log('');
	}
};
