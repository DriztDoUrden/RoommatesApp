namespace FlatAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedCleaningScheduleNotestable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CleaningScheduleNotes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Flat_Id = c.Int(nullable: false),
                        Content = c.String(),
                        Date = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Flats", t => t.Flat_Id, cascadeDelete: true)
                .Index(t => t.Flat_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.CleaningScheduleNotes", "Flat_Id", "dbo.Flats");
            DropIndex("dbo.CleaningScheduleNotes", new[] { "Flat_Id" });
            DropTable("dbo.CleaningScheduleNotes");
        }
    }
}
