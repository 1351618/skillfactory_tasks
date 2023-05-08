// 1 prog ==========================
function countDown(n) {
  if (n < 1) {
    throw new Error('Входной параметр должен быть положительным числом больше нуля');
  }
  for (let i = n; i > 0; i--) {
    console.log(i);
  }
}
  
  test('countDown success for n = 5', () => {
    expect(countDown(5)).toEqual([5, 4, 3, 2, 1]);
  });
  
  test('countDown failure for n = -3', () => {
    expect(() => countDown(-3)).toThrow('Входной параметр должен быть положительным числом больше нуля');
  });
  
  test('countDown for n = 0', () => {
    expect(countDown(0)).toEqual([]);
  });
