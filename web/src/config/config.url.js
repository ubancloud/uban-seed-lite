import config from '@/config/config.default'
export default {
    login: '/clap/authority/login',
    register: '/clap/authority/register',
    registerByOrganUser: '/clap/authority/registerByOrganUser',
    changePwd: '/clap/authority/changePwd',
    resetPwd: '/clap/authority/resetPwd',
    registerOrgan: '/clap/authority/registerOrgan',
    file: {
        preview: config.host+'/clap/file/preview/',
        download: config.host+'/clap/file/download/',
        upload: config.host+'/clap/file/upload',
    },
}
