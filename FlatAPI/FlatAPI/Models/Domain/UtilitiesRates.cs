using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace FlatAPI.Models.Domain
{
    public class UtilitiesRates
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public decimal FixedCharge { get; set; }
        [Required]
        public int Flat_Id { get; set; }
        [ForeignKey("Flat_Id")]
        public Flat Flat { get; set; }
    }
}