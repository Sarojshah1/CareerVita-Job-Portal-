// webpack.config.js
// eslint-disable-next-line no-undef
export const module = {
    rules: [
        {
            test: /pdf\.worker\.js$/,
            use: { loader: 'worker-loader' }
        },
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }
    ]
};
export const resolve = {
    extensions: ['.tsx', '.ts', '.js']
};
  