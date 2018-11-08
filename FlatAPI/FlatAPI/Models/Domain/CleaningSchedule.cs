using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FlatAPI.Models.Domain
{
    public class CleaningSchedule
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public DateTime From { get; set; }
        [Required]
        public DateTime To { get; set; }
        [Required]
        public string UserID { get; set; }
        [Required]
        public int FlatID { get; set; }
        public string Text { get; set; }
    }
}