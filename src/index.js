module.exports = function check(str, bracketsConfig) {
  const stack = [];
  const openBrackets = [];
  const bracketsMap = {};
  const sameBrackets = [];

  // Подготавливаем данные из конфига для удобного поиска
  bracketsConfig.forEach(([open, close]) => {
    bracketsMap[close] = open;
    openBrackets.push(open);
    if (open === close) {
      sameBrackets.push(open);
    }
  });

  for (let i = 0; i < str.length; i += 1) {
    const current = str[i];
    const topElement = stack[stack.length - 1];

    // Случай для одинаковых скобок (например, '|')
    if (sameBrackets.includes(current)) {
      if (topElement === current) {
        stack.pop(); // Если такая уже в топе — закрываем
      } else {
        stack.push(current); // Иначе — открываем
      }
    }
    // Если это обычная открывающая скобка
    else if (openBrackets.includes(current)) {
      stack.push(current);
    }
    // Если это закрывающая скобка
    else {
      // Если стек пуст или скобка на вершине не совпадает с нужной парой
      if (stack.length === 0 || topElement !== bracketsMap[current]) {
        return false;
      }
      stack.pop();
    }
  }

  // Если стек в итоге пуст — все пары закрыты правильно
  return stack.length === 0;
};
