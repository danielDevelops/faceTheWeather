//@ flow
import { type emotions, getWeathersByEmotion } from '../../data/repositories/mood';
import { type Weather } from '../../data/repositories/weather';

function sortKeyMatch(fields:{key:string,count:number}[]) :{key:string,count:number}[] {
    const sortedItems = fields.sort((a, b) => {
        if (a.count > b.count)
            return -1;
        if (a.count < b.count)
            return 1;
        return 0;
    });
    return sortedItems;
}

function getTopCountOfRecords(fields: string[]): string {
    let records = [{ key: 'no matches found', count: -1 }];
    fields.forEach((val) => {
        let item = records.find(t => t.key === val);
        if (item == undefined) {
            item = { key: val, count: 0 };
            records.push(item);
        }
        item.count = item.count + 1;
    });
    return sortKeyMatch(fields)[0].key;
}

function getMaxValueByRecordGroup(fields: number[]): number {
    let records = [{ key: 'no matches found', count: -1 }];
    fields.forEach((val) => {
        const groupId = (Math.floor(val / 10 % 10) * 10).toString();
        let item = records.find(t => t.key === groupId);
        if (item == undefined) {
            item = { key: groupId, count: 0 };
            records.push(item);
        }
        item.count = item.count + 1;
    });
    return sortKeyMatch(fields)[0].key;
}

function getTopWeatherByField(
    weathers: Weather[],
    fieldType: 'string' | 'number',
    field: 'temperature' |
        'precipitationType' |
        'precipitationPercentage'): string {

    const fields = weathers.map(t => t[field]);

    switch (fieldType) {
        case 'string':
            return getTopCountOfRecords(fields);
        case 'number':
            return getMaxValueByRecordGroup(fields);
    }
}

export function getByEmotion(emotion: emotions) :{ temperature:string, precipitationType:string, precipitationPercentage:string } {
    const weathers = getWeathersByEmotion(emotion);
    const temperature = getTopWeatherByField(weathers,'number','temperature');
    const precipitationType = getTopWeatherByField(weathers,'string','precipitationType');
    const precipitationPercentage = getTopWeatherByField(weathers,'number','precipitationPercentage');

    const favoriteWeather = {
        temperature,
        precipitationType,
        precipitationPercentage
    };
    return favoriteWeather;
}

