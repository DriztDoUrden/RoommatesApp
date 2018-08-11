namespace FlatAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Repair : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Flats", "Name", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Flats", "Name", c => c.Int(nullable: false));
        }
    }
}
