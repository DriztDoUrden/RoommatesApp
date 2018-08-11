namespace FlatAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemovingIDs : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.Residents", name: "FlatID", newName: "Flat_Id");
            RenameColumn(table: "dbo.Residents", name: "UserID", newName: "User_Id");
            RenameIndex(table: "dbo.Residents", name: "IX_FlatID", newName: "IX_Flat_Id");
            RenameIndex(table: "dbo.Residents", name: "IX_UserID", newName: "IX_User_Id");
        }
        
        public override void Down()
        {
            RenameIndex(table: "dbo.Residents", name: "IX_User_Id", newName: "IX_UserID");
            RenameIndex(table: "dbo.Residents", name: "IX_Flat_Id", newName: "IX_FlatID");
            RenameColumn(table: "dbo.Residents", name: "User_Id", newName: "UserID");
            RenameColumn(table: "dbo.Residents", name: "Flat_Id", newName: "FlatID");
        }
    }
}
