using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FlatAPI.Models.Domain
{
    public class Flat
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string FlatName { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string City { get; set; }
        public string FlatAvatar { get; set; }
    }
}