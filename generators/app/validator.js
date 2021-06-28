let nameRegex = /^[a-z0-9][a-z0-9\-]*$/i;
let displayNameRegex = /^\S+\w{5,32}$/i;
let namespaceRegex = /^(\w+(\.\w+)*)(\w+(\.\w+)*)*$/i;

module.exports.validatePublisher = function (publisher) {
	if (!publisher) {
		return 'Falta el nombre del fabricante (publisher)';
	}

	if (!nameRegex.test(publisher)) {
		return 'Nombre de fabricante (publisher) inválido';
	}

	return true;
};

module.exports.validateNonEmpty = function (name) {
	if (!(name && name.length > 0)) {
		return 'Missing module display name';
	}

	return true;
};

module.exports.validateModuleDisplayName = function (displayName) {
	if (!displayName) {
		return 'Missing module Display Name';
	}

	if (!displayNameRegex.test(displayName)) {
		return 'Invalid module Display Name';
	}

	return true;
};

module.exports.validateModuleId = function (id) {
	if (!id) {
		return 'Missing module identifier';
	}

	if (!nameRegex.test(id)) {
		return 'Invalid module identifier';
	}

	return true;
};

module.exports.validateModuleNamespace = function (namespace) {
	if (!namespace) {
		return 'Missing module namespace';
	}

	if (!namespaceRegex.test(namespace)) {
		return 'Invalid module namespace';
	}

	return true;
};
