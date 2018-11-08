namespace FlatAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedtablesFK_keys : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Advertisements", "User_Id", "dbo.AspNetUsers");
            DropIndex("dbo.Advertisements", new[] { "User_Id" });
            AlterColumn("dbo.Advertisements", "User_Id", c => c.String(nullable: false, maxLength: 128));
            CreateIndex("dbo.Advertisements", "User_Id");
            AddForeignKey("dbo.Advertisements", "User_Id", "dbo.AspNetUsers", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Advertisements", "User_Id", "dbo.AspNetUsers");
            DropIndex("dbo.Advertisements", new[] { "User_Id" });
            AlterColumn("dbo.Advertisements", "User_Id", c => c.String(maxLength: 128));
            CreateIndex("dbo.Advertisements", "User_Id");
            AddForeignKey("dbo.Advertisements", "User_Id", "dbo.AspNetUsers", "Id");
        }
    }
}
