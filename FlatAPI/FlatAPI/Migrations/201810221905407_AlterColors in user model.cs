namespace FlatAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AlterColorsinusermodel : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "Color_Id", c => c.Int());
            CreateIndex("dbo.AspNetUsers", "Color_Id");
            AddForeignKey("dbo.AspNetUsers", "Color_Id", "dbo.Colors", "Id");
            DropColumn("dbo.AspNetUsers", "ScheduleColor");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AspNetUsers", "ScheduleColor", c => c.String());
            DropForeignKey("dbo.AspNetUsers", "Color_Id", "dbo.Colors");
            DropIndex("dbo.AspNetUsers", new[] { "Color_Id" });
            DropColumn("dbo.AspNetUsers", "Color_Id");
        }
    }
}
