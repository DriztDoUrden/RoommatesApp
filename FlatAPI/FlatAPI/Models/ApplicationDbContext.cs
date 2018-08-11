using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using FlatAPI.Models.Domain;
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
        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}