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
        [MaxLength(20, ErrorMessage = "Flat name must be less than 20 characters."),
         MinLength(3, ErrorMessage = "Flat name must be grater than 3 characters.")]
        public string FlatName { get; set; }
        [Required]
        [MaxLength(50, ErrorMessage = "Address name must be less than 20 characters."),
         MinLength(2, ErrorMessage = "Address name must be grater than 3 characters.")]
        public string Address { get; set; }
        [Required]
        [MaxLength(30, ErrorMessage = "City name must be less than 20 characters."),
         MinLength(2, ErrorMessage = "City name must be grater than 3 characters.")]
        public string City { get; set; }
        public string FlatAvatar { get; set; }
    }
}