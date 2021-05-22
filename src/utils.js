module.exports = {
    isAnon: function (user) {
        return !user || user.identities[0].providerType === 'anon-user'
    }
}