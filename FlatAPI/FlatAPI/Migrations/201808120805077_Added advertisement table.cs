namespace FlatAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Addedadvertisementtable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Advertisements",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(nullable: false),
                        Content = c.String(nullable: false, maxLength: 1000),
                        Flat_Id = c.Int(nullable: false),
                        User_Id = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Flats", t => t.Flat_Id, cascadeDelete: true)
                .ForeignKey("dbo.AspNetUsers", t => t.User_Id, cascadeDelete: true)
                .Index(t => t.Flat_Id)
                .Index(t => t.User_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Advertisements", "User_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.Advertisements", "Flat_Id", "dbo.Flats");
            DropIndex("dbo.Advertisements", new[] { "User_Id" });
            DropIndex("dbo.Advertisements", new[] { "Flat_Id" });
            DropTable("dbo.Advertisements");
        }
    }
}
