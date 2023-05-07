const add_numb = require("../js/test_jest");



test(
    "проверяем сложение чисел", 
    () => {
    expect(add_numb(2, 2)).toBe(4);
  });