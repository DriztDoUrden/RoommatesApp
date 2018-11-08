namespace FlatAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AlterColors : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Colors", "Alpha", c => c.Single(nullable: false, defaultValue: 1));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Colors", "Alpha", c => c.Single());
        }
    }
}
