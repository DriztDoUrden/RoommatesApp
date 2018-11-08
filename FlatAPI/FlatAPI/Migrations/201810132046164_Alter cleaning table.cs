namespace FlatAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Altercleaningtable : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.CleaningSchedules", "FlatID", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.CleaningSchedules", "FlatID");
        }
    }
}
