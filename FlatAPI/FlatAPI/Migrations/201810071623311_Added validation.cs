namespace FlatAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Addedvalidation : DbMigration
    {
        public override void Up()
        {
            Sql("ALTER TABLE Flats DROP CONSTRAINT DF__Flats__FlatName__6EF57B66");
            AlterColumn("dbo.Flats", "FlatName", c => c.String(nullable: false, maxLength: 20));
        }
        
        public override void Down()
        {
            Sql("ALTER TABLE Flats ADD CONSTRAINT DF__Flats__FlatName__6EF57B66");
            AlterColumn("dbo.Flats", "FlatName", c => c.String(nullable: false));
        }
    }
}
