namespace FlatAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ReworkofAdvertisementModel : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Advertisements", "User_Id", "dbo.AspNetUsers");
            DropIndex("dbo.Advertisements", new[] { "User_Id" });
            AddColumn("dbo.Advertisements", "Author", c => c.String(nullable: false));
            DropColumn("dbo.Advertisements", "User_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Advertisements", "User_Id", c => c.String(nullable: false, maxLength: 128));
            DropColumn("dbo.Advertisements", "Author");
            CreateIndex("dbo.Advertisements", "User_Id");
            AddForeignKey("dbo.Advertisements", "User_Id", "dbo.AspNetUsers", "Id", cascadeDelete: true);
        }
    }
}
