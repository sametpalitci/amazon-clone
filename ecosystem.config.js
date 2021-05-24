module.exports = {
    apps: [
        {
            name: "API Gateway",
            cwd: "./packages/api-gateway",
            script: "./lib/app.js",
            args: "start",
            watch: true
        },
        {
            name: "API USER",
            cwd: "./packages/user",
            script: "./lib/app.js",
            args: "start",
            watch: true
        }
    ],

    deploy: {
        production: {
            user: 'SSH_USERNAME',
            host: 'SSH_HOSTMACHINE',
            ref: 'origin/master',
            repo: 'GIT_REPOSITORY',
            path: 'DESTINATION_PATH',
            'pre-deploy-local': '',
            'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
            'pre-setup': ''
        }
    }
};
