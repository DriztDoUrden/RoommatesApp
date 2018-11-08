using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace FlatAPI.Models.Domain
{
    public class UtilitiesNumbers
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public decimal Quantity { get; set; }
        [Required]
        public DateTime Date { get; set; }

        [Required]
        public int UtilitiesRates_Id { get; set; }
        [ForeignKey("UtilitiesRates_Id")]
        public virtual UtilitiesRates UtilitiesRates { get; set; }

        [Required]
        public int Flat_Id { get; set; }
        [ForeignKey("Flat_Id")]
        public Flat Flat { get; set; }
    }
}