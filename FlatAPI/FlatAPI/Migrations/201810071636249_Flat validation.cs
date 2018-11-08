namespace FlatAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Flatvalidation : DbMigration
    {
        public override void Up()
        {
            Sql("ALTER TABLE Flats DROP CONSTRAINT DF__Flats__City__6E01572D");
            AlterColumn("dbo.Flats", "Address", c => c.String(nullable: false, maxLength: 50));
            AlterColumn("dbo.Flats", "City", c => c.String(nullable: false, maxLength: 30));
        }
        
        public override void Down()
        {
            Sql("ALTER TABLE Flats ADD CONSTRAINT DF__Flats__City__6E01572D");
            AlterColumn("dbo.Flats", "City", c => c.String(nullable: false));
            AlterColumn("dbo.Flats", "Address", c => c.String(nullable: false));
        }
    }
}
