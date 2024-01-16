const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// Vous pouvez personnaliser la configuration ici si nécessaire
// Par exemple :
// defaultConfig.resolver.assetExts.push('svg');

module.exports = defaultConfig;
