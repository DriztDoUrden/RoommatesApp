namespace FlatAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Altermessagestable : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ChatMessages", "Content", c => c.String(nullable: false));
            DropColumn("dbo.ChatMessages", "Text");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ChatMessages", "Text", c => c.String(nullable: false));
            DropColumn("dbo.ChatMessages", "Content");
        }
    }
}
