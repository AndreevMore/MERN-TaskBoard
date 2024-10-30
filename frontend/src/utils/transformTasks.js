// transformTasks сортирует задачи по дате исполнения и обрабатывает их в одном цикле,
// это снижает количество итераций и делает код более быстрым.
// Логика разделена на отдельные функции (getWeekOffset), что делает код модульным и более понятным.
// Группировка по неделям: Задачи группируются по неделям с помощью динамического подсчета,
// что упрощает добавление новых задач в соответствующую категорию.

function getWeekOffset(date) {
    const today = new Date();
    const startOfWeek = today.getDate() - today.getDay(); // Get the first day of the current week
    const currentWeekStart = new Date(today.setDate(startOfWeek)); // Start of the current week
    const givenWeekStart = new Date(date);
    givenWeekStart.setDate(givenWeekStart.getDate() - givenWeekStart.getDay()); // Start of the given week

    // Calculate weeks offset: positive if future, negative if past
    const weekOffset = Math.floor((currentWeekStart - givenWeekStart) / (7 * 24 * 60 * 60 * 1000));
    return weekOffset;
}

export default function transformTasks(tasks) {
    const byStatus = {};
    const byAssignee = {};
    const byWeeks = {};
    
    tasks.sort((a,b) => {
        return new Date(a.dueDate) - new Date(b.dueDate);
    }).forEach(task => {
        // Status statistic
        byStatus[task.status] = (byStatus[task.status] || 0) + 1;

        // Assignee statistic
        byAssignee[task.assignee] = (byAssignee[task.assignee] || 0) + 1;

        // Date statistic
        const taskDate = new Date(task.dueDate);
        const weekOffset = getWeekOffset(taskDate);

        task.weekOffset = weekOffset;

        let weekCount;
        const weeksKeys = Object.keys(byWeeks);
        const byWeeksIsNotEmpty = Boolean(weeksKeys.length);
        
        if (byWeeksIsNotEmpty) {
            const max = Math.max(...weeksKeys);
            const prevTaskWeekOffset = byWeeks[max][0].weekOffset;
            const diff = prevTaskWeekOffset - weekOffset;
            weekCount = max + diff;
        } else {
            weekCount = 1;
        }

        byWeeks[weekCount] = byWeeks[weekCount] || [];
        byWeeks[weekCount].push(task);
    });


    const byDueDate = Object.fromEntries(
        Object.entries(byWeeks).map(([key, value]) => [`week-${key}`, value.length])
    );

    return { byStatus, byAssignee, byDueDate};
}
