const revertString = require("../js/revers");



test(
    "проверяем реверс строки", 
    () => {
    expect(revertString("строка")).toBe("акортс");
  });

