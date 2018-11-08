namespace FlatAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CreatedCleaningScheduletable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CleaningSchedules",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        From = c.DateTime(nullable: false),
                        To = c.DateTime(nullable: false),
                        UserID = c.String(nullable: false),
                        Color = c.String(),
                        Text = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.CleaningSchedules");
        }
    }
}
