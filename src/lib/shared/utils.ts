export function contentArrayToString(array: any[]) {

    let content = "";

    array.forEach((value, key) => {
        console.log(`${key} ${value}`);

        const type = value.name.split(":")[1]
        console.log(type);

        // switch

    })

}