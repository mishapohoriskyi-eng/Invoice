const monthNamesUkrainian = [
    "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень",
    "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"
];

export const addDaysToFormattedDate = (dateStr: string, days: number): string => {
    if (!dateStr) return "";

    // 1. Виділяємо день (число в лапках)
    const dayMatch = dateStr.match(/"(\d+)"/);
    if (!dayMatch) return dateStr;
    const day = parseInt(dayMatch[1], 10);

    // 2. Виділяємо місяць (текст)
    const monthIndex = monthNamesUkrainian.findIndex(m => dateStr.includes(m));
    if (monthIndex === -1) return dateStr;

    // 3. Виділяємо рік (4 цифри перед "р.")
    const yearMatch = dateStr.match(/(\d{4})р\./);
    if (!yearMatch) return dateStr;
    const year = parseInt(yearMatch[1], 10);

    // Створюємо об'єкт Date і додаємо дні
    const date = new Date(year, monthIndex, day);
    date.setDate(date.getDate() + days);

    // Форматуємо назад у той самий стиль
    const newDay = date.getDate();
    const newMonth = monthNamesUkrainian[date.getMonth()];
    const newYear = date.getFullYear();

    return `"${newDay}" ${newMonth} ${newYear}р.`;
};