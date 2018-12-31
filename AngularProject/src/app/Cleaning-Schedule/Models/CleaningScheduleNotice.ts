export class CleaningScheduleNotice {
    Id: number;
    Flat_Id: number;
    Content: String;
    Date: Date;
    User_Id: String;
    constructor(content: String, date: Date) {
        this.Content = content;
        this.Date = date;
    }
}
