const { int_to_words, replace_num_to_words, num_to_currency, time_to_words } = require('./numtowords'); 
// also import jest

describe('int_to_words', () => {
    test('converts numbers to words under one hundred', () => {
      expect(int_to_words(1)).toBe('één');
      expect(int_to_words(21)).toBe('eenentwintig');
      expect(int_to_words(53)).toBe('drieënvijftig');
      expect(int_to_words(79)).toBe('negenenzeventig');
      expect(int_to_words(100)).toBe('honderd');
    });
    test('converts numbers to words between one hundred and one thausend', () => {
      expect(int_to_words(101)).toBe('honderdeen');
      expect(int_to_words(443)).toBe('vierhonderddrieënveertig');
      expect(int_to_words(694)).toBe('zeshonderdvierennegentig');
      expect(int_to_words(836)).toBe('achthonderdzesendertig');
    });
    test('converts numbers to words between a thausend and one million', () => {
      expect(int_to_words(4034)).toBe('vierduizend vierendertig');
      expect(int_to_words(85134)).toBe('vijfentachtigduizend honderdvierendertig');
      expect(int_to_words(363672)).toBe('driehonderddrieënzestigduizend zeshonderdtweeënzeventig');
      expect(int_to_words(964224)).toBe('negenhonderdvierenzestigduizend tweehonderdvierentwintig');
      expect(int_to_words(3000)).toBe('drieduizend');
    });
    test('converts numbers to words between one million and one billion', () => {
      expect(int_to_words(1000000)).toBe('één miljoen');
      expect(int_to_words(1000001)).toBe('één miljoen een');
      expect(int_to_words(1000000000)).toBe('één miljard');
      expect(int_to_words(1000000001)).toBe('één miljard een');
      expect(int_to_words(1000000000000)).toBe('één biljoen');
      expect(int_to_words(1000000000001)).toBe('één biljoen een');
    });
    test('converts numbers to words in Dutch bigger then one billionbut not bigger than1 characters because then it may fail because of javascript integer size limitatotions', () => {
      expect(int_to_words(1000000000000000)).toBe('één biljard');
      expect(int_to_words(1000000000000001)).toBe('één biljard een');
      expect(int_to_words(1000000000000000000)).toBe('één triljoen');
      expect(int_to_words(1000000000000000000000)).toBe('één triljard');
    });
});
describe('replace_num_to_words', () => {
  test('replaces numbers in text with words', () => {
    expect(replace_num_to_words('Ik heb 2 appels')).toBe('Ik heb twee appels');
    expect(replace_num_to_words('Ik heb 32 schapen')).toBe('Ik heb tweeëndertig schapen');
  });
});

describe('num_to_currency', () => {
  test('converts amounts to words with currency in Dutch', () => {
    expect(num_to_currency(123.45, 'USD')).toBe('honderddrieëntwintig dollar en vijfenveertig cent');
    expect(num_to_currency(1.01, 'EUR')).toBe('één euro en één cent');
  });
});
describe('time_to_words', () => {
    test('converts time into Dutch words', () => {
      expect(time_to_words("14:15")).toBe('kwart over twee');
      expect(time_to_words("18:04", 'EUR')).toBe('vier over zes');
    });
});
