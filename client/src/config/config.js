import config from './config.json'

export const getApiUrl = () => {
    return `${config.api.protocol}://${config.api.host}:${config.api.port}`;
}

export default config;