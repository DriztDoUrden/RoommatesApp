using FlatAPI.Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FlatAPI.Models.DTO
{
    public class ResidentsViewModel
    {
        public int Id { get; set; }
        public ApplicationUser User { get; set; }
        public Flat Flat { get; set; }
    }
}