namespace FlatAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FlatIDadded : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.Residents", name: "Flat_Id", newName: "FlatId");
            RenameIndex(table: "dbo.Residents", name: "IX_Flat_Id", newName: "IX_FlatId");
        }
        
        public override void Down()
        {
            RenameIndex(table: "dbo.Residents", name: "IX_FlatId", newName: "IX_Flat_Id");
            RenameColumn(table: "dbo.Residents", name: "FlatId", newName: "Flat_Id");
        }
    }
}
