const {describe} = require('mocha');
const chai = require('chai');
const {expect, assert} = chai;

const {getUrlSlugForName} = require('../../../src/utils/UrlSlugUtils');

describe('getUrlSlugForName', () => {

    it('should return "Vivic" for "Vivic"', () => {
        assert.equal(getUrlSlugForName('Vivic'), 'Vivic');
    });

    it('should return "Vivic-Labs" for "Vivic Labs"', () => {
        assert.equal(getUrlSlugForName('Vivic Labs'), 'Vivic-Labs');
    });

    it('should return "Vivic-Labs" for "Vivic      Labs"', () => {
        assert.equal(getUrlSlugForName('Vivic Labs'), 'Vivic-Labs');
    });

    it('should return "VivicLabs" for "Vivic!@#$%^&*()Labs"', () => {
        assert.equal(getUrlSlugForName('Vivic!@#$%^&*()Labs'), 'VivicLabs');
    });

    it('should return "VivicLabs" for "Vivic !@#$%^&*()Labs"', () => {
        assert.equal(getUrlSlugForName('Vivic !@#$%^&*()Labs'), 'Vivic-Labs');
    });
});
