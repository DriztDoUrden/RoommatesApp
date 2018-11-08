namespace FlatAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CreatedEventsTable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Events",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Flat_Id = c.Int(nullable: false),
                        User_Id = c.String(nullable: false, maxLength: 128),
                        Content = c.String(),
                        Title = c.String(),
                        Date = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Flats", t => t.Flat_Id, cascadeDelete: true)
                .ForeignKey("dbo.AspNetUsers", t => t.User_Id, cascadeDelete: true)
                .Index(t => t.Flat_Id)
                .Index(t => t.User_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Events", "User_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.Events", "Flat_Id", "dbo.Flats");
            DropIndex("dbo.Events", new[] { "User_Id" });
            DropIndex("dbo.Events", new[] { "Flat_Id" });
            DropTable("dbo.Events");
        }
    }
}
