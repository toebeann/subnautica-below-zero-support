const webpack = require('vortex-api/bin/webpack').default;

const config = webpack('game-subnautica', __dirname, 4);

module.exports =
{
    ...config,
    module: {
        ...config.module,
        rules: [
            ...config.module.rules,
            {
                test: /\.md$/i,
                use: 'raw-loader'
            },
        ],
    },
};
