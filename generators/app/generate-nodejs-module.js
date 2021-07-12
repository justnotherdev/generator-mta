const prompts = require('./prompts');
let validator = require('./validator');

module.exports = {
	id: 'mod-nodejs',
	aliases: ['nodejs'],
	name: 'NodeJS - Express (Backend)',
	/**
	 * @param {import('yeoman-generator')} generator
	 * @param {Object} moduleConfig
	 */
	prompting: async (generator, moduleConfig) => {
		await prompts.askForModuleDisplayName(generator, moduleConfig);
		await prompts.askForModuleId(generator, moduleConfig);
		await prompts.askForModuleDescription(generator, moduleConfig);
		await prompts.askForInstallDependencies(generator, moduleConfig);
	},
	/**
	 * @param {import('yeoman-generator')} generator
	 * @param {Object} moduleConfig
	 */
	writing: (generator, moduleConfig) => {
		generator.fs.copy(`${generator.sourceRoot()}/tsconfig.json`, 'tsconfig.json');
		generator.fs.copy(`${generator.sourceRoot()}/default-env.example.json`, 'default-env.json');
		generator.fs.copyTpl(`${generator.sourceRoot()}/README.md`, 'README.md', moduleConfig);
		generator.fs.copyTpl(`${generator.sourceRoot()}/package.json`, 'package.json', moduleConfig);
		generator.fs.copy(`${generator.sourceRoot()}/.prettierrc`, '.prettierrc');
		generator.fs.copy(`${generator.sourceRoot()}/.prettierignore`, '.prettierignore');
		generator.fs.copy(`${generator.sourceRoot()}/.huskyrc`, '.huskyrc');
		generator.fs.copy(`${generator.sourceRoot()}/.eslintrc`, '.eslintrc');
		generator.fs.copy(`${generator.sourceRoot()}/.editorconfig`, '.editorconfig');
		generator.fs.copy(`${generator.sourceRoot()}/.commitlintrc.js`, '.commitlintrc.js');
		generator.fs.copy(`${generator.sourceRoot()}/.env.example`, '.env');
		generator.fs.copy(`${generator.sourceRoot()}/assets`, 'assets', moduleConfig);
		generator.fs.copy(`${generator.sourceRoot()}/src`, 'src', moduleConfig);

		if (moduleConfig.gitInit) {
			generator.fs.copy(`${generator.sourceRoot()}/.gitignore`, '.gitignore');
		}
	}
};
