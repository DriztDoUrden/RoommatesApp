namespace FlatAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RelationShiptablerework : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ObjectMembers", "User_Id", c => c.String(nullable: false, maxLength: 128));
            CreateIndex("dbo.ObjectMembers", "User_Id");
            AddForeignKey("dbo.ObjectMembers", "User_Id", "dbo.AspNetUsers", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ObjectMembers", "User_Id", "dbo.AspNetUsers");
            DropIndex("dbo.ObjectMembers", new[] { "User_Id" });
            DropColumn("dbo.ObjectMembers", "User_Id");
        }
    }
}
