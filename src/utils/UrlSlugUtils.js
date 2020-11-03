const getUrlSlugForName = name => {
    return name
        .replace(/\s+/, '-')
        .replace(/[^0-9a-zA-Z-]+/, '');
};

module.exports = {
    getUrlSlugForName
};
