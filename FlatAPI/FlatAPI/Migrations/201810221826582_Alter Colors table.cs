namespace FlatAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AlterColorstable : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Colors", "Description", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Colors", "Description");
        }
    }
}
