using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;
using FlatAPI.Models.Domain;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace FlatAPI.Models
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("FlatDatabase", throwIfV1Schema: false)
        {
        }
        public DbSet<Flat> Flats { get; set; }
        public DbSet<Residents> Residents { get; set; }
        public DbSet<Advertisement> Advertisements { get; set; }
        public DbSet<UtilitiesRates> UtilitiesRates { get; set; }
        public DbSet<UtilitiesNumbers> UtilitiesNumbers { get; set; }
        public DbSet<CleaningSchedule> CleaningSchedule { get; set; }
        public DbSet<Color> Colors { get; set; }
        public DbSet<ChatMessage> ChatMessages { get; set; }
        public DbSet<Events> Events { get; set; }


        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UtilitiesNumbers>()
            .HasRequired(s => s.UtilitiesRates)
            .WithMany()
            .WillCascadeOnDelete(false);
        }

        #region Global methods

        public int GetCurrentFlatID()
        {
            var userID = GetCurrentUserID();
            var currentResident = Residents.Single(x => x.User.Id == userID);
            return currentResident.Flat_Id;
        }
        public string GetCurrentUserID()
        {
            return HttpContext.Current.User.Identity.GetUserId();
        }

        public string GetCurrentUserName()
        {
            var userID = GetCurrentUserID();
            return Users.Single(x => x.Id == userID).Email;
        }
        #endregion
    }
}