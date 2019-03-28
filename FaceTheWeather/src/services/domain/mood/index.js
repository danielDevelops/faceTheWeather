// @flow
import { type emotions, getWeathersByEmotion, saveWeatherByEmotion } from '../../data/repositories/mood';
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
    return sortKeyMatch(records)[0].key;
}

function getMaxValueByRecordGroup(fields: number[]): string {
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
    return sortKeyMatch(records)[0].key;
}

function getTopWeatherByField(
    weathers: Weather[],
    fieldType: 'string' | 'number',
    field: 'temperature' |
        'conditions' |
        'precipitationPercentage'): string {

    const fields = weathers.map(t => t[field]);

    switch (fieldType) {
        case 'string':
            // $FlowFixMe
            return getTopCountOfRecords(fields);
        case 'number':
            // $FlowFixMe
            return getMaxValueByRecordGroup(fields);
        default:
            return '';
    }
}

export async function getByEmotion(emotion: emotions) : Promise<{ temperature:string, conditions:string, precipitationPercentage:string }> {
    const weathers = await getWeathersByEmotion(emotion);
    const temperature = getTopWeatherByField(weathers,'number','temperature');
    const conditions = getTopWeatherByField(weathers,'string','conditions');
    const precipitationPercentage = getTopWeatherByField(weathers,'number','precipitationPercentage');

    const favoriteWeather = {
        temperature,
        conditions,
        precipitationPercentage
    };
    return favoriteWeather;
}
export async function saveByEmotion(emotion:emotions, location:{city:string,state:string}, temperature:number, conditions:string, precipitationPercentage:string) :Promise<void> {
    await saveWeatherByEmotion(emotion,location,temperature,conditions,precipitationPercentage);
}

