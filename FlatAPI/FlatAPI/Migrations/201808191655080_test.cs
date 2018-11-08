namespace FlatAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class test : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.UtilitiesAmounts", newName: "UtilitiesNumbers");
        }
        
        public override void Down()
        {
            RenameTable(name: "dbo.UtilitiesNumbers", newName: "UtilitiesAmounts");
        }
    }
}
