var jsonImporter = require('node-sass-json-importer');
const path = require('path');
const fs = require('fs');


var cfg = require('./src/config.json');
var displayCfg = JSON.stringify(cfg.displays);
var webpack = require("webpack");

fs.writeFile("./src/dispconf.json", displayCfg, function(err) {
    if(err) {
        throw new Error ("Could not save display config");
    }
}); 



module.exports = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
  module:{
  rules:[
        {
            test:/\.(s*)css$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    },
                },
                {
                    loader: 'sass-loader',
                    // Apply the JSON importer via sass-loader's options.
                    options: {
                        importer: jsonImporter(),
                    },
                },
            ],
        },
        {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: [
            {
                loader: 'file-loader',
                options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
                }
            }
            ]
      }
    ]
  }
};