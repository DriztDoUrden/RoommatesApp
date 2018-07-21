using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FlatAPI.Models.Domain
{
    public class Residents
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public virtual ApplicationUser User { get; set; }
        [Required]
        public virtual Flat Flat { get; set; }
    }
}