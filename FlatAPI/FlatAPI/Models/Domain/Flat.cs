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
        public int Name { get; set; }
        [Required]
        public string Address { get; set; }
    }
}