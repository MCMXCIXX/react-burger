
interface DebouncedFunction {
    (...args: any[]): any;
    cancel: () => void;
}

export function debounce(func:(...args: any[]) => void, delay: number):DebouncedFunction {
    let timeoutId: ReturnType<typeof setTimeout>; // идентификатор текущего таймера

    // Возвращаем обёртку, которая будет вызываться вместо оригинальной функции
    const debouncedFn = function (...args: any[]) {
        // Если таймер уже был запущен, сбрасываем его
        clearTimeout(timeoutId);

        // Устанавливаем новый таймер, который вызовет func через delay мс
        timeoutId = setTimeout(() => {
            func(...args); // вызываем оригинальную функцию с сохранением контекста и аргументов
        }, delay);
    } as DebouncedFunction;

    debouncedFn.cancel = () => {               // ← добавляем cancel
        clearTimeout(timeoutId);
    };

    return debouncedFn
}
