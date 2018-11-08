namespace FlatAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Createdmessagestable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ChatMessages",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        User_Id = c.String(nullable: false, maxLength: 128),
                        Flat_Id = c.Int(nullable: false),
                        Text = c.String(nullable: false),
                        Date = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Flats", t => t.Flat_Id, cascadeDelete: true)
                .ForeignKey("dbo.AspNetUsers", t => t.User_Id, cascadeDelete: true)
                .Index(t => t.User_Id)
                .Index(t => t.Flat_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ChatMessages", "User_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.ChatMessages", "Flat_Id", "dbo.Flats");
            DropIndex("dbo.ChatMessages", new[] { "Flat_Id" });
            DropIndex("dbo.ChatMessages", new[] { "User_Id" });
            DropTable("dbo.ChatMessages");
        }
    }
}
