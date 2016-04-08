/* eslint no-unused-expressions:0 */
import {
  calculate,
  defineMarginLeft,
} from '../../src/engines/strape';

describe('engine/strape', () => {
  describe('strategy : progressive', () => {
    it('should set margin when card is outside the wrapper', () => {
      const wrapper = {width: 200, left: 100};
      const cards = [
        {id: 1, width: 100, left: 100},
        {id: 2, width: 100, left: 200},
        {id: 3, width: 100, left: 300},
        {id: 4, width: 100, left: 400},
      ];
      const result = calculate(wrapper, cards, {strategy: 'progressive', gap: 0});
      result[0].marginLeft.should.equal(0);
      result[1].marginLeft.should.equal(0);
      result[2].marginLeft.should.equal(100);
      result[3].marginLeft.should.equal(200);
    });

    it('should set margin when card is outside the wrapper #2', () => {
      const wrapper = {width: 150, left: 100};
      const cards = [
        {id: 1, width: 50, left: 100},
        {id: 2, width: 50, left: 160},
        {id: 3, width: 50, left: 220},
        {id: 4, width: 50, left: 280},
      ];
      const result = calculate(wrapper, cards, {strategy: 'progressive', gap: 0});
      result[0].marginLeft.should.equal(0);
      result[1].marginLeft.should.equal(0);
      result[2].marginLeft.should.equal(20);
      result[3].marginLeft.should.equal(80);
    });

    it('should add a gap to margin when option is setted', () => {
      const wrapper = {width: 150, left: 100};
      const cards = [
        {id: 1, width: 50, left: 100},
        {id: 2, width: 50, left: 160},
        {id: 3, width: 50, left: 220},
        {id: 4, width: 50, left: 280},
      ];
      const result = calculate(wrapper, cards, {strategy: 'progressive', gap: 10});
      result[0].marginLeft.should.equal(0);
      result[1].marginLeft.should.equal(0);
      result[2].marginLeft.should.equal(30);
      result[3].marginLeft.should.equal(90);
    });

    it('should defineMarginLeft return 0 when card is inside display', () => {
      const card = {id: 0, width: 50, left: 100};
      const wrapper = {width: 100, left: 50};
      const options = {strategy: 'progressive', gap: 0};
      defineMarginLeft(card, wrapper, 0, options).should.equal(0);
    });

    it('should defineMarginLeft return 50 when first card is outside', () => {
      const card = {id: 0, width: 50, left: 200};
      const wrapper = {width: 100, left: 100};
      const options = {strategy: 'progressive', gap: 0};
      defineMarginLeft(card, wrapper, 0, options).should.equal(50);
    });

    it('should defineMarginLeft return 60 when first card is outside with gap of 10', () => {
      const card = {id: 0, width: 50, left: 200};
      const wrapper = {width: 100, left: 100};
      const options = {strategy: 'progressive', gap: 10};
      defineMarginLeft(card, wrapper, 0, options).should.equal(60);
    });

    it('should add margin to marginLeft param', () => {
      const card = {id: 0, width: 50, left: 200};
      const wrapper = {width: 100, left: 100};
      const options = {strategy: 'progressive', gap: 10};
      defineMarginLeft(card, wrapper, 100, options).should.equal(100);
    });
  });
  describe('strategy : cut', () => {
    it('should defineMarginLeft return 60 when first card is outside with gap of 10', () => {
      const card = {id: 0, width: 50, left: 200};
      const wrapper = {width: 100, left: 100};
      const options = {strategy: 'cut', gap: 0};
      defineMarginLeft(card, wrapper, 0, options).should.equal(100);
    });

    it('should defineMarginLeft return 60 when first card is outside with gap of 10', () => {
      const card = {id: 0, width: 50, left: 300};
      const wrapper = {width: 100, left: 100};
      const options = {strategy: 'cut', gap: 0};
      defineMarginLeft(card, wrapper, 0, options).should.equal(200);
    });

    it('should defineMarginLeft return 60 when first card is outside with gap of 10', () => {
      const card = {id: 0, width: 50, left: 300};
      const wrapper = {width: 100, left: 100};
      const options = {strategy: 'cut', gap: 10};
      defineMarginLeft(card, wrapper, 0, options).should.equal(210);
    });

    it('should add margin to marginLeft param', () => {
      const card = {id: 0, width: 50, left: 200};
      const wrapper = {width: 100, left: 100};
      const options = {strategy: 'cut', gap: 10};
      defineMarginLeft(card, wrapper, 100, options).should.equal(100);
    });
  });
});
