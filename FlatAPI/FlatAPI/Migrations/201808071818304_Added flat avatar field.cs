namespace FlatAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Addedflatavatarfield : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Flats", "FlatAvatar", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Flats", "FlatAvatar");
        }
    }
}
