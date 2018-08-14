using FlatAPI.Models.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FlatAPI.Models.DTO
{
    public class AdvertisementViewModel
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Content { get; set; }
        [Required]
        public string Author { get; set; }
        [Required]
        public Flat Flat { get; set; }
        public ApplicationUser User { get; set; }

    }
}