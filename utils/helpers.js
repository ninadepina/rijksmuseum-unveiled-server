export default {
    eq: function (a, b) {
        return a === b;
    },
    sliceUrl: function (url) {
        return (url || []).slice(0, -3);
    }
};