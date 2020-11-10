module.exports = {
    index: async (name) => {
        try {
            return 'Home page';
        } catch (error) {
            throw error
        }
    },
}