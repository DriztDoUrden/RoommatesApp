namespace FlatAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedUserID : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.Residents", new[] { "FlatId" });
            RenameColumn(table: "dbo.Residents", name: "User_Id", newName: "UserID");
            RenameIndex(table: "dbo.Residents", name: "IX_User_Id", newName: "IX_UserID");
            CreateIndex("dbo.Residents", "FlatID");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Residents", new[] { "FlatID" });
            RenameIndex(table: "dbo.Residents", name: "IX_UserID", newName: "IX_User_Id");
            RenameColumn(table: "dbo.Residents", name: "UserID", newName: "User_Id");
            CreateIndex("dbo.Residents", "FlatId");
        }
    }
}
