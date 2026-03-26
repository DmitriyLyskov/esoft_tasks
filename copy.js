/**
 * Выполняет глубокое копирование объекта
 * @param {any} source - Исходный объект для копирования
 * @param {WeakMap} cache - Кэш для обработки циклических ссылок
 * @returns {any} Глубокая копия объекта
 */
function deepCopy(source, cache = new WeakMap()) {
    // Обработка примитивных типов и null/undefined
    if (source === null || typeof source !== 'object') {
        return source;
    }

    // Проверка на циклические ссылки
    if (cache.has(source)) {
        return cache.get(source);
    }

    // Обработка Date
    if (source instanceof Date) {
        const copy = new Date(source.getTime());
        cache.set(source, copy);
        return copy;
    }

    // Обработка RegExp
    if (source instanceof RegExp) {
        const copy = new RegExp(source.source, source.flags);
        cache.set(source, copy);
        return copy;
    }

    // Обработка Map
    if (source instanceof Map) {
        const copy = new Map();
        cache.set(source, copy);
        for (const [key, value] of source) {
            copy.set(deepCopy(key, cache), deepCopy(value, cache));
        }
        return copy;
    }

    // Обработка Set
    if (source instanceof Set) {
        const copy = new Set();
        cache.set(source, copy);
        for (const value of source) {
            copy.add(deepCopy(value, cache));
        }
        return copy;
    }

    // Обработка массивов
    if (Array.isArray(source)) {
        const copy = [];
        cache.set(source, copy);
        for (let i = 0; i < source.length; i++) {
            copy[i] = deepCopy(source[i], cache);
        }
        return copy;
    }

    // Обработка обычных объектов
    const copy = Object.create(Object.getPrototypeOf(source));
    cache.set(source, copy);

    // Копирование всех собственных свойств (включая неперечисляемые и символы)
    const allProps = [
        ...Object.getOwnPropertyNames(source),
        ...Object.getOwnPropertySymbols(source)
    ];

    for (const key of allProps) {
        const descriptor = Object.getOwnPropertyDescriptor(source, key);
        
        if (descriptor) {
            if (typeof descriptor.value === 'object' && descriptor.value !== null) {
                descriptor.value = deepCopy(descriptor.value, cache);
            }
            Object.defineProperty(copy, key, descriptor);
        }
    }

    return copy;
}
