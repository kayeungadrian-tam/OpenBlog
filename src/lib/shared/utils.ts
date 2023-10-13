export function contentArrayToString(array: any[]) {

    let content = "";

    array.forEach((value, key) => {
        console.log(`${key} ${value}`);

        const type = value.name.split(":")[1]
        console.log(type);

        // switch

    })

}


export function formatDatetimeToHumanReadable(datetimeStr: string, locale: string): string {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    const datetime = new Date(datetimeStr);

    const formattedDatetime = new Intl.DateTimeFormat(locale, options).format(datetime);

    return formattedDatetime;
}
