using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FlatAPI.Models.Domain
{
    public class Color
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int R { get; set; }
        [Required]
        public int G { get; set; }
        [Required]
        public int B { get; set; }
        [Required]
        [DefaultValue(1.0)]
        public float Alpha { get; set; }
        public string Description { get; set; }
    }
}