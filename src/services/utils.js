export function debounce(func, delay) {
    let timeoutId; // идентификатор текущего таймера

    // Возвращаем обёртку, которая будет вызываться вместо оригинальной функции
    return function (...args) {
        // Если таймер уже был запущен, сбрасываем его
        clearTimeout(timeoutId);

        // Устанавливаем новый таймер, который вызовет func через delay мс
        timeoutId = setTimeout(() => {
            func.apply(this, args); // вызываем оригинальную функцию с сохранением контекста и аргументов
        }, delay);
    };
}