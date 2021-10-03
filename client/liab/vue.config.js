module.exports = {
    // 개발 서버 설정
    devServer: {
        // 프록시 설정
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite: { '^/api': '/'}
            }
        }
    }
};