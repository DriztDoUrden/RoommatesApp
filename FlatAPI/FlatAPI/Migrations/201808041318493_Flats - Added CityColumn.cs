namespace FlatAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FlatsAddedCityColumn : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Flats", "City", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Flats", "City");
        }
    }
}
