using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FlatAPI.Models.DTO
{
    public class MessageViewModel
    {
        public int Id { get; set; }
        public string User_Id { get; set; }
        public int Flat_Id { get; set; }
        public string Content { get; set; }
        public DateTime Date { get; set; }
        public string UserName { get; set; }
    }
}