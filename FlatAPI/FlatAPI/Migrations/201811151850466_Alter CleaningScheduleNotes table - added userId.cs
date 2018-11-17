namespace FlatAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AlterCleaningScheduleNotestableaddeduserId : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.CleaningScheduleNotes", "User_Id", c => c.String(nullable: false, maxLength: 128));
            CreateIndex("dbo.CleaningScheduleNotes", "User_Id");
            AddForeignKey("dbo.CleaningScheduleNotes", "User_Id", "dbo.AspNetUsers", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.CleaningScheduleNotes", "User_Id", "dbo.AspNetUsers");
            DropIndex("dbo.CleaningScheduleNotes", new[] { "User_Id" });
            DropColumn("dbo.CleaningScheduleNotes", "User_Id");
        }
    }
}
