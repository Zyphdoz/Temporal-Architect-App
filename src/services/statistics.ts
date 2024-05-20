import { addDays } from '../utils/dateAndTimeUtils';
import { calendar } from './calendar';

interface CategoryStatistics {
    totalHours: number;
    weeklyHours: number;
    annualHours: number;
    hoursPerDecade: number;
    daysPerDecade: number;
}
export interface CategoryMap<T> {
    [key: string]: T;
}

class Statistics {
    private categoriesWithStats: CategoryMap<CategoryStatistics> = {};

    getCategoriesWithStats(startDate: Date, endDate: Date) {
        if (startDate.getTime() > endDate.getTime()) {
            console.error('Start date must be earlier than end date');
            return this.categoriesWithStats;
        }
        this.clear();

        const categories: { [category: string]: number } = {};
        let numberOfDays = 0;
        let currentDate = startDate;

        while (currentDate <= endDate) {
            const tasks = calendar.getTasksForDay(currentDate);
            for (const task of tasks) {
                task.category.forEach((rawCategory) => {
                    let category =
                        rawCategory.trim().charAt(0).toUpperCase() + rawCategory.trim().slice(1).toLowerCase();

                    if (category !== '') {
                        if (!categories[category]) {
                            categories[category] = 0;
                        }
                        categories[category] += task.duration / 60;
                    }
                });
            }

            currentDate = addDays(currentDate, 1);
            numberOfDays++;
        }

        for (const category in categories) {
            if (Object.prototype.hasOwnProperty.call(categories, category)) {
                const totalHours = categories[category];
                this.categoriesWithStats[category] = {
                    totalHours: parseFloat(totalHours.toFixed(1)),
                    weeklyHours: parseFloat(((totalHours / numberOfDays) * 7).toFixed(1)),
                    annualHours: parseFloat(((totalHours / numberOfDays) * 365.2425).toFixed(1)),
                    hoursPerDecade: parseFloat(((totalHours / numberOfDays) * 3652.425).toFixed(1)),
                    daysPerDecade: parseFloat((((totalHours / numberOfDays) * 3652.425) / 24).toFixed(1)),
                };
            }
        }
        this.sortByMostHours();

        return this.categoriesWithStats;
    }

    private clear() {
        this.categoriesWithStats = {};
    }

    private sortByMostHours() {
        let categoriesArray = Object.entries(this.categoriesWithStats);
        categoriesArray.sort((a, b) => b[1].totalHours - a[1].totalHours);
        this.categoriesWithStats = Object.fromEntries(categoriesArray);
    }
}

export const statistics = new Statistics();
