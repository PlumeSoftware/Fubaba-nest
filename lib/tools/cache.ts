import * as process from 'child_process'

export const cacheSql = (): void => {
    const dateO = new Date();
    const datetime = [dateO.getFullYear(), dateO.getMonth() + 1, dateO.getDate(), dateO.getHours(), dateO.getMinutes()].join("_")
    process.exec(`mysqldump -u root -p"wdc20140772" noworry|gzip >/root/cache/mysql/${datetime}.sql`);
}

export const recordSheet = (path: string, body: any): void => {
    const dateO = new Date();
    const datetime = [dateO.getFullYear(), dateO.getMonth() + 1, dateO.getDate()].join("_")

    process.exec(`echo "${new Date()} ${path} \r\n" >> /root/cache/noworrylogs/${datetime}.txt`)
    process.exec(`echo "${JSON.stringify(body)}" >> /root/cache/noworrylogs/${datetime}.txt`)

}