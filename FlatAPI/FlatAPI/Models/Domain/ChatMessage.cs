using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace FlatAPI.Models.Domain
{
    public class ChatMessage
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string User_Id { get; set; }
        [ForeignKey("User_Id")]
        public ApplicationUser User { get; set; }
        [Required]
        public int Flat_Id { get; set; }
        [ForeignKey("Flat_Id")]
        public Flat Flat { get; set; }
        [Required]
        public string Content { get; set; }
        [Required]
        public DateTime Date { get; set; }

    }
}