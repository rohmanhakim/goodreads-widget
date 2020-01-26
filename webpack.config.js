const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    plugins: [
        new webpack.EnvironmentPlugin(['GOODREADS_API_KEY', 'GOODREADS_USER_ID'])
    ],
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
       ]
    }
};

