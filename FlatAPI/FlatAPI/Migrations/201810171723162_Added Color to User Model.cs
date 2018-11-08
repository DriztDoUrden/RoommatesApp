namespace FlatAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedColortoUserModel : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "ScheduleColor", c => c.String());
            DropColumn("dbo.CleaningSchedules", "Color");
        }
        
        public override void Down()
        {
            AddColumn("dbo.CleaningSchedules", "Color", c => c.String());
            DropColumn("dbo.AspNetUsers", "ScheduleColor");
        }
    }
}
