const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const fs = require('fs');

const config = getDefaultConfig(__dirname);

const defaultResolveRequest = config.resolver.resolveRequest;
const lucideCjs = path.resolve(__dirname, 'node_modules/lucide-react-native/dist/cjs/lucide-react-native.js');

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'lucide-react-native') {
    return {
      filePath: lucideCjs,
      type: 'sourceFile',
    };
  }

  // Handle relative .mjs imports (e.g. from any ESM package)
  if (
    moduleName.endsWith('.mjs') &&
    (moduleName.startsWith('./') || moduleName.startsWith('../'))
  ) {
    const fullPath = path.resolve(path.dirname(context.originModulePath), moduleName);
    if (fs.existsSync(fullPath)) {
      return {
        filePath: fullPath,
        type: 'sourceFile',
      };
    }
  }

  if (defaultResolveRequest) {
    return defaultResolveRequest(context, moduleName, platform);
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
