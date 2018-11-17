using FlatAPI.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace FlatAPI.Models.Domain
{
    public class ObjectMembers
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public ObjectsEnum Type { get; set; }
        [Required]
        public int ObjectId { get; set; }
        [Required]
        public string User_Id { get; set; }
        [ForeignKey("User_Id")]
        public virtual ApplicationUser User { get; set; }
    }
}