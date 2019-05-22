const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const InjectManifest = require('workbox-webpack-plugin').InjectManifest;
const CleanWebpackPlugin = require('clean-webpack-plugin');

const paths = {
    templates: 'src/main/resources/templates/',
    assets: 'src/main/resources/assets/',
    buildAssets: 'build/resources/main/assets/',
    buildTemplates: 'build/resources/main/templates/'
};

const templatesPath = path.join(__dirname, paths.templates);
const assetsPath = path.join(__dirname, paths.assets);
const buildAssetsPath = path.join(__dirname, paths.buildAssets);
const buildTemplatesPath = path.join(__dirname, paths.buildTemplates);

module.exports = {

    entry: path.join(assetsPath, 'js/app.js'),

    output: {
        path: buildAssetsPath,
        filename: 'precache/bundle.js',
        libraryTarget: 'var',
        library: 'Starter'
    },

    resolve: {
        extensions: ['.js', '.less']
    },

    module: {
        rules: [
            {
                test: /.less$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader, options: {publicPath: '../', hmr: true}},
                    {loader: 'css-loader', options: {sourceMap: false, importLoaders: 1}},
                    {loader: 'less-loader', options: {sourceMap: false}},
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([
            path.join(buildAssetsPath, 'precache-manifest*.*'),
            path.join(buildAssetsPath, 'precache/bundle.*')
        ]),
        new MiniCssExtractPlugin({
            filename: 'precache/bundle.css'
        }),
        new InjectManifest({
            globDirectory: buildAssetsPath,
            globPatterns: ['precache/**\/*'],
            swSrc: path.join(templatesPath, 'workbox-sw.js'),
            swDest: path.join(buildTemplatesPath, 'sw.js'),
            importsDirectory: path.join(buildAssetsPath, 'precache'),
        })
    ],
    mode: 'production'

};
