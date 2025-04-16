const {
    withNativeWind: withNativeWind
} = require("nativewind/metro");

const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const fs = require('fs');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// 1. Watch all files within the monorepo
config.watchFolders = [monorepoRoot];

// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(monorepoRoot, 'node_modules'),
];

// 3. Handle .ts resolution when .js is imported
config.resolver.resolveRequest = (context, moduleName, platform) => {
    if ((moduleName.startsWith('.') || moduleName.startsWith('/')) && moduleName.endsWith('.js')) {
        const possibleResolvedTsFile = path
            .resolve(context.originModulePath, '..', moduleName)
            .replace(/\.js$/, '.ts');

        if (fs.existsSync(possibleResolvedTsFile)) {
            return {
                filePath: possibleResolvedTsFile,
                type: 'sourceFile',
            };
        }
    }

    return context.resolveRequest(context, moduleName, platform);
};

// 4. Configure Metro to handle SVG imports
config.transformer = {
    ...config.transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
};

config.resolver = {
    ...config.resolver,
    assetExts: config.resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...config.resolver.sourceExts, "svg"],
};

module.exports = withNativeWind(config, {
    input: "./global.css"
});
