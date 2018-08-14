namespace FlatAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangeofContentColumnsize : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Advertisements", "Content", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Advertisements", "Content", c => c.String(nullable: false, maxLength: 500));
        }
    }
}
