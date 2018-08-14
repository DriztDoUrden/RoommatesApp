namespace FlatAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddUsertoAdvertisements : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Advertisements", "User_Id", c => c.String(maxLength: 128));
            CreateIndex("dbo.Advertisements", "User_Id");
            AddForeignKey("dbo.Advertisements", "User_Id", "dbo.AspNetUsers", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Advertisements", "User_Id", "dbo.AspNetUsers");
            DropIndex("dbo.Advertisements", new[] { "User_Id" });
            DropColumn("dbo.Advertisements", "User_Id");
        }
    }
}
