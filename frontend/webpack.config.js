const path = require('path');

module.exports = {
    entry: './build/lambda.js',
    target: 'node',
    node: {
        __dirname: true,
        __filename: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                include: __dirname,
                exclude: /node_modules/
            }
        ]
    },
    mode: "production",
    optimization: {
        minimize: false
    },
    output: {
        filename: 'handler.js',
        path: path.resolve(__dirname, 'build')
    }
};