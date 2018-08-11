namespace FlatAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FlatsRenameNAMEcolumn : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Flats", "FlatName", c => c.String(nullable: false));
            DropColumn("dbo.Flats", "Name");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Flats", "Name", c => c.String(nullable: false));
            DropColumn("dbo.Flats", "FlatName");
        }
    }
}
