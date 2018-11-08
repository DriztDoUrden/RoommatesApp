using FlatAPI.Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FlatAPI.Models
{
    public class ChatViewModel
    {
        public List<ChatMessage> Messages { get; set; }
        public int FlatID { get; set; }
        public List<ApplicationUser> Members { get; set; }
    }
}