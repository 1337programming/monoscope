module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: __dirname + '/public',
        filename: 'scripts.js'
    },
    resolve: {
        alias: {
            'jquery': __dirname + '/vendor/jquery.js',
            'jquery.plugin1': __dirname + '/vendor/jquery.plugin1.js',
            'jquery.plugin2': __dirname + '/vendor/jquery.plugin2.js',
 
            'module1': __dirname + '/src/module1.js'
 
        }
    },
};